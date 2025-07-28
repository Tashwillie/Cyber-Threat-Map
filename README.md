# Cyber Threat Map

An open-source real-time 3D cyber attack threat map built with React, Three.js, and Socket.IO. This project mimics Check Point's public threat map but uses only permissive libraries and mock attack data.

## Features

- 🌍 **3D Interactive Globe**: Real-time visualization of cyber attacks using Three.js and three-globe
- ⚡ **Real-time Updates**: Live attack events via Socket.IO
- 📊 **Attack Statistics**: Total attack counter and connection status
- 🎨 **Attack Type Legend**: Color-coded legend for different attack types
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔄 **Mock Data**: Realistic attack simulation with various types and severities

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **3D Graphics**: Three.js, three-globe
- **Real-time**: Socket.IO (client + server)
- **Backend**: Node.js, Express, TypeScript
- **Build Tool**: pnpm workspace
- **Validation**: Zod schema validation

## Prerequisites

- Node.js 18+
- pnpm

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wwise-cyber-threat-map
```

2. Install dependencies:
```bash
pnpm install
```

## Development

### Start the Server
```bash
cd packages/server
pnpm dev
```
The server will run on `http://localhost:4000`

### Start the Client
```bash
cd packages/client
pnpm dev
```
The client will run on `http://localhost:5173`

### Start Both (Development)
From the root directory:
```bash
pnpm dev
```

## Attack Types

The application simulates the following cyber attack types:

- **DDoS Attack** (Red): Distributed Denial of Service attacks
- **Malware** (Orange): Malicious software attacks
- **Phishing** (Yellow): Social engineering attacks
- **Ransomware** (Dark Red): Data encryption attacks
- **SQL Injection** (Purple): Database attacks

## Project Structure

```
wwise-cyber-threat-map/
├── packages/
│   ├── server/           # Socket.IO server + mock data
│   │   ├── src/
│   │   │   ├── types/    # Attack event types
│   │   │   ├── utils/    # Mock data generator
│   │   │   └── index.ts  # Server entry point
│   │   └── package.json
│   └── client/           # React frontend
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── hooks/       # Custom hooks
│       │   ├── types/       # Shared types
│       │   └── App.tsx      # Main app component
│       └── package.json
├── package.json          # Root workspace config
└── pnpm-workspace.yaml
```

## Building for Production

```bash
# Build both packages
pnpm build

# Start production server
cd packages/server
pnpm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `pnpm lint`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by [Check Point's Threat Map](https://threatmap.checkpoint.com/)
- Built with [Three.js](https://threejs.org/) and [three-globe](https://github.com/vasturiano/three-globe)
- Real-time communication powered by [Socket.IO](https://socket.io/) 