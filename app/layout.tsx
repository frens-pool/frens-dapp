import "../utils/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
// import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Providers } from "../components/providers";
import { ApolloWrapper } from "../components/apolloWrapper";

export const metadata: Metadata = {
  title: "FRENS",
  description: "Stake ETH with friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>FRENS Pool</title>
        <meta name="description" content="stake with friends" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤙</text></svg>"
        />
      </head>
      <body>
        <Providers>
          <ApolloWrapper>
            <div className="z-0 pattern-wavy pattern-blue-600 pattern-bg-white pattern-opacity-5 pattern-size-16 fixed top-0 left-0 right-0 bottom-0"></div>
            {children}
            <Footer />
          </ApolloWrapper>
        </Providers>
      </body>
    </html>
  );
}
