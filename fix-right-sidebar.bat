@echo off
echo Fixing right sidebar to match localhost version...
git add .

echo Committing changes...
git commit -m "Fix right sidebar: Increase width, add content sections, match localhost layout"

echo Pushing to GitHub...
git push origin master

echo.
echo Changes pushed! Vercel will automatically redeploy.
echo Fixed:
echo - Increased right sidebar width to 200px
echo - Added Top Vulnerabilities section
echo - Added Top Targeted Countries section
echo - Added Top Targeted Industries section
echo - Improved padding and spacing
echo - Enhanced content layout
pause
