import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import {
  configureChains,
  createConfig,
  WagmiConfig,
} from "wagmi";
import { goerli, mainnet} from "@wagmi/chains"
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";

const { chains, publicClient } = configureChains(
  [goerli],
  [
    infuraProvider({
      apiKey: process.env.NEXT_PUBLIC_INFURA_KEY!,
      // priority: 0,
    }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Avado Stader',
  projectId: "b5371f3f7bd2de6a26493f22901da531",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})







// const { chains, provider, webSocketProvider } = configureChains(
//   [goerli],
//   // [goerli, mainnet],
//   [
//     // alchemyProvider({
//     //   // This is Alchemy's default API key.
//     //   // You can get your own at https://dashboard.alchemyapi.io
//     //   apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY!,
//     //   priority: 0,
//     // }),
//     infuraProvider({
//       apiKey: process.env.NEXT_PUBLIC_INFURA_KEY!,
//       priority: 0,
//     }),
//     publicProvider({ priority: 1 }),
//   ]
// );

// const { connectors } = getDefaultWallets({
//   appName: "FRENS",
//   chains,
// });

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider,
//   webSocketProvider,
// });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: "#4554EA",
        })}
      >
        <div className="pattern-wavy pattern-blue-600 pattern-bg-white pattern-opacity-5 pattern-size-16 fixed top-0 left-0 right-0 bottom-0"></div>
        <Component {...pageProps} />
        <Analytics />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
