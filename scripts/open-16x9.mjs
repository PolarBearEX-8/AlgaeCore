#!/usr/bin/env node
/**
 * AlgaeCore — open the deck in a true 16:9 app window.
 *
 * Launches the site in Chrome/Edge "app mode" (no tabs, no address bar) and
 * resizes the window so the *content area* is exactly 1280 × 720 px (16:9).
 *
 * Windows render a title bar, so an outer window of 1280 × 720 would leave
 * letterbox bars. We measure the frame via the DevTools protocol and add it
 * back, then center the window on the work area. On small screens the window
 * shrinks while keeping the 16:9 ratio.
 *
 * Usage:
 *   npm start
 *   npm run open:16x9
 *   node scripts/open-16x9.mjs [url]
 *
 * The Vite dev server is started automatically when it is not already running.
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { createServer } from 'node:net'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DEFAULT_URL = 'http://localhost:5173/'
const URL_TO_OPEN = process.argv[2] || DEFAULT_URL
const APP_W = 1280
const APP_H = 720
const RATIO = APP_W / APP_H
const MARGIN = 24

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/* ------------------------------------------------------------------ */
/* Browser discovery                                                   */
/* ------------------------------------------------------------------ */

function browserCandidates() {
  const list = []
  if (process.env.CHROME_PATH) list.push(process.env.CHROME_PATH)

  if (process.platform === 'win32') {
    const programFiles = process.env.ProgramFiles || 'C:\\Program Files'
    const programFilesX86 = process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)'
    const localAppData = process.env.LOCALAPPDATA || ''
    if (localAppData) list.push(join(localAppData, 'Google', 'Chrome', 'Application', 'chrome.exe'))
    list.push(
      join(programFiles, 'Google', 'Chrome', 'Application', 'chrome.exe'),
      join(programFilesX86, 'Google', 'Chrome', 'Application', 'chrome.exe'),
      join(programFilesX86, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
      join(programFiles, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    )
  } else if (process.platform === 'darwin') {
    list.push(
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
    )
  } else {
    list.push(
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      '/usr/bin/microsoft-edge',
    )
  }
  return list.filter(Boolean)
}

function findBrowser() {
  return browserCandidates().find((candidate) => existsSync(candidate)) || null
}

function profileDir() {
  if (process.platform === 'win32') {
    return join(process.env.LOCALAPPDATA || join(homedir(), 'AppData', 'Local'), 'AlgaeCore', 'window-profile')
  }
  if (process.platform === 'darwin') {
    return join(homedir(), 'Library', 'Application Support', 'AlgaeCore', 'window-profile')
  }
  return join(homedir(), '.local', 'share', 'algaecore', 'window-profile')
}

/* ------------------------------------------------------------------ */
/* Dev server                                                          */
/* ------------------------------------------------------------------ */

async function reachable(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(1200), redirect: 'follow' })
    return res.ok
  } catch {
    return false
  }
}

function isLocal(url) {
  try {
    const host = new URL(url).hostname
    return host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host === '::1'
  } catch {
    return false
  }
}

async function ensureServer(url) {
  if (await reachable(url)) return false
  if (!isLocal(url)) throw new Error(`Cannot reach ${url}`)
  if (!existsSync(join(ROOT, 'node_modules'))) {
    throw new Error('Dependencies are missing. Run "npm install" first.')
  }

  console.log('• Dev server is not running — starting it…')
  const child = spawn('npm', ['run', 'dev', '--', '--port', '5173', '--strictPort'], {
    cwd: ROOT,
    shell: process.platform === 'win32',
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  })
  child.unref()

  for (let i = 0; i < 60; i += 1) {
    await sleep(500)
    if (await reachable(url)) return true
  }
  throw new Error('The dev server did not start in time. Run "npm run dev" manually and try again.')
}

/* ------------------------------------------------------------------ */
/* DevTools protocol                                                   */
/* ------------------------------------------------------------------ */

function freePort() {
  return new Promise((resolve, reject) => {
    const srv = createServer()
    srv.unref()
    srv.on('error', reject)
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address()
      srv.close(() => resolve(port))
    })
  })
}

async function cdpJson(port, pathname) {
  const res = await fetch(`http://127.0.0.1:${port}${pathname}`, { signal: AbortSignal.timeout(2000) })
  if (!res.ok) throw new Error(`DevTools ${pathname} responded ${res.status}`)
  return res.json()
}

function connect(url, timeoutMs = 10000) {
  const ws = new WebSocket(url)
  let seq = 0
  const pending = new Map()

  ws.onmessage = (event) => {
    let message
    try {
      message = JSON.parse(event.data)
    } catch {
      return
    }
    const entry = message.id ? pending.get(message.id) : undefined
    if (!entry) return
    pending.delete(message.id)
    if (message.error) entry.reject(new Error(message.error.message || JSON.stringify(message.error)))
    else entry.resolve(message.result)
  }

  const ready = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      try {
        ws.close()
      } catch {}
      reject(new Error('Timed out while connecting to the browser.'))
    }, timeoutMs)
    ws.onopen = () => {
      clearTimeout(timer)
      resolve()
    }
    ws.onerror = () => {
      clearTimeout(timer)
      reject(new Error(`Could not connect to ${url}`))
    }
  })

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      seq += 1
      pending.set(seq, { resolve, reject })
      ws.send(JSON.stringify({ id: seq, method, params }))
    })

  const close = () => {
    try {
      ws.close()
    } catch {}
  }

  return { ready, send, close }
}

