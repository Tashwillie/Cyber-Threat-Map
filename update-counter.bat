@echo off
echo Adding changes...
git add .

echo Committing changes...
git commit -m "Fix counter to start from 2.5M on Vercel - force mock socket usage"

echo Pushing to GitHub...
git push origin master

echo.
echo Changes pushed! Vercel will automatically redeploy.
echo Your counter should now start from 2.5 million.
pause
