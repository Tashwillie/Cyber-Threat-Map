@echo off
echo Fixing right sidebar cutoff and adding vulnerabilities content...
git add .

echo Committing changes...
git commit -m "Fix right sidebar cutoff: Increase width to 220px, add detailed vulnerabilities list, improve layout"

echo Pushing to GitHub...
git push origin master

echo.
echo Changes pushed! Vercel will automatically redeploy.
echo Fixed:
echo - Increased right sidebar width to 220px
echo - Added detailed TOP VULNERABILITIES section
echo - Added CVE entries with proper styling
echo - Improved content layout and spacing
echo - Enhanced responsive design
pause
