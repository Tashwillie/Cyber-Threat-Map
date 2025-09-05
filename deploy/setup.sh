#!/bin/bash

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
