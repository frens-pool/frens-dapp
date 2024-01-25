"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "All Pools",
    href: "/",
    current: false,
  },
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "New Pool", href: "/create", current: false },
  {
    name: "Docs",
    href: "https://docs.frens.fun/docs/manifesto",
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="min-h-full">
      <div className="bg-frens-main pb-32">
        <Disclosure
          as="nav"
          className="z-20 border-b border-indigo-300 border-opacity-25 bg-frens-main lg:border-none"
        >
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                  <div className="flex items-center px-0">
                    <Link
                      href="/"
                      className="text-white hover:bg-indigo-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium"
                    >
                      <div className="flex flex-shrink-0">
                        <img
                          className="block h-8 w-6"
                          src="/FRENS_logo_white.png"
                          alt="Staking with Frens"
                        />
                        <img
                          className="block h-8 pl-2"
                          src="/FRENS_writing_white.png"
                          alt="Staking with Frens"
                        />
                      </div>
                    </Link>
                    <div className="hidden lg:ml-10 lg:block">
                      <div className="flex space-x-4">
                        {navigation.map((item) =>
                          item.name === "Docs" ? (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.href === pathname
                                  ? "bg-frens-blue text-white"
                                  : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                                "rounded-md py-2 px-3 text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.name}
                            </a>
                          ) : (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.href === pathname
                                  ? "bg-frens-blue text-white"
                                  : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                                "rounded-md py-2 px-3 text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex lg:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-frens-main p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-frens-main">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="hidden lg:ml-4 lg:block">
                    <div className="flex items-center">
                      <ConnectButton />
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="relative lg:hidden">
                <div className="space-y-1  pb-3 pt-2 px-2 md:px-6">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-indigo-700 text-white"
                          : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                        "block rounded-md py-2 px-3 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {pathname === "/" ? "Join a staking pool" : ""}
              {pathname === "/create" ? "Create your staking pool" : ""}
              {pathname === "/dashboard" ? "Dashboard" : ""}
              {pathname?.split("/")[1] === "pool"
                ? "Pool ETH with your friends"
                : ""}
              {pathname?.split("/")[1] === "run" ? "Run your validator" : ""}
            </h1>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
