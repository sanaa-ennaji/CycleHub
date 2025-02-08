@echo off
:loop
git add .
git commit -m "Auto-commit on %date% %time%"
git push origin main
timeout /t 60 >nul
goto loop
