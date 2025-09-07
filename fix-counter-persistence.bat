@echo off
echo Fixing counter persistence issue...
git add .

echo Committing changes...
git commit -m "Fix counter persistence: Use localStorage to maintain 2.5M+ starting value across page refreshes"

echo Pushing to GitHub...
git push origin master

echo.
echo Changes pushed! Vercel will automatically redeploy.
echo Your counter will now persist across page refreshes and start from 2.5M+.
pause
