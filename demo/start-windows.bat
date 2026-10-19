@echo off
setlocal
cd /d "%~dp0"
set PORT=4173

where py >nul 2>nul
if not errorlevel 1 goto run_py

where python >nul 2>nul
if not errorlevel 1 goto run_python

echo Python was not found. Opening index.html directly.
start "" "%~dp0index.html"
exit /b 0

:run_py
echo Starting the demo at http://127.0.0.1:%PORT%
echo Keep this window open while using the site.
start "" "http://127.0.0.1:%PORT%"
py -3 -m http.server %PORT% --bind 127.0.0.1
exit /b %errorlevel%

:run_python
echo Starting the demo at http://127.0.0.1:%PORT%
echo Keep this window open while using the site.
start "" "http://127.0.0.1:%PORT%"
python -m http.server %PORT% --bind 127.0.0.1
exit /b %errorlevel%
