<p align="center">
  Powered by <a href="https://vercel.com/?utm_source=[frens]&utm_campaign=oss">Vercel</a>
  <img src="public/vercel-icon-dark.svg" width="20" title="hover text">
</p>

This is a [RainbowKit](https://rainbowkit.com) + [wagmi](https://wagmi.sh) + [Next.js](https://nextjs.org/) project bootstrapped with [`create-rainbowkit`](https://github.com/rainbow-me/rainbowkit/tree/main/packages/create-rainbowkit).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## API keys

### Etherscan
To get the Validator's public keys, the Etherscan API is used.
Create an API as documented on <https://docs.etherscan.io/getting-started/viewing-api-usage-statistics>, and add the key as `NEXT_PUBLIC_ETHERSCAN_KEY=<Your key>` in `.env.local`.

### Infura
To use the public RPC to read data from the blockchain, you'll need an Infura key.
Add this key as `NEXT_PUBLIC_INFURA_KEY=<Your key>` in `.env.local`.


## Learn More

To learn more about this stack, take a look at the following resources:

- [RainbowKit Documentation](https://rainbowkit.com) - Learn how to customize your wallet connection flow.
- [wagmi Documentation](https://wagmi.sh) - Learn how to interact with Ethereum.
- [Next.js Documentation](https://nextjs.org/docs) - Learn how to build a Next.js application.

You can check out [the RainbowKit GitHub repository](https://github.com/rainbow-me/rainbowkit) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
