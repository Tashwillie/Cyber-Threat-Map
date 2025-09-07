@echo off
echo Fixing counter to start from 2.5 million...
git add .

echo Committing changes...
git commit -m "Fix counter initialization: Ensure 2.5M+ starting value with better error handling"

echo Pushing to GitHub...
git push origin master

echo.
echo Changes pushed! Vercel will automatically redeploy.
echo Your counter should now start from 2.5 million instead of 22.
echo Check the browser console for debug logs to verify the fix.
pause
