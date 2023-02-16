import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => (
  <div className="navbar">
    <div className="navbar-start">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost btn-circle text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a
              href="https://frens.fun"
              target="_blank"
              rel="noopener noreferrer"
            >
              Home
            </a>
          </li>
          <li>
            <Link href="/">Pool</Link>
          </li>
          <li>
            <Link href="/pool/0xAbCf45F92f911aec91Dfe6785674D4659F8B1379">
              Pool Example
            </Link>
          </li>
          <li>
            <Link href="/run/0xAbCf45F92f911aec91Dfe6785674D4659F8B1379">
              Run Example
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="hidden sm:block z-20 navbar-center">
      <Link href="/" className="btn btn-ghost normal-case text-3xl text-white">
        <Image src="/FRENS.png" alt="FRENS pool" width="130" height="32" />
      </Link>
    </div>
    <div className="navbar-end">
      <ConnectButton />
    </div>
  </div>
);

export default Navbar;
