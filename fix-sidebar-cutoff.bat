@echo off
echo Fixing left sidebar cutoff issues...
git add .

echo Committing changes...
git commit -m "Fix left sidebar cutoff: Increase width, improve padding, ensure full content display"

echo Pushing to GitHub...
git push origin master

echo.
echo Changes pushed! Vercel will automatically redeploy.
echo Fixed:
echo - Increased sidebar width from 180px to 200px
echo - Improved padding and spacing
echo - Changed overflow to visible
echo - Added minimum heights for content sections
echo - Enhanced responsive design
pause
