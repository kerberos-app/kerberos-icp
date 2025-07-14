# IC App

A full-stack Internet Computer application with React frontend and Motoko backend.

## 🚀 Quick Start

```bash
# Deploy to local IC replica
./deploy.sh

# Deploy to IC mainnet
./deploy-ic.sh
```

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [DFX](https://internetcomputer.org/docs/current/developer-docs/getting-started/install/) (Internet Computer SDK)
- [Git](https://git-scm.com/)

## 🏗️ Project Structure

```
├── src/
│   ├── frontend/          # React TypeScript frontend
│   └── backend/           # Motoko backend canister
├── deploy.sh              # Local deployment script
├── deploy-ic.sh           # Mainnet deployment script
├── dfx.json              # DFX configuration
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
   - Deploy backend canister
   - Build and deploy frontend
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

```

## 🌐 Deployment

### Local Deployment (`./deploy.sh`)

For development and testing:

```bash
./deploy.sh
```

**What it does:**
- Starts local IC replica
- Deploys backend canister locally
- Builds React frontend
- Deploys frontend assets
- Creates local `.env` configuration
- Shows local URLs

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

# Check canister logs
dfx canister logs backend
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

**Out of cycles on mainnet:**
- Check your wallet balance: `dfx wallet balance --network ic`
- Top up at [NNS](https://nns.ic0.app/)

## 📚 Learn More

- [Internet Computer Docs](https://internetcomputer.org/docs/)
- [Motoko Language Guide](https://internetcomputer.org/docs/current/motoko/intro/)
- [DFX CLI Reference](https://internetcomputer.org/docs/current/references/cli-reference/)
- [React Documentation](https://react.dev/)

## 🎯 Next Steps

1. **Customize your frontend** in `src/frontend/`
2. **Add backend functions** in `src/backend/main.mo`
3. **Test locally** with `./deploy.sh`
4. **Deploy to mainnet** with `./deploy-ic.sh`

Happy building on the Internet Computer! 🚀 