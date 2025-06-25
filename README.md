# FRENS.FUN frontend

## Getting Started

### Create an environment for the dapp

```bash
cp .env.local.example .env.local
```

### Fill out the variables

```
NEXT_PUBLIC_INFURA_KEY - Infura key
NEXT_PUBLIC_WC_PROJECT_ID - Walletconnect project ID
```

Depending on your environment fill out these variables too

```
NEXT_PUBLIC_RPC_MAINNET - a HTTP RPC endpoint for interacting with mainnet
NEXT_PUBLIC_RPC_MAINNET_WSS - a websocket RPC endpoint for interacting with mainnet
NEXT_PUBLIC_RPC_HOLESKY - a HTTP RPC endpoint for interacting with Holesky testnet
NEXT_PUBLIC_RPC_HOLESKY_WSS - a websocket RPC endpoint for interacting with Holesky testnet
```

Deployed smart contract addresses for Holesky and mainnet are in `utils/constants/mainnetAddresses.ts` etc.

### Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

