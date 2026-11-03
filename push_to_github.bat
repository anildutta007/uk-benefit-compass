@echo off
title Push UK Benefit Compass to GitHub
cd /d "%~dp0"
echo ========================================================
echo   Pushing UK Benefit Compass to GitHub (anildutta007)
echo ========================================================
echo.
echo Remote target: https://github.com/anildutta007/uk-benefit-compass.git
echo.

git init -b main 2>nul
git add .
git commit -m "Launch UK Benefit Compass: Live Calculator, SIPP Rules, OpenStreetMap UK Regional Spend, and Asylum Support Breakdown" 2>nul
git branch -M main

git remote get-url origin >nul 2>nul
if errorlevel 1 (
    git remote add origin https://github.com/anildutta007/uk-benefit-compass.git
) else (
    git remote set-url origin https://github.com/anildutta007/uk-benefit-compass.git
)

git push -u origin main
if errorlevel 1 (
    echo.
    echo ========================================================
    echo [ACTION REQUIRED ON GITHUB]
    echo 1. Open your browser and go to: https://github.com/new
    echo 2. Repository name: uk-benefit-compass
    echo 3. Keep it Public (or Private)
    echo 4. Leave "Add a README file" UNCHECKED
    echo 5. Click "Create repository"
    echo 6. Run this push_to_github.bat script again!
    echo ========================================================
    echo.
    echo [DEPLOY TO VERCEL / NETLIFY]
    echo 1. Go to https://vercel.com/new
    echo 2. Import: anildutta007/uk-benefit-compass
    echo 3. Click Deploy
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo  SUCCESS! Your code has been pushed to GitHub:
    echo  https://github.com/anildutta007/uk-benefit-compass
    echo ========================================================
)
pause
