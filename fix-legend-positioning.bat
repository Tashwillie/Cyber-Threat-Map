@echo off
echo Fixing Legend positioning to prevent content under sidebars...
git add .

echo Committing changes...
git commit -m "Fix Legend positioning: Prevent content appearing under sidebars, add proper z-index and positioning"

echo Pushing to GitHub...
git push origin master

echo.
echo Changes pushed! Vercel will automatically redeploy.
echo Fixed:
echo - Legend now positioned absolutely at bottom
echo - Higher z-index to prevent overlap
echo - Added padding to map container
echo - Content no longer appears under sidebars
pause
