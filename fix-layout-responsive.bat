@echo off
echo Fixing layout and responsive design issues...
git add .

echo Committing changes...
git commit -m "Fix layout and responsive design: Prevent overlapping, add mobile/tablet support, improve positioning"

echo Pushing to GitHub...
git push origin master

echo.
echo Changes pushed! Vercel will automatically redeploy.
echo Your app now has:
echo - Fixed layout issues (no more overlapping)
echo - Responsive design for mobile and tablet
echo - Better positioning and spacing
echo - Improved map scaling
pause
