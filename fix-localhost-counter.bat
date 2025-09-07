@echo off
echo Fixing localhost counter to start from 2.5M+ with 100 attacks...
git add .

echo Committing changes...
git commit -m "Fix localhost: Use MockSocket for 2.5M+ counter, 100 initial attacks, consistent behavior"

echo Pushing to GitHub...
git push origin master

echo.
echo Changes pushed! Vercel will automatically redeploy.
echo Your localhost:4000 will now:
echo - Start counter from 2.5 million+
echo - Show 100 initial attacks
echo - Use MockSocket for consistent behavior
echo - Work the same as production
pause
