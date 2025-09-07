@echo off
echo Installing Vercel CLI...
npm install -g vercel

echo.
echo Deploying to Vercel...
echo This will open a browser window for authentication
echo.

vercel --prod

echo.
echo Deployment complete!
echo Your app should be available at the URL shown above
pause
