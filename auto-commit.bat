@echo off
:loop
git add .
git commit -m "update on  %time%"
git push origin main
timeout /t 120 >nul
goto loop
