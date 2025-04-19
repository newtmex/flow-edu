import React from "react";
import Link from "next/link";
import { hardhat } from "viem/chains";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

/**
 * Site footer
 */
export const Footer = () => {
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <footer className="bg-gray-900 border-t border-gray-700 fixed bottom-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <span className="text-gray-300 text-sm">© {new Date().getFullYear()} FlowEDU. All rights reserved.</span>

          <div className="flex space-x-4">
            <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Terms of Service
            </Link>
            <Link href="/support" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Feedback & Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
