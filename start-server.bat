@echo off
echo ========================================
echo   TicketManager Website Launcher
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    echo This may take a minute...
    echo.
    call npm install
    echo.
)

echo Starting server...
echo.
echo ========================================
echo   Server will start at:
echo   http://localhost:3000
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start
