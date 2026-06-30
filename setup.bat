@echo off
echo ============================================================
echo   RVLS - Robotic Vehicle Land Surveillance System
echo   Frontend Setup Script
echo ============================================================
echo.
echo [1/3] Checking Node.js installation...
node --version
if errorlevel 1 (
  echo ERROR: Node.js is not installed!
  echo Please install Node.js from https://nodejs.org/
  echo Recommended version: v20 LTS
  pause
  exit /b 1
)

echo.
echo [2/3] Installing dependencies...
npm install
if errorlevel 1 (
  echo ERROR: npm install failed!
  pause
  exit /b 1
)

echo.
echo [3/3] Starting development server...
echo Open http://localhost:5173 in your browser
echo.
npm run dev

pause
