"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "All pools",
    href: "/",
    current: false,
  },
  { name: "My dashboard", href: "/dashboard", current: true },
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
    <div className="w-full font-inter pl-4 pr-[12px] lg:px-8 fixed top-0 z-[99] bg-gradient-to-r from-[#3b53ef] to-[#4fbee3] from-[47%] to-[100%]">
        <Disclosure
          as="nav"
          className="z-20 border-b-none border-none"
        >
          {({ open }) => (
            <>
              <div className="w-full pt-8 lg:pt-0">
                <div className="relative flex items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                  <div className="flex items-center">
                    <Link
                      href="/"
                    >
                      <div className="flex flex-row items-center mt-4">
                        <img
                          className="block h-16 lg:h-24 -mb-5 lg:-mb-8"
                          src="/FRENS_logo_with_tail.png"
                          alt="Staking with Frens"
                        />
                        <img
                          className="block h-10 lg:h-12 pl-4"
                          src="/FRENS_writing_white.png"
                          alt="Staking with Frens"
                        />
                      </div>
                    </Link>
                    <div className="hidden pt-6 pb-4 lg:ml-4 lg:block">
                      <div className="flex">
                        {navigation.map((item) =>
                          item.name === "Docs" ? (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.href === pathname
                                  ? "bg-frens-blue text-white"
                                  : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                                "rounded-md py-2 px-4 font-bold"
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
                                "rounded-md py-2 px-4 font-bold"
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
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-transparent text-white">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-8 w-8"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-8 w-8"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="hidden lg:ml-4 lg:block">
                    <div className="flex items-center">
                      {/* <ConnectButton /> */}
                      <Link
                        href={'/create'}
                          aria-current="page"
                        >
                      <button className="bg-transparent border-2 border-white text-white font-bold text-[14px] py-[8px] px-6 rounded-[22px] mr-2" type="button">
                      + new pool
                      </button>
                      </Link>

                      <ConnectButton.Custom>
                        {({
                          account,
                          chain,
                          openAccountModal,
                          openChainModal,
                          openConnectModal,
                          authenticationStatus,
                          mounted,
                        }) => {
                          // Note: If your app doesn't use authentication, you
                          // can remove all 'authenticationStatus' checks
                          const ready = mounted && authenticationStatus !== 'loading';
                          const connected =
                            ready &&
                            account &&
                            chain &&
                            (!authenticationStatus ||
                              authenticationStatus === 'authenticated');

                          return (
                            <div
                              {...(!ready && {
                                'aria-hidden': true,
                                'style': {
                                  opacity: 0,
                                  pointerEvents: 'none',
                                  userSelect: 'none',
                                },
                              })}
                            >
                              {(() => {
                                if (!connected) {
                                  return (
                                    <button className="bg-black border-2 border-black text-white font-semibold text-[14px] py-[8px] px-8 rounded-[22px]" onClick={openConnectModal} type="button">
                                      Connect wallet
                                    </button>
                                  );
                                }

                                if (chain.unsupported) {
                                  return (
                                    <button className="bg-black border-2 border-black text-white font-semibold text-[14px] py-[8px] px-8 rounded-[22px]" onClick={openChainModal} type="button">
                                      Wrong network
                                    </button>
                                  );
                                }

                                return (
                                    <button className="flex flex-row border-black border-2 bg-black text-white font-semibold text-[14px] py-[8px] pl-3 pr-4 rounded-[22px]" type="button">
                                    <div
                                      onClick={openChainModal}
                                      style={{ display: 'flex', alignItems: 'center' }}
                                      className="bg-[rgba(255,255,255,0.25)] text-white font-normal text-[14px] px-2 rounded-[10px] mr-2"
                                    >
                                      {chain.name}
                                    </div>
                                    <div onClick={openAccountModal}>
                                      {account.displayName}
                                      <span className="font-normal ml-1 text-[rgba(255,255,255,0.75)]">
                                      {account.displayBalance
                                      ? `  ${account.displayBalance}`
                                      : ''}
                                      </span>
                                      </div>
                                    </button>
                                );
                              })()}
                            </div>
                          );
                        }}
                      </ConnectButton.Custom>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="relative lg:hidden">
                <div className="space-y-1  pb-12 pt-8 px-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.href === pathname
                          ? "bg-indigo-700 text-white"
                          : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                        "block rounded-md py-2 px-3 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name} 
                    </Disclosure.Button>
                  ))}
                  <Disclosure.Button
                      as="a"
                      href={'/create'}
                      className={classNames(
                        pathname === '/create'
                          ? "bg-indigo-700 text-white"
                          : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                        "block rounded-md py-2 px-3 text-base font-medium"
                      )}
                    >
                      + New pool
                    </Disclosure.Button>
                  <ConnectButton.Custom>
                        {({
                          account,
                          chain,
                          openAccountModal,
                          openChainModal,
                          openConnectModal,
                          authenticationStatus,
                          mounted,
                        }) => {
                          // Note: If your app doesn't use authentication, you
                          // can remove all 'authenticationStatus' checks
                          const ready = mounted && authenticationStatus !== 'loading';
                          const connected =
                            ready &&
                            account &&
                            chain &&
                            (!authenticationStatus ||
                              authenticationStatus === 'authenticated');

                          return (
                            <div
                              {...(!ready && {
                                'aria-hidden': true,
                                'style': {
                                  opacity: 0,
                                  pointerEvents: 'none',
                                  userSelect: 'none',
                                },
                              })}
                            >
                              {(() => {
                                if (!connected) {
                                  return (
                                    <button className="w-full mt-4 bg-black border-2 border-black text-white font-semibold text-[14px] py-[8px] px-8 rounded-[22px]" onClick={openConnectModal} type="button">
                                      Connect wallet
                                    </button>
                                  );
                                }

                                if (chain.unsupported) {
                                  return (
                                    <button className="w-full mt-4 bg-black border-2 border-black text-white font-semibold text-[14px] py-[8px] px-8 rounded-[22px]" onClick={openChainModal} type="button">
                                      Wrong network
                                    </button>
                                  );
                                }

                                return (
                                    <button className="w-full mt-4 flex flex-row border-black border-2 bg-black text-white font-semibold text-[14px] py-[8px] pl-3 pr-4 rounded-[22px]" type="button">
                                    <div
                                      onClick={openChainModal}
                                      style={{ display: 'flex', alignItems: 'center' }}
                                      className="bg-[rgba(255,255,255,0.25)] text-white font-normal text-[14px] px-2 rounded-[10px] mr-2"
                                    >
                                      {chain.name}
                                    </div>
                                    <div onClick={openAccountModal}>
                                      {account.displayName}
                                      </div>
                                    </button>
                                );
                              })()}
                            </div>
                          );
                        }}
                      </ConnectButton.Custom>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
    </div>
  );
};

export default Header;
