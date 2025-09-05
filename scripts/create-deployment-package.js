import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Create comprehensive deployment package
async function createDeploymentPackage() {
  console.log('🚀 Creating comprehensive deployment package for cybersecurity.wwise.tech...');
  
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
    name: "cyber-threat-map",
    version: "1.0.0",
    description: "Open-source Cyber-Attack Threat Map web app with responsive scaling",
    type: "module",
    main: "server/index.js",
    scripts: {
      start: "node server/index.js",
      install: "cd server && npm install --production",
      "pm2:start": "pm2 start server/index.js --name cyber-threat-map",
      "pm2:stop": "pm2 stop cyber-threat-map",
      "pm2:restart": "pm2 restart cyber-threat-map",
      "pm2:logs": "pm2 logs cyber-threat-map",
      "pm2:status": "pm2 status"
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
</FilesMatch>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>`;
  
  fs.writeFileSync(path.join(publicDir, '.htaccess'), htaccessContent);
  
  // Create setup script
  console.log('📝 Creating setup script...');
  const setupScript = `#!/bin/bash

echo "🚀 Setting up Cyber Threat Map on cybersecurity.wwise.tech"
echo "=================================================="

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo "❌ Please do not run this script as root"
    exit 1
fi

# Update system
echo "📦 Updating system packages..."
sudo yum update -y

# Install Node.js 18.x
echo "🔧 Installing Node.js 18.x..."
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verify installation
echo "✅ Verifying Node.js installation..."
NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
echo "Node.js version: $NODE_VERSION"
echo "npm version: $NPM_VERSION"

if [ $? -ne 0 ]; then
    echo "❌ Node.js installation failed"
    exit 1
fi

# Install dependencies
echo "📦 Installing application dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Install PM2 for process management
echo "🔧 Installing PM2 process manager..."
sudo npm install -g pm2

# Create PM2 ecosystem file
echo "📝 Creating PM2 ecosystem file..."
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'cyber-threat-map',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
EOF

# Start the application
echo "🚀 Starting the application..."
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup

echo ""
echo "✅ Setup complete!"
echo "=================================================="
echo "🌐 Your cyber threat map is now running!"
echo "📱 Visit: https://cybersecurity.wwise.tech"
echo ""
echo "🔧 Management commands:"
echo "  Check status: pm2 status"
echo "  View logs: pm2 logs cyber-threat-map"
echo "  Restart: pm2 restart cyber-threat-map"
echo "  Stop: pm2 stop cyber-threat-map"
echo "=================================================="`;
  
  fs.writeFileSync(path.join(deployDir, 'setup.sh'), setupScript);
  
  // Create PM2 ecosystem file
  console.log('📝 Creating PM2 ecosystem file...');
  const ecosystemConfig = `module.exports = {
  apps: [{
    name: 'cyber-threat-map',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};`;
  
  fs.writeFileSync(path.join(deployDir, 'ecosystem.config.js'), ecosystemConfig);
  
  // Create deployment instructions
  console.log('📝 Creating deployment instructions...');
  const deploymentInstructions = `# Cyber Threat Map - Deployment Instructions

## 🚀 Quick Deploy to cybersecurity.wwise.tech

### Prerequisites
- Linux server with cPanel or VPS access
- Root or sudo access for package installation
- Domain: cybersecurity.wwise.tech

### Step 1: Upload Files
1. Upload all files from this folder to your server
2. Place them in the \`cybersecurity.wwise.tech\` directory
3. Maintain the folder structure

### Step 2: Run Setup Script
\`\`\`bash
# Make the script executable
chmod +x setup.sh

# Run the setup script
./setup.sh
\`\`\`

### Step 3: Verify Deployment
1. Check if the app is running: \`pm2 status\`
2. View logs: \`pm2 logs cyber-threat-map\`
3. Visit: https://cybersecurity.wwise.tech

## 🔧 Manual Installation (if setup script fails)

### Install Node.js 18.x
\`\`\`bash
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
\`\`\`

### Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Install PM2
\`\`\`bash
sudo npm install -g pm2
\`\`\`

### Start Application
\`\`\`bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
\`\`\`

## 📁 File Structure
\`\`\`
cybersecurity.wwise.tech/
├── package.json              # Main package configuration
├── setup.sh                  # Automated setup script
├── ecosystem.config.js       # PM2 configuration
├── DEPLOYMENT.md             # This file
├── public/                   # Client application
│   ├── index.html
│   ├── assets/
│   └── .htaccess            # Apache configuration
└── server/                   # Node.js server
    ├── index.js
    ├── package.json
    └── types/
\`\`\`

## 🎯 Features Included
✅ Responsive design for all screen sizes
✅ 55-inch display optimization
✅ Real-time attack simulation
✅ Interactive 2D world map
✅ Attack type legend
✅ Live statistics
✅ Mobile-friendly interface
✅ Production-ready configuration

## 🛠 Troubleshooting

### Check Node.js Installation
\`\`\`bash
node --version
npm --version
\`\`\`

### Check Application Status
\`\`\`bash
pm2 status
pm2 logs cyber-threat-map
\`\`\`

### Restart Application
\`\`\`bash
pm2 restart cyber-threat-map
\`\`\`

### Check Port Usage
\`\`\`bash
netstat -tulpn | grep :3000
\`\`\`

## 📞 Support
For issues, check the application logs and ensure all requirements are met.
`;
  
  fs.writeFileSync(path.join(deployDir, 'DEPLOYMENT.md'), deploymentInstructions);
  
  // Create a simple start script
  console.log('📝 Creating start script...');
  const startScript = `#!/bin/bash
echo "🚀 Starting Cyber Threat Map..."
pm2 start ecosystem.config.js
echo "✅ Application started!"
echo "🌐 Visit: https://cybersecurity.wwise.tech"
echo "🔧 Check status: pm2 status"`;
  
  fs.writeFileSync(path.join(deployDir, 'start.sh'), startScript);
  
  // Create a stop script
  console.log('📝 Creating stop script...');
  const stopScript = `#!/bin/bash
echo "🛑 Stopping Cyber Threat Map..."
pm2 stop cyber-threat-map
echo "✅ Application stopped!"`;
  
  fs.writeFileSync(path.join(deployDir, 'stop.sh'), stopScript);
  
  console.log('✅ Comprehensive deployment package created successfully!');
  console.log('📁 Location: ./deploy/');
  console.log('🚀 Ready to upload to cybersecurity.wwise.tech!');
  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Upload all files from ./deploy/ to your server');
  console.log('2. Run: chmod +x setup.sh');
  console.log('3. Run: ./setup.sh');
  console.log('4. Visit: https://cybersecurity.wwise.tech');
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
