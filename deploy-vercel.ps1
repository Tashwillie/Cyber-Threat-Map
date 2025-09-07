Write-Host "Installing Vercel CLI..." -ForegroundColor Green
npm install -g vercel

Write-Host "`nDeploying to Vercel..." -ForegroundColor Yellow
Write-Host "This will open a browser window for authentication" -ForegroundColor Cyan
Write-Host ""

vercel --prod

Write-Host "`nDeployment complete!" -ForegroundColor Green
Write-Host "Your app should be available at the URL shown above" -ForegroundColor Cyan
Read-Host "Press Enter to continue"
