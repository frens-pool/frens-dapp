import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import Header from "../components/shared/Header";
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />      
      </head>
      <body className="min-h-[100vh]" data-theme="light">
        <Providers>
          <ApolloWrapper>
            <Header />
            <div className="font-inter pt-[81px]">
            {children}
            </div>
            <Footer />
          </ApolloWrapper>
        </Providers>
      </body>
    </html>
  );
}
