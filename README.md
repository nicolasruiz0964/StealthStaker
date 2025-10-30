# StealthStaker

<div align="center">

**The First Fully Confidential Staking Platform Built on Fully Homomorphic Encryption (FHE)**

[![License](https://img.shields.io/badge/license-BSD--3--Clause--Clear-blue.svg)](LICENSE)
[![Solidity](https://img.shields.io/badge/solidity-^0.8.27-brightgreen.svg)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/hardhat-2.26.0-yellow.svg)](https://hardhat.org/)
[![React](https://img.shields.io/badge/react-19.1.1-61dafb.svg)](https://reactjs.org/)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Advantages](#advantages)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Local Development](#local-development)
  - [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Smart Contract Details](#smart-contract-details)
- [Frontend Features](#frontend-features)
- [Usage Guide](#usage-guide)
- [Available Tasks](#available-tasks)
- [Testing](#testing)
- [Security Considerations](#security-considerations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Resources](#resources)
- [License](#license)
- [Support](#support)

---

## Overview

**StealthStaker** is a revolutionary decentralized staking platform that leverages **Fully Homomorphic Encryption (FHE)** to provide complete privacy for staking operations. Unlike traditional blockchain applications where all transaction data is public, StealthStaker ensures that your token balances, staking amounts, and financial activities remain completely confidential while still being verifiable on-chain.

Built on Zama's **fhEVM** (Fully Homomorphic Encryption Virtual Machine) technology, StealthStaker introduces the **tZama token** (based on the ERC-7984 confidential token standard), enabling users to stake their tokens with absolute privacy. The platform demonstrates how next-generation blockchain applications can provide both transparency and privacy simultaneously.

### What is Fully Homomorphic Encryption?

Fully Homomorphic Encryption (FHE) is a cryptographic breakthrough that allows computations to be performed directly on encrypted data without ever decrypting it. In the context of blockchain:

- **Traditional blockchains**: All data is public and visible to everyone
- **FHE-enabled blockchains**: Data remains encrypted on-chain, yet smart contracts can still perform computations on it
- **Privacy + Verifiability**: Users can prove they have sufficient funds without revealing their exact balance

---

## Key Features

### Core Functionality

- **Confidential Token Standard (ERC-7984)**: Built on the latest confidential token standard, ensuring compatibility with future FHE-enabled applications
- **Private Staking/Unstaking**: Stake and unstake tokens with encrypted amounts - no one can see how much you're staking
- **Encrypted Balances**: All token balances are stored as encrypted values on-chain
- **Client-Side Decryption**: Only you can decrypt your balances using your private key
- **Test Faucet**: Mint test tokens for experimenting with the platform
- **Real-Time Balance Tracking**: Monitor your encrypted balances and decrypt them when needed
- **Secure Operations**: All operations are cryptographically secured using FHE

### User Experience

- **Web3 Wallet Integration**: Connect with MetaMask and other popular wallets via RainbowKit
- **Intuitive Interface**: Clean, modern UI for managing your confidential staking operations
- **Transaction Feedback**: Clear status messages for all operations
- **Encrypted Input**: Local encryption of sensitive data before sending to the blockchain
- **No KYC Required**: Truly decentralized and privacy-preserving

---

## Problem Statement

### Current Challenges in DeFi Staking

1. **Lack of Privacy**: Traditional blockchain platforms expose all transaction details, including:
   - Wallet balances
   - Staking amounts
   - Transaction history
   - Financial patterns

2. **Surveillance Risk**: Public ledgers enable:
   - Front-running attacks based on visible transactions
   - Profiling of wealthy addresses
   - Tracking of user financial behavior
   - Potential targeting of high-value accounts

3. **Regulatory Concerns**: Complete transparency can:
   - Discourage institutional adoption
   - Create compliance issues in privacy-conscious jurisdictions
   - Expose users to unwanted scrutiny

4. **Limited Financial Privacy**: Users cannot:
   - Stake tokens without revealing amounts
   - Maintain private portfolio compositions
   - Conduct business without competitors seeing their strategies

### Why Privacy Matters

- **Individual Privacy**: Users deserve financial privacy just as in traditional finance
- **Competitive Advantage**: Businesses need to protect their trading strategies
- **Security**: Hidden balances reduce the risk of targeted attacks
- **Adoption**: Privacy is essential for mainstream adoption of blockchain technology

---

## Solution

**StealthStaker** solves these problems by implementing **Fully Homomorphic Encryption** at the protocol level:

### How It Works

1. **Encrypted Storage**: All balances and staking amounts are stored as encrypted values on-chain
2. **FHE Computation**: Smart contracts perform operations (additions, subtractions, comparisons) directly on encrypted data
3. **Zero-Knowledge Privacy**: The blockchain validates transactions without ever knowing the actual amounts
4. **Selective Disclosure**: Users can decrypt their own data locally but no one else can
5. **On-Chain Verification**: All operations remain verifiable and auditable while preserving privacy

### Innovation

StealthStaker demonstrates that blockchain applications can provide:
- **Privacy without sacrificing decentralization**
- **Confidentiality without trusted third parties**
- **Security through cryptography, not obscurity**
- **A glimpse into the future of privacy-preserving DeFi**

---

## Technology Stack

### Smart Contracts

| Technology | Version | Purpose |
|------------|---------|---------|
| **Solidity** | ^0.8.27 | Smart contract programming language |
| **fhEVM** | Latest | Fully Homomorphic Encryption Virtual Machine by Zama |
| **ERC-7984** | Latest | Confidential token standard for encrypted tokens |
| **Hardhat** | ^2.26.0 | Development environment and testing framework |
| **TypeChain** | ^8.3.2 | TypeScript bindings for smart contracts |
| **OpenZeppelin Confidential Contracts** | ^0.3.0 | Secure, community-vetted confidential contract libraries |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^19.1.1 | UI framework for building the web interface |
| **TypeScript** | ^5.8.3 | Type-safe JavaScript for robust development |
| **Vite** | ^7.1.6 | Fast build tool and development server |
| **Wagmi** | ^2.17.0 | React hooks for Ethereum interactions |
| **RainbowKit** | ^2.2.8 | Wallet connection UI library |
| **ethers.js** | ^6.15.0 | Ethereum library for smart contract interaction |
| **Viem** | ^2.37.6 | Lightweight Ethereum library |
| **Zama Relayer SDK** | ^0.2.0 | SDK for FHE encryption and decryption operations |

### Development Tools

- **hardhat-deploy**: Deployment automation
- **hardhat-gas-reporter**: Gas usage optimization
- **solhint**: Solidity linting
- **ESLint**: TypeScript/JavaScript linting
- **Prettier**: Code formatting
- **Mocha & Chai**: Testing framework
- **Solidity Coverage**: Code coverage reporting

### Infrastructure

- **Ethereum Sepolia Testnet**: Test deployment network
- **Infura**: Ethereum node provider
- **Etherscan**: Contract verification and explorer
- **Zama fhEVM**: Encrypted computation infrastructure

---

## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Wallet      │  │   Zama       │  │  Contract    │     │
│  │  Connection  │  │   Encryption │  │  Interface   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Ethereum Network (Sepolia)                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              TZama Smart Contract                     │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │  Encrypted │  │  Encrypted │  │    FHE     │    │  │
│  │  │  Balances  │  │   Staking  │  │ Operations │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Zama fhEVM Protocol                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │    FHE Computation Layer (Encrypted Processing)        │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

#### Staking Flow

1. **User Input**: User enters amount to stake in the frontend
2. **Local Encryption**: Amount is encrypted client-side using Zama SDK
3. **Transaction Submission**: Encrypted amount + proof sent to smart contract
4. **On-Chain Computation**: Contract performs FHE operations:
   - Validates encrypted amount ≤ wallet balance
   - Transfers encrypted amount from wallet to staking pool
   - Updates encrypted staking balance
   - Updates encrypted total staked
5. **Result**: All values remain encrypted on-chain

#### Balance Decryption Flow

1. **User Request**: User clicks "Decrypt Balances"
2. **Keypair Generation**: Temporary keypair generated client-side
3. **EIP-712 Signature**: User signs decryption request
4. **Relayer Call**: Encrypted handles sent to Zama relayer with signature
5. **Decryption**: Relayer decrypts values using user's signature authorization
6. **Display**: Decrypted values displayed locally (never stored on-chain)

---

## Advantages

### Privacy & Security

✅ **Complete Financial Privacy**: Your balances and staking amounts are invisible to everyone except you

✅ **Protection from Front-Running**: Encrypted transactions prevent MEV bots from seeing and exploiting your trades

✅ **Reduced Attack Surface**: Hidden balances make you less of a target for hackers and scammers

✅ **No Trusted Third Parties**: Privacy guaranteed by cryptography, not by trusting intermediaries

### Technical Innovation

✅ **Cutting-Edge Cryptography**: Built on the latest advances in Fully Homomorphic Encryption

✅ **ERC-7984 Compliance**: Uses the standardized confidential token interface for future compatibility

✅ **Composable Privacy**: Can integrate with other FHE-enabled protocols

✅ **On-Chain Computation**: All logic executes on-chain with mathematical guarantees

### User Experience

✅ **Familiar Interface**: Works with standard Web3 wallets (MetaMask, WalletConnect, etc.)

✅ **Transparent Operations**: Clear feedback on transaction status

✅ **No Complex Setup**: No need to run your own node or install special software

✅ **Test Environment**: Faucet available for risk-free experimentation

### Developer Benefits

✅ **Open Source**: Fully auditable code base

✅ **Comprehensive Testing**: Extensive test suite included

✅ **Modern Stack**: Built with latest Solidity, React, and TypeScript

✅ **Well-Documented**: Clear documentation and code comments

✅ **Extensible**: Modular architecture for easy customization

### Business Value

✅ **Competitive Advantage**: Privacy-preserving features attract privacy-conscious users

✅ **Regulatory Compliance**: Better privacy controls can help meet regulatory requirements

✅ **Institutional Adoption**: Enterprises require privacy for blockchain adoption

✅ **Future-Proof**: Positioned for the next generation of blockchain technology

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: Version 20 or higher
  ```bash
  node --version  # Should show v20.x.x or higher
  ```
- **npm**: Version 7.0.0 or higher
  ```bash
  npm --version   # Should show 7.x.x or higher
  ```
- **Git**: For cloning the repository
  ```bash
  git --version
  ```
- **MetaMask**: Browser extension for wallet connection

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/StealthStaker.git
   cd StealthStaker
   ```

2. **Install smart contract dependencies**

   ```bash
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd src
   npm install
   cd ..
   ```

### Configuration

#### Smart Contract Configuration

1. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```bash
   # Create .env file
   touch .env
   ```

   Add the following variables:

   ```env
   # Private key for deployment (DO NOT commit this!)
   PRIVATE_KEY=your_private_key_here

   # Infura API key for Sepolia testnet access
   INFURA_API_KEY=your_infura_api_key_here

   # Optional: Etherscan API key for contract verification
   ETHERSCAN_API_KEY=your_etherscan_api_key_here
   ```

   **Alternative**: Use Hardhat's secure variable storage:

   ```bash
   npx hardhat vars set PRIVATE_KEY
   npx hardhat vars set INFURA_API_KEY
   npx hardhat vars set ETHERSCAN_API_KEY
   ```

2. **Get Sepolia test ETH**

   - Visit a Sepolia faucet: https://sepoliafaucet.com/
   - Request test ETH for your deployment wallet

#### Frontend Configuration

1. **Update contract addresses** (after deployment)

   Edit `src/src/config/contracts.ts`:

   ```typescript
   export const CONTRACT_ADDRESS = '0xYourDeployedContractAddress';
   ```

2. **Configure RPC endpoints** (if needed)

   Edit `src/src/config/wagmi.ts` to customize network settings

### Local Development

#### Start Local Hardhat Node

```bash
# Terminal 1: Start local blockchain with FHE support
npm run chain

# The node will start at http://localhost:8545
```

#### Deploy Contracts Locally

```bash
# Terminal 2: Deploy to local network
npm run deploy:localhost

# Note the deployed contract address
```

#### Run Frontend Development Server

```bash
# Terminal 3: Navigate to frontend and start dev server
cd src
npm run dev

# Frontend will be available at http://localhost:5173
```

#### Access the Application

1. Open your browser to `http://localhost:5173`
2. Connect MetaMask to localhost network:
   - Network Name: Localhost 8545
   - RPC URL: http://localhost:8545
   - Chain ID: 31337
   - Currency Symbol: ETH
3. Import a test account from the Hardhat node output
4. Start using the application!

### Deployment

#### Deploy to Sepolia Testnet

1. **Ensure configuration is complete**
   - Private key is set
   - Infura API key is configured
   - Wallet has Sepolia ETH

2. **Compile contracts**

   ```bash
   npm run compile
   ```

3. **Deploy to Sepolia**

   ```bash
   npm run deploy:sepolia
   ```

   This will output your deployed contract address. Save this address!

4. **Verify contract on Etherscan** (optional but recommended)

   ```bash
   npm run verify:sepolia
   ```

5. **Update frontend configuration**

   Edit `src/src/config/contracts.ts` with your deployed address

6. **Build and deploy frontend**

   ```bash
   cd src
   npm run build

   # Deploy the 'dist' folder to your hosting provider
   # (Netlify, Vercel, GitHub Pages, etc.)
   ```

---

## Project Structure

```
StealthStaker/
├── contracts/                 # Solidity smart contracts
│   └── tZama.sol             # Main confidential staking contract
│
├── deploy/                    # Deployment scripts
│   └── deploy.ts             # Hardhat deploy configuration
│
├── tasks/                     # Hardhat custom tasks
│   ├── accounts.ts           # Account management tasks
│   └── tZama.ts              # tZama contract interaction tasks
│
├── test/                      # Smart contract tests
│   └── TZama.ts              # Comprehensive test suite
│
├── src/                       # Frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Header.tsx    # Navigation header
│   │   │   └── StakingApp.tsx # Main staking interface
│   │   ├── config/           # Configuration files
│   │   │   ├── contracts.ts  # Contract ABI and address
│   │   │   └── wagmi.ts      # Wagmi/RainbowKit config
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── useEthersSigner.ts  # Ethers signer hook
│   │   │   └── useZamaInstance.ts  # FHE instance hook
│   │   ├── styles/           # CSS styling
│   │   └── main.tsx          # Application entry point
│   ├── index.html            # HTML template
│   ├── vite.config.ts        # Vite configuration
│   └── package.json          # Frontend dependencies
│
├── hardhat.config.ts          # Hardhat configuration
├── package.json               # Project dependencies
├── tsconfig.json              # TypeScript configuration
├── .env                       # Environment variables (not committed)
├── .gitignore                # Git ignore rules
└── README.md                  # This file
```

---

## Smart Contract Details

### TZama Contract

The `TZama` contract implements a confidential token with staking capabilities:

#### Inheritance

- **ERC7984**: Confidential token standard with encrypted balances
- **SepoliaConfig**: Configuration for Sepolia testnet FHE parameters

#### State Variables

```solidity
mapping(address => euint64) private _stakedBalances;  // Encrypted staking balances
euint64 private _totalStaked;                          // Encrypted total staked amount
```

#### Key Functions

##### `faucet(address to, uint64 amount)`
- **Purpose**: Mint test tokens to an address
- **Access**: Public (for testing purposes)
- **Privacy**: Minted amount is encrypted on-chain
- **Events**: Emits `FaucetMinted`

##### `stake(externalEuint64 encryptedAmount, bytes calldata inputProof)`
- **Purpose**: Stake tokens confidentially
- **Input**: Encrypted amount and cryptographic proof
- **Process**:
  1. Validates encrypted input
  2. Transfers encrypted amount from user to contract
  3. Increases user's encrypted staked balance
  4. Increases total encrypted staked amount
- **Privacy**: All values remain encrypted throughout
- **Events**: Emits `Staked`

##### `unstake(externalEuint64 encryptedAmount, bytes calldata inputProof)`
- **Purpose**: Withdraw staked tokens confidentially
- **Input**: Encrypted amount and cryptographic proof
- **Process**:
  1. Validates encrypted input
  2. Checks sufficient encrypted staked balance (FHE comparison)
  3. Decreases user's encrypted staked balance
  4. Decreases total encrypted staked amount
  5. Transfers encrypted amount back to user
- **Privacy**: All values remain encrypted
- **Events**: Emits `Unstaked`

##### `getStakedBalance(address account)`
- **Purpose**: Retrieve encrypted staking balance
- **Returns**: Encrypted value (euint64 handle)
- **Privacy**: Only user can decrypt their own balance

##### `getTotalStaked()`
- **Purpose**: Retrieve total encrypted staked amount
- **Returns**: Encrypted value (euint64 handle)
- **Privacy**: Only authorized parties can decrypt

#### Security Features

- **FHESafeMath**: Safe arithmetic operations on encrypted values
- **Access Control**: Automatic permission management via FHE.allow()
- **Input Validation**: Cryptographic proof verification for all encrypted inputs
- **Overflow Protection**: Built-in protection against arithmetic overflows

---

## Frontend Features

### Components

#### Header Component
- Wallet connection button (RainbowKit integration)
- Network status indicator
- User address display

#### StakingApp Component
- **Balance Display Section**
  - Shows encrypted handles for wallet, staked, and total balances
  - Decrypt button for viewing actual amounts
  - Real-time balance updates

- **Faucet Section**
  - Request test tokens
  - Configurable mint amount
  - Instant balance refresh

- **Staking Section**
  - Input field for stake amount
  - Automatic client-side encryption
  - Transaction status feedback

- **Unstaking Section**
  - Input field for unstake amount
  - Encrypted withdrawal
  - Balance synchronization

### Custom Hooks

#### useEthersSigner
- Converts Wagmi client to Ethers signer
- Provides compatibility with Ethers.js contracts
- Handles wallet connection state

#### useZamaInstance
- Initializes Zama FHE instance
- Manages encryption/decryption service
- Handles loading and error states

### User Flow

1. **Connect Wallet**: Click "Connect Wallet" and select your wallet provider
2. **Get Test Tokens**: Use the faucet to mint tZama tokens
3. **Stake Tokens**: Enter amount, automatically encrypted locally, then submitted
4. **View Balances**: Click "Decrypt Balances" to see your actual amounts
5. **Unstake Tokens**: Enter amount to withdraw, automatically handled with encryption

---

## Usage Guide

### For End Users

#### Getting Started

1. **Connect Your Wallet**
   - Click "Connect Wallet"
   - Approve the connection in MetaMask
   - Ensure you're on Sepolia testnet

2. **Get Test Tokens**
   - Enter amount (e.g., 1000)
   - Click "Mint Tokens"
   - Wait for transaction confirmation

3. **Stake Your Tokens**
   - Enter amount to stake
   - Click "Stake"
   - Approve the transaction
   - Your amount is encrypted locally before sending!

4. **View Your Balances**
   - Click "Decrypt Balances"
   - Sign the decryption request
   - See your actual amounts (only you can see these)

5. **Unstake Your Tokens**
   - Enter amount to unstake
   - Click "Unstake"
   - Approve the transaction
   - Tokens return to your wallet (still encrypted)

#### Understanding Encrypted Handles

When you look at the blockchain explorer, you'll see values like:
```
0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
```

These are **encrypted handles** - cryptographic references to your encrypted balances. Only you can decrypt them using your private key!

### For Developers

#### Interacting with the Contract

##### Using Hardhat Tasks

```bash
# Get contract address
npx hardhat task:address --network sepolia

# Mint tokens
npx hardhat task:faucet --to <ADDRESS> --amount 1000 --network sepolia

# Stake tokens
npx hardhat task:stake --value 500 --network sepolia

# Unstake tokens
npx hardhat task:unstake --value 200 --network sepolia

# View balances (decrypted)
npx hardhat task:balances --network sepolia
npx hardhat task:balances --user <ADDRESS> --network sepolia
```

##### Using Ethers.js

```typescript
import { Contract } from 'ethers';
import { createFhevmInstance } from 'fhevmjs';

// Initialize contract
const contract = new Contract(contractAddress, abi, signer);

// Encrypt value
const instance = await createFhevmInstance({ networkUrl });
const input = instance.createEncryptedInput(contractAddress, userAddress);
input.add64(stakeAmount);
const encrypted = input.encrypt();

// Stake
const tx = await contract.stake(
  encrypted.handles[0],
  encrypted.inputProof
);
await tx.wait();

// Get encrypted balance
const encryptedBalance = await contract.getStakedBalance(userAddress);

// Decrypt (requires signature)
const decrypted = await instance.decrypt(
  encryptedBalance,
  privateKey,
  publicKey,
  signature,
  contractAddress,
  userAddress
);
```

---

## Available Tasks

### Smart Contract Tasks

| Command | Description |
|---------|-------------|
| `npm run compile` | Compile all smart contracts |
| `npm run test` | Run local test suite |
| `npm run test:sepolia` | Run tests on Sepolia testnet |
| `npm run deploy:localhost` | Deploy to local Hardhat network |
| `npm run deploy:sepolia` | Deploy to Sepolia testnet |
| `npm run verify:sepolia` | Verify contract on Etherscan |
| `npm run clean` | Clean build artifacts and cache |
| `npm run lint` | Run Solidity and TypeScript linting |
| `npm run lint:sol` | Run Solidity linting only |
| `npm run lint:ts` | Run TypeScript linting only |
| `npm run prettier:check` | Check code formatting |
| `npm run prettier:write` | Fix code formatting |
| `npm run coverage` | Generate test coverage report |
| `npm run typechain` | Generate TypeScript bindings |

### Frontend Tasks

```bash
cd src

# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint frontend code
```

---

## Testing

### Smart Contract Tests

The test suite in `test/TZama.ts` covers:

- ✅ Token minting via faucet
- ✅ Encrypted balance verification
- ✅ Confidential staking operations
- ✅ Encrypted balance updates
- ✅ Total staked amount tracking
- ✅ Confidential unstaking operations
- ✅ Balance restoration after unstaking
- ✅ FHE computation correctness

#### Running Tests

```bash
# Run all tests locally
npm run test

# Run with gas reporting
REPORT_GAS=true npm run test

# Run specific test file
npx hardhat test test/TZama.ts

# Run on Sepolia (be careful - uses real gas!)
npm run test:sepolia
```

#### Test Coverage

```bash
# Generate coverage report
npm run coverage

# View coverage report
open coverage/index.html
```

### Manual Testing Checklist

- [ ] Deploy contract to Sepolia
- [ ] Verify contract on Etherscan
- [ ] Connect wallet to frontend
- [ ] Request faucet tokens
- [ ] Verify encrypted balance is updated
- [ ] Decrypt and verify balance amount
- [ ] Stake tokens with various amounts
- [ ] Verify staked balance increases
- [ ] Verify wallet balance decreases
- [ ] Decrypt and verify both balances
- [ ] Unstake tokens
- [ ] Verify balances update correctly
- [ ] Test edge cases (stake 0, unstake more than staked, etc.)
- [ ] Verify events are emitted correctly
- [ ] Test on multiple wallets/accounts

---

## Security Considerations

### Smart Contract Security

✅ **Audited Libraries**: Uses OpenZeppelin confidential contracts

✅ **FHE-Specific Security**: Proper handling of encrypted values and permissions

✅ **Input Validation**: All encrypted inputs require cryptographic proofs

✅ **Access Control**: FHE permissions automatically managed

✅ **Safe Math**: FHESafeMath prevents overflow/underflow on encrypted values

⚠️ **Not Yet Audited**: This is experimental code - do not use in production with real funds

### Frontend Security

✅ **Local Encryption**: Sensitive values encrypted before leaving the client

✅ **Secure Key Management**: Uses user's wallet for cryptographic operations

✅ **No Sensitive Data Storage**: Decrypted values never persisted

✅ **HTTPS Required**: Always use HTTPS in production

⚠️ **Testnet Only**: Currently configured for testnet use only

### User Precautions

🔒 **Never share your private key** - No one from the StealthStaker team will ever ask for it

🔒 **Verify contract addresses** - Always double-check you're interacting with the correct contract

🔒 **Use testnet funds** - This is experimental technology; only use test ETH and tokens

🔒 **Keep MetaMask updated** - Ensure your wallet software is up to date

🔒 **Understand FHE limitations** - While data is encrypted, gas usage patterns may leak some information

### Known Limitations

- **Gas Costs**: FHE operations are more expensive than regular operations
- **Computation Time**: Encrypted computations take longer than plaintext
- **Pattern Analysis**: Transaction patterns (timing, frequency) are still visible
- **Network Dependency**: Requires connection to Zama's FHE infrastructure

---

## Roadmap

### Phase 1: Foundation ✅ (Current)
- [x] Core FHE staking contract
- [x] ERC-7984 integration
- [x] Basic frontend interface
- [x] Faucet functionality
- [x] Sepolia testnet deployment
- [x] Hardhat task suite
- [x] Comprehensive documentation

### Phase 2: Enhancement (Q2 2025)
- [ ] Staking rewards distribution (confidential)
- [ ] Lock-up periods with time-based release
- [ ] Delegate staking
- [ ] Governance integration
- [ ] Multi-token support
- [ ] Advanced analytics dashboard
- [ ] Mobile-responsive improvements

### Phase 3: Advanced Features (Q3 2025)
- [ ] Confidential voting for stakers
- [ ] Liquid staking tokens (confidential)
- [ ] Cross-chain staking bridges
- [ ] Confidential lending protocol integration
- [ ] Automated compound staking
- [ ] Risk management tools
- [ ] Portfolio tracking

### Phase 4: Production (Q4 2025)
- [ ] Professional security audit
- [ ] Mainnet deployment
- [ ] Decentralized governance launch
- [ ] Mobile application (iOS/Android)
- [ ] Integration with major DeFi protocols
- [ ] Institutional custody solutions
- [ ] Regulatory compliance framework

### Research & Innovation
- [ ] Gas optimization for FHE operations
- [ ] Layer 2 integration for cost reduction
- [ ] Advanced cryptographic primitives
- [ ] Post-quantum security analysis
- [ ] zkSNARK integration for additional privacy layers
- [ ] Confidential smart contract composition patterns

### Community & Ecosystem
- [ ] Developer grants program
- [ ] Educational content and tutorials
- [ ] Integration guides for other projects
- [ ] Bug bounty program
- [ ] Community governance
- [ ] Ambassador program

---

## Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- 🐛 **Report Bugs**: Open an issue with detailed reproduction steps
- 💡 **Suggest Features**: Share your ideas for improvements
- 📝 **Improve Documentation**: Help make our docs clearer
- 🔧 **Submit PRs**: Contribute code improvements
- 🧪 **Write Tests**: Expand test coverage
- 🎨 **Improve UI/UX**: Enhance the frontend experience
- 🌐 **Translations**: Help internationalize the platform

### Development Process

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/StealthStaker.git
   cd StealthStaker
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Write clean, commented code
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   npm run test
   npm run lint
   ```

5. **Commit Your Changes**
   ```bash
   git commit -m "Add: your feature description"
   ```

   Follow conventional commits:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `test:` Test additions/changes
   - `refactor:` Code refactoring
   - `style:` Code style changes
   - `chore:` Build/tooling changes

6. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub

### Code Style

- **Solidity**: Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- **TypeScript/JavaScript**: Follow ESLint configuration
- **Formatting**: Use Prettier (runs automatically on commit)
- **Comments**: Write clear, concise comments for complex logic

### Testing Standards

- All new features must include tests
- Maintain >80% code coverage
- Test both success and failure cases
- Include gas consumption tests for contracts

---

## Resources

### Official Documentation

- **Zama fhEVM**: [https://docs.zama.ai/fhevm](https://docs.zama.ai/fhevm)
- **FHE Overview**: [https://docs.zama.ai/fhevm/fundamentals/fhe](https://docs.zama.ai/fhevm/fundamentals/fhe)
- **ERC-7984 Standard**: [https://eips.ethereum.org/EIPS/eip-7984](https://eips.ethereum.org/EIPS/eip-7984)
- **Hardhat Documentation**: [https://hardhat.org/docs](https://hardhat.org/docs)
- **OpenZeppelin Confidential**: [https://github.com/OpenZeppelin/openzeppelin-confidential-contracts](https://github.com/OpenZeppelin/openzeppelin-confidential-contracts)

### Tutorials & Guides

- **FHE Quick Start**: [https://docs.zama.ai/protocol/solidity-guides/getting-started/quick-start-tutorial](https://docs.zama.ai/protocol/solidity-guides/getting-started/quick-start-tutorial)
- **Writing FHE Contracts**: [https://docs.zama.ai/fhevm/guides/contracts](https://docs.zama.ai/fhevm/guides/contracts)
- **Testing FHE Contracts**: [https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat/write_test](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat/write_test)
- **fhevmjs Library**: [https://docs.zama.ai/fhevm/guides/frontend](https://docs.zama.ai/fhevm/guides/frontend)

### Additional Tools

- **Sepolia Faucet**: [https://sepoliafaucet.com/](https://sepoliafaucet.com/)
- **Sepolia Explorer**: [https://sepolia.etherscan.io/](https://sepolia.etherscan.io/)
- **Remix IDE**: [https://remix.ethereum.org/](https://remix.ethereum.org/)
- **MetaMask**: [https://metamask.io/](https://metamask.io/)

### Community

- **Zama Discord**: [https://discord.gg/zama](https://discord.gg/zama)
- **GitHub Issues**: [Report bugs and request features](https://github.com/yourusername/StealthStaker/issues)
- **Twitter/X**: Follow [@zama_fhe](https://twitter.com/zama_fhe) for updates

### Academic Papers

- **Fully Homomorphic Encryption**: [Original FHE Paper by Craig Gentry](https://crypto.stanford.edu/craig/)
- **TFHE**: [Fast Fully Homomorphic Encryption over the Torus](https://eprint.iacr.org/2018/421)

---

## License

This project is licensed under the **BSD-3-Clause-Clear License**.

### What This Means

✅ **You can**:
- Use the code commercially
- Modify the code
- Distribute the code
- Use it privately

❌ **You cannot**:
- Hold the authors liable
- Use contributors' names for endorsement
- Use patent claims

📜 **You must**:
- Include the original license and copyright notice
- State significant changes made to the code

See the [LICENSE](LICENSE) file for full details.

---

## Support

### Getting Help

- **Documentation**: Check this README and inline code comments
- **GitHub Issues**: [Report bugs or ask questions](https://github.com/yourusername/StealthStaker/issues)
- **Zama Community**: [Join the Discord](https://discord.gg/zama)
- **Email**: contact@yourdomain.com

### Reporting Security Issues

If you discover a security vulnerability, please **DO NOT** open a public issue.

Instead, email security@yourdomain.com with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will respond within 48 hours and work with you to address the issue.

---

## Acknowledgments

This project is built on the shoulders of giants:

- **Zama** - For pioneering FHE technology and the fhEVM
- **OpenZeppelin** - For secure, audited confidential contract libraries
- **Ethereum Foundation** - For the Ethereum ecosystem
- **Hardhat** - For excellent development tooling
- **The Web3 Community** - For pushing the boundaries of decentralized technology

Special thanks to all contributors who help make privacy-preserving DeFi a reality!

---

## Disclaimer

**⚠️ EXPERIMENTAL SOFTWARE - USE AT YOUR OWN RISK ⚠️**

StealthStaker is experimental software built with cutting-edge cryptographic technology. While we strive for security and correctness:

- This code has **NOT** been professionally audited
- It is intended for **TESTNET USE ONLY**
- Do **NOT** use with real funds or in production
- FHE technology is still maturing
- Gas costs are high and may change
- APIs may change without notice

**The authors and contributors are not responsible for any losses or damages that may occur from using this software.**

Always do your own research and understand the risks before using any DeFi platform.

---

## Star History

If you find this project interesting or useful, please consider giving it a star! ⭐

---

<div align="center">

**Built with ❤️ for a Privacy-First Web3 Future**

[GitHub](https://github.com/yourusername/StealthStaker) • [Website](https://stealthstaker.com) • [Twitter](https://twitter.com/stealthstaker)

</div>
