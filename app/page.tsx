"use client"

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Page() {
  return (
    <div>
      <ConnectButton />
      <div className="text-lg font-bold underline">
        Hello world!
      </div>
      <button className="btn btn-primary text-white">Button</button>
    </div>
  );
};