/* ------------------------------------------------------------------ */
/* Main                                                               */
/* ------------------------------------------------------------------ */

async function main() {
  if (typeof WebSocket === 'undefined') {
    throw new Error('Node.js 22 or newer is required (built-in WebSocket).')
  }

  const browser = findBrowser()
  if (!browser) {
    throw new Error('Chrome or Edge was not found. Set CHROME_PATH to the browser executable.')
  }

  const startedServer = await ensureServer(URL_TO_OPEN)
  const debugPort = await freePort()
  const profile = profileDir()
  mkdirSync(profile, { recursive: true })

  console.log(`• Opening ${URL_TO_OPEN}`)
  const chrome = spawn(
    browser,
    [
      `--app=${URL_TO_OPEN}`,
      `--user-data-dir=${profile}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-search-engine-choice-screen',
      '--disable-features=Translate,MediaRouter',
      '--hide-crash-restore-bubble',
      `--remote-debugging-port=${debugPort}`,
      `--window-size=${APP_W},${APP_H}`,
      '--window-position=0,0',
    ],
    { detached: true, stdio: 'ignore' },
  )
  chrome.unref()

  let version = null
  for (let i = 0; i < 80; i += 1) {
    await sleep(250)
    try {
      version = await cdpJson(debugPort, '/json/version')
      break
    } catch {}
  }
  if (!version) {
    throw new Error(
      'Could not attach to the browser window.\n' +
        'Close any AlgaeCore app windows and try again (a window with the same profile may already be open).',
    )
  }

  const targets = await cdpJson(debugPort, '/json/list')
  const page = targets.find((t) => t.type === 'page' && /^https?:/.test(t.url)) || targets.find((t) => t.type === 'page')
  if (!page) throw new Error('No browser page was found.')

  const pageCdp = connect(page.webSocketDebuggerUrl)
  const browserCdp = connect(version.webSocketDebuggerUrl)

  try {
    await Promise.all([pageCdp.ready, browserCdp.ready])
    await pageCdp.send('Runtime.enable')

    const evaluate = async (expression) => {
      const result = await pageCdp.send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true,
      })
      if (result.exceptionDetails) throw new Error(result.exceptionDetails.text)
      return result.result?.value
    }

    /* Wait until React has mounted the deck. */
    for (let i = 0; i < 40; i += 1) {
      if (await evaluate(`document.readyState === 'complete' && !!document.querySelector('.deck__stage')`)) break
      await sleep(250)
    }

    const screen = JSON.parse(
      await evaluate(
        `JSON.stringify({
          availWidth: screen.availWidth,
          availHeight: screen.availHeight,
          availLeft: screen.availLeft ?? 0,
          availTop: screen.availTop ?? 0,
          innerWidth,
          innerHeight,
          dpr: devicePixelRatio,
        })`,
      ),
    )

    const win = await browserCdp.send('Browser.getWindowForTarget', { targetId: page.id })
    const windowId = win.windowId
    let frameW = Math.max(0, win.bounds.width - screen.innerWidth)
    let frameH = Math.max(0, win.bounds.height - screen.innerHeight)

    /* Largest 16:9 content that fits the work area (prefer exact 1280×720). */
    const maxW = screen.availWidth - frameW - MARGIN * 2
    const maxH = screen.availHeight - frameH - MARGIN * 2
    const fittedHeight = Math.floor(Math.min(maxH, maxW / RATIO))
    const contentH = Number.isFinite(fittedHeight) && fittedHeight >= 320 ? Math.min(APP_H, fittedHeight) : APP_H
    const contentW = Math.round(contentH * RATIO)

    const place = async () => {
      const outerW = contentW + frameW
      const outerH = contentH + frameH
      const left = Math.round(screen.availLeft + (screen.availWidth - outerW) / 2)
      const top = Math.round(screen.availTop + (screen.availHeight - outerH) / 2)
      await browserCdp.send('Browser.setWindowBounds', {
        windowId,
        bounds: { left, top, width: outerW, height: outerH, windowState: 'normal' },
      })
    }

    await place()
    await sleep(600)

    /* One corrective pass in case the frame metrics differ slightly. */
    const measured = JSON.parse(await evaluate(`JSON.stringify({ w: innerWidth, h: innerHeight })`))
    if (Math.abs(measured.w - contentW) > 1 || Math.abs(measured.h - contentH) > 1) {
      frameW += contentW - measured.w
      frameH += contentH - measured.h
      await place()
      await sleep(400)
    }

    const finalSize = JSON.parse(await evaluate(`JSON.stringify({ w: innerWidth, h: innerHeight })`))
    const exact = finalSize.w === contentW && finalSize.h === contentH
    const scaled = contentW !== APP_W

    console.log(
      `${exact ? '✓' : '•'} 16:9 window — ${finalSize.w} × ${finalSize.h} px ` +
        `(ratio ${(finalSize.w / finalSize.h).toFixed(3)})`,
    )
    if (scaled) console.log('  (scaled down to fit the screen)')
    if (startedServer) console.log('• Dev server started in the background.')
    console.log('  Controls: → next · ← prev · F fullscreen · Ctrl+P save as PDF')
  } finally {
    pageCdp.close()
    browserCdp.close()
  }
}

main().catch((error) => {
  console.error(`✗ ${error.message}`)
  process.exitCode = 1
})
