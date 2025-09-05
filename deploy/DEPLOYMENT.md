# Cyber Threat Map - Deployment Instructions

## 🚀 Quick Deploy to cybersecurity.wwise.tech

### Prerequisites
- Linux server with cPanel or VPS access
- Root or sudo access for package installation
- Domain: cybersecurity.wwise.tech

### Step 1: Upload Files
1. Upload all files from this folder to your server
2. Place them in the `cybersecurity.wwise.tech` directory
3. Maintain the folder structure

### Step 2: Run Setup Script
```bash
# Make the script executable
chmod +x setup.sh

# Run the setup script
./setup.sh
```

### Step 3: Verify Deployment
1. Check if the app is running: `pm2 status`
2. View logs: `pm2 logs cyber-threat-map`
3. Visit: https://cybersecurity.wwise.tech

## 🔧 Manual Installation (if setup script fails)

### Install Node.js 18.x
```bash
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

### Install Dependencies
```bash
npm install
```

### Install PM2
```bash
sudo npm install -g pm2
```

### Start Application
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 📁 File Structure
```
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
```

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
```bash
node --version
npm --version
```

### Check Application Status
```bash
pm2 status
pm2 logs cyber-threat-map
```

### Restart Application
```bash
pm2 restart cyber-threat-map
```

### Check Port Usage
```bash
netstat -tulpn | grep :3000
```

## 📞 Support
For issues, check the application logs and ensure all requirements are met.
