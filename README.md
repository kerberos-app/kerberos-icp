# Kerberos IC - Decentralized Password Manager

A full-stack Internet Computer application with React frontend and Motoko backend, featuring Internet Identity authentication and secure password management.

## 🚀 Quick Start

```bash
# Deploy to local IC replica (includes Internet Identity)
./deploy.sh

# Deploy to IC mainnet
./deploy-ic.sh
```

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [DFX](https://internetcomputer.org/docs/current/developer-docs/getting-started/install/) (Internet Computer SDK)
- [Git](https://git-scm.com/)

## 🔐 Internet Identity Setup

This application uses Internet Identity for secure, anonymous authentication. For local development, you need to install Internet Identity as a dependency.

### Installing Internet Identity Locally

1. **Add Internet Identity to your project:**
   ```bash
   # Add Internet Identity as a dependency in dfx.json
   ```
   
   Your `dfx.json` should include:
   ```json
   {
     "canisters": {
       "internet-identity": {
         "type": "pull",
         "id": "rdmx6-jaaaa-aaaaa-aaadq-cai"
       }
     }
   }
   ```

2. **Deploy Internet Identity locally:**
   ```bash
   # Start local replica
   dfx start --background --clean
   
   # Deploy Internet Identity canister
   dfx deploy internet-identity
   ```

3. **Configure environment variables:**
   The deployment scripts will automatically set up the correct canister IDs in your `.env` file:
   ```bash
   VITE_CANISTER_ID_INTERNET_IDENTITY=rdmx6-jaaaa-aaaaa-aaadq-cai
   ```

### Authentication Flow

- **Local Development**: Uses Internet Identity running on local replica
- **Mainnet**: Uses the live Internet Identity service at `https://identity.ic0.app`
- **Anonymous Authentication**: Internet Identity provides cryptographic proofs without revealing personal information
- **Secure Sessions**: Each authentication creates a unique, secure session for your vault

## 🏗️ Project Structure

```
├── src/
│   ├── frontend/          # React TypeScript frontend
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts (Auth, etc.)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   └── types/         # TypeScript type definitions
│   └── backend/           # Motoko backend canister
├── deploy.sh              # Local deployment script
├── deploy-ic.sh           # Mainnet deployment script
├── dfx.json              # DFX configuration (includes Internet Identity)
└── package.json          # Frontend dependencies
```

## 🔧 Development

### Local Development

1. **Start local development:**
   ```bash
   ./deploy.sh
   ```
   This will:
   - Start local IC replica
   - Deploy Internet Identity canister
   - Deploy backend canister
   - Build and deploy frontend
   - Configure authentication endpoints
   - Show you the local URLs

2. **Development server only:**
   ```bash
   npm run dev
   ```

### Environment Variables

Your project includes a `.env` file with configuration:

```bash
# Network configuration
VITE_DFX_NETWORK=local

# Canister IDs (auto-generated)
VITE_CANISTER_ID_BACKEND=
CANISTER_ID_BACKEND=

VITE_CANISTER_ID_FRONTEND=
CANISTER_ID_FRONTEND=

# Internet Identity configuration
VITE_CANISTER_ID_INTERNET_IDENTITY=rdmx6-jaaaa-aaaaa-aaadq-cai

```

## 🌐 Deployment

### Local Deployment (`./deploy.sh`)

For development and testing:

```bash
./deploy.sh
```

**What it does:**
- Starts local IC replica
- Deploys Internet Identity canister
- Deploys backend canister locally
- Builds React frontend with authentication
- Deploys frontend assets
- Creates local `.env` configuration
- Shows local URLs including auth endpoints

### Mainnet Deployment (`./deploy-ic.sh`)

For production deployment to Internet Computer mainnet:

```bash
./deploy-ic.sh
```

**What it does:**
- Checks your DFX identity and wallet
- Confirms you want to deploy to mainnet (costs cycles)
- Builds production frontend
- Deploys to IC mainnet
- Creates `.env.production` configuration
- Shows live URLs

**⚠️ Important for Mainnet:**
- You need ICP cycles for deployment
- Make sure you have a funded wallet
- Monitor cycles consumption at [NNS](https://nns.ic0.app/)

## 📱 Useful Commands

### Backend Interaction
```bash
# Call backend functions
dfx canister call backend <function_name>

# Check canister status
dfx canister status backend
dfx canister status internet-identity

# Check canister logs
dfx canister logs backend
dfx canister logs internet-identity
```

### Deployment Management
```bash
# Check all canister IDs
dfx canister id --all

# Check cycles balance
dfx wallet balance

# Top up canister with cycles
dfx canister deposit-cycles <amount> <canister-id>
```

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build frontend
npm run build

# Lint code
npm run lint
```

## 🔄 Updating Your App

1. **Make changes** to your frontend or backend code
2. **Redeploy locally:**
   ```bash
   ./deploy.sh
   ```
3. **Deploy to mainnet when ready:**
   ```bash
   ./deploy-ic.sh
   ```

## 🛠️ Troubleshooting

### Common Issues

**DFX not found:**
```bash
# Install DFX
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

**Port already in use:**
```bash
# Stop existing replica
dfx stop
# Clean and restart
dfx start --clean --background
```

**Deployment fails:**
```bash
# Clean build and try again
dfx stop
rm -rf .dfx
./deploy.sh
```
