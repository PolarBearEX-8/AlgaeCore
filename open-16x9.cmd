@echo off
cd /d "%~dp0"
node "scripts\open-16x9.mjs" %*
if errorlevel 1 pause
