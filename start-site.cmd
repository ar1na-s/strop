@echo off
cd /d "%~dp0"
echo Starting site at http://localhost:3000
call npm.cmd run dev -- --hostname 127.0.0.1 --port 3000
if errorlevel 1 pause
