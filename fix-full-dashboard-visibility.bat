@echo off
echo Fixing full dashboard visibility issues...
git add .

echo Committing changes...
git commit -m "Fix full dashboard visibility: Improve z-index, positioning, and layout to show complete dashboard"

echo Pushing to GitHub...
git push origin master

echo.
echo Changes pushed! Vercel will automatically redeploy.
echo Fixed:
echo - Improved z-index layering
echo - Better positioning for all elements
echo - Enhanced full-screen coverage
echo - Proper sidebar visibility
echo - Complete dashboard display
pause
