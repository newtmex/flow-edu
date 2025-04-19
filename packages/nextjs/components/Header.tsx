"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hardhat } from "viem/chains";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick, useTargetNetwork } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <header className="sticky top-0 z-50 bg-white text-black shadow-md">
      <div className="navbar px-4 flex justify-between items-center min-h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo3.png" alt="FlowEDU Logo" width={113} height={46} />
          {/* <span className="font-semibold text-lg">FlowEDU</span> */}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="#hero" className="hover:underline">
            Bridge
          </Link>
          <Link href="#faq" className="hover:underline">
            FAQ
          </Link>
          {/* <RainbowKitCustomConnectButton /> */}
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label tabIndex={0} className="btn btn-ghost" onClick={() => setIsDrawerOpen(prev => !prev)}>
            <Bars3Icon className="w-6 h-6" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white text-black rounded-box w-18"
              onClick={() => setIsDrawerOpen(false)}
            >
              <li>
                <Link href="#hero">Bridge</Link>
              </li>
              <li>
                <Link href="#faq">FAQ</Link>
              </li>
              <li>{/* <RainbowKitCustomConnectButton /> */}</li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};
