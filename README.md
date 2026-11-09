# AlgaeCore — Living Carbon Filter

A premium, PowerPoint-style presentation website built with **Vite + React + TypeScript** (no UI libraries).
Topic: *Technology & Environment* — turning buildings into living carbon filters.

## Run

```bash
npm install
npm run dev
```

## PDF export

- Press **Ctrl/Cmd + P**, or use the printer button, then choose **Save as PDF**.
- `@media print` + `@page { size: 1280px 720px }` guarantees **one landscape 16:9 page per slide**
  (13.33 in × 7.5 in), with navigation chrome removed and backgrounds preserved.

## Controls

| Input | Action |
| --- | --- |
| → / ↓ / Space / PageDown | Next slide |
| ← / ↑ / PageUp | Previous slide |
| Home / End | First / last slide |
| F | Fullscreen (Fullscreen API) |
| Ctrl/Cmd + P | Native PDF export |
| Mouse | Click left/right edge zones or the dots/arrow buttons |

## Structure

```
src/
  components/
    Presentation.tsx      # navigation state, keyboard, 16:9 scaling, fullscreen
    Slide.tsx             # slide surface + tone + transitions
    SlideOutline.tsx      # passive in-slide topic outline (visited = lit, unvisited = grey, not clickable)
    SlideControls.tsx     # counter, prev/next, fullscreen, print, hints
    ProgressIndicator.tsx # clickable progress dots
    Photo.tsx             # real photos (Wikimedia Commons, CC BY-SA) + credits + fallback
    ui.tsx                # cx, stagger-delay helper, SlideHeader
    icons.tsx             # minimal stroke icon set
  slides/
    Slide01.tsx … Slide05.tsx
  styles/
    global.css            # design tokens, reset
    presentation.css      # deck, slides, topic outline, transitions, chrome
    print.css             # @media print / @page rules for PDF export
  types.ts, App.tsx, main.tsx
```

Real photography of the actual BIQ House / "Algenhaus" (Hamburg) is hot-linked from
Wikimedia Commons with visible credits on every photo and a graceful fallback,
so no custom illustration assets are bundled.

## Notes

- Slides are authored at a fixed **1280 × 720** and scaled uniformly to any viewport, so the
  composition is identical on-screen and in print.
- Animations respect `prefers-reduced-motion` and are disabled during printing.
- AlgaeCore is an original concept name created for this presentation; **BIQ House** (Hamburg, 2013,
  Arup — SolarLeaf) is the real implemented example of algae facade technology.
