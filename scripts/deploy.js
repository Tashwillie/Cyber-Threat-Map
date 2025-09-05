import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Create deployment package
async function createDeploymentPackage() {
  console.log('🚀 Creating deployment package...');
  
  const deployDir = path.join(projectRoot, 'deploy');
  const publicDir = path.join(deployDir, 'public');
  const serverDir = path.join(deployDir, 'server');
  
  // Clean existing deploy directory
  if (fs.existsSync(deployDir)) {
    fs.rmSync(deployDir, { recursive: true });
  }
  
  // Create directories
  fs.mkdirSync(deployDir, { recursive: true });
  fs.mkdirSync(publicDir, { recursive: true });
  fs.mkdirSync(serverDir, { recursive: true });
  
  // Copy client build files
  console.log('📦 Copying client build files...');
  const clientDist = path.join(projectRoot, 'packages', 'client', 'dist');
  if (fs.existsSync(clientDist)) {
    copyDirectory(clientDist, publicDir);
  } else {
    console.error('❌ Client dist directory not found. Please run "npm run build" in packages/client first.');
    process.exit(1);
  }
  
  // Copy server build files
  console.log('📦 Copying server build files...');
  const serverDist = path.join(projectRoot, 'packages', 'server', 'dist');
  if (fs.existsSync(serverDist)) {
    copyDirectory(serverDist, serverDir);
  } else {
    console.error('❌ Server dist directory not found. Please run "npm run build" in packages/server first.');
    process.exit(1);
  }
  
  // Copy server package.json
  const serverPackageJson = path.join(projectRoot, 'packages', 'server', 'package.json');
  if (fs.existsSync(serverPackageJson)) {
    fs.copyFileSync(serverPackageJson, path.join(serverDir, 'package.json'));
  }
  
  // Create main package.json
  console.log('📝 Creating main package.json...');
  const mainPackageJson = {
    name: "wwise-cyber-threat-map",
    version: "1.0.0",
    description: "Open-source Cyber-Attack Threat Map web app with responsive scaling",
    type: "module",
    main: "server/index.js",
    scripts: {
      start: "node server/index.js",
      install: "cd server && npm install --production"
    },
    dependencies: {
      "socket.io": "^4.7.4",
      "express": "^4.18.2",
      "cors": "^2.8.5",
      "zod": "^3.22.4"
    },
    engines: {
      node: ">=18.0.0"
    }
  };
  
  fs.writeFileSync(
    path.join(deployDir, 'package.json'),
    JSON.stringify(mainPackageJson, null, 2)
  );
  
  // Create .htaccess for Apache servers
  console.log('📝 Creating .htaccess file...');
  const htaccessContent = `# Cyber Threat Map - Apache Configuration
RewriteEngine On

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(?!api/).*$ /index.html [L]

# API proxy to Node.js server
RewriteRule ^api/(.*)$ http://localhost:3000/$1 [P,L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Cache static assets
<FilesMatch "\\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 month"
</FilesMatch>`;
  
  fs.writeFileSync(path.join(publicDir, '.htaccess'), htaccessContent);
  
  // Create deployment instructions
  console.log('📝 Creating deployment instructions...');
  const deploymentInstructions = `# Cyber Threat Map - Deployment Instructions

## 🚀 Quick Deploy

### Option 1: cPanel Deployment
1. Upload all files from this folder to your cPanel public_html directory
2. Extract maintaining folder structure
3. Open Terminal in cPanel
4. Run: \`npm install\`
5. Run: \`npm start\`
6. Access your site at your domain

### Option 2: VPS/Server Deployment
1. Upload files to your server
2. Install Node.js 18+
3. Run: \`npm install\`
4. Run: \`npm start\`
5. Configure reverse proxy (nginx/Apache) to point to port 3000

### Option 3: Docker Deployment
\`\`\`bash
# Build Docker image
docker build -t cyber-threat-map .

# Run container
docker run -p 3000:3000 cyber-threat-map
\`\`\`

## 🔧 Configuration

### Environment Variables
- PORT: Server port (default: 3000)
- HOST: Server host (default: 0.0.0.0)
- NODE_ENV: Environment (production/development)

### Features Included
✅ Responsive design for all screen sizes
✅ 55-inch display optimization
✅ Real-time attack simulation
✅ Interactive 2D world map
✅ Attack type legend
✅ Live statistics
✅ Mobile-friendly interface

## 📱 Responsive Scaling
- **Desktop (1920px+)**: 1.2x scale
- **Ultra-wide (2560px+)**: 1.4x scale  
- **4K/55-inch (3840px+)**: 1.6x scale

## 🛠 Troubleshooting
- Check Node.js version: \`node --version\`
- Check if port is available: \`netstat -tulpn | grep :3000\`
- View logs in cPanel Error Logs
- Ensure all dependencies are installed: \`npm list\`

## 📞 Support
For issues, check the application logs and ensure all requirements are met.
`;
  
  fs.writeFileSync(path.join(deployDir, 'DEPLOYMENT.md'), deploymentInstructions);
  
  // Create Dockerfile
  console.log('📝 Creating Dockerfile...');
  const dockerfileContent = `FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]`;
  
  fs.writeFileSync(path.join(deployDir, 'Dockerfile'), dockerfileContent);
  
  // Create docker-compose.yml
  console.log('📝 Creating docker-compose.yml...');
  const dockerComposeContent = `version: '3.8'

services:
  cyber-threat-map:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    restart: unless-stopped`;
  
  fs.writeFileSync(path.join(deployDir, 'docker-compose.yml'), dockerComposeContent);
  
  console.log('✅ Deployment package created successfully!');
  console.log('📁 Location: ./deploy/');
  console.log('🚀 Ready to deploy!');
}

// Helper function to copy directories
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Run the deployment script
createDeploymentPackage().catch(console.error);
