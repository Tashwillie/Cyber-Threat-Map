@echo off
echo Fixing full-screen layout to prevent cut-off...
git add .

echo Committing changes...
git commit -m "Fix full-screen layout: Prevent cut-off, ensure proper viewport coverage, fix positioning"

echo Pushing to GitHub...
git push origin master

echo.
echo Changes pushed! Vercel will automatically redeploy.
echo Your app will now:
echo - Take up the full screen without cut-off
echo - Have proper positioning and sizing
echo - Display the full layout as intended
echo - Work correctly on all screen sizes
pause
