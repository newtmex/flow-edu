import { FAQ } from "./components/FAQ";
import FlowButton from "./components/FlowButton";
import { Metadata } from "next";

const title = "FlowEDU – Bridge EDU Tokens Seamlessly Across Chains";
const description =
  "FlowEDU is a trusted bridge for EDU tokens, enabling fast, secure, and low-fee transfers between BNB Chain, Arbitrum, and EDU Chain.";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "FlowEDU Team" }],
  keywords: [
    "Seamless token bridging",
    "Cross-chain EDU transfers",
    "Direct BNB Chain to EDU Chain bridge",
    "Direct EDU Chain to BNB Chain bridge",
    "Arbitrum, BNB Chain bridge",
    "Low-fee token bridging",
    "Secure Web3 bridge",
    "FlowEDU crypto bridge",
  ],
  robots: {
    index: true,
    follow: true,
  },
  other: {
    googlebot: "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
    category: "Web3",
  },
  alternates: {
    canonical: "https://flowedu.gainzswap.xyz",
  },
  openGraph: {
    title,
    description,
    url: "https://flowedu.gainzswap.xyz",
    siteName: "FlowEDU",
    locale: "en_US",
    images: [
      {
        url: "https://flowedu.gainzswap.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "FlowEDU – Bridge EDU Tokens Seamlessly Across Chains",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://flowedu.gainzswap.xyz/og-image.png"],
  },
};

export default async function Home() {
  return (
    <>
      <main
        id="hero"
        className="min-h-screen flex items-center justify-cencer bg-gradient-to-b from-[#0a0f1c] to-[#111d35] text-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Text */}
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                <span className="block text-white">Effortless Bridging</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                  for EDU Chain
                </span>
              </h1>

              <p className="text-xl text-white/80 leading-relaxed max-w-xl">
                <span>Seamlessly move tokens to and from EDU Chain with </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                  FlowEDU
                </span>
                Bind your wallet once, send tokens to bound wallet, and our automated system takes care of the rest—no
                manual bridging, no hassle.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <FlowButton />
              </div>
            </div>

            {/* Right: How FlowEDU Works */}
            <div id="how" className="relative bg-white p-6 rounded-3xl shadow-xl max-w-xl w-full text-black">
              <h2 className="text-2xl font-bold mb-4">How FlowEDU Works</h2>
              <ol className="space-y-4 list-decimal list-inside">
                <li>Connect your wallet</li>
                <li>FlowEDU generates a deterministic HD wallet just for you</li>
                <li>Bind your wallet with a signature</li>
                <li>Send tokens to your FlowEDU wallet address</li>
                <li>
                  FlowEDU automatically bridges your tokens to EDU Chain or BNB Smart Chain (BSC) from any wallet or
                  centralized exchange
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
      <FAQ />
    </>
  );
}
