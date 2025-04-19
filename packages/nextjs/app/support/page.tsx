import Link from "next/link";

export default function SupportPage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-gradient-to-b from-[#0a0f1c] to-[#111d35] text-white">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-yellow-300 text-center">Support</h1>

        <p className="text-white/80 text-lg text-center">
          Need help? We’ve got you covered. Below you’ll find ways to reach us and resources to get started with
          FlowEDU.
        </p>

        <div className="bg-white/5 rounded-xl p-6 space-y-6 border border-white/10">
          <h2 className="text-2xl font-semibold text-yellow-300">Get in Touch</h2>
          <p className="text-white/80">
            For questions, bug reports, or general feedback, please email us at:
            <br />
            <span className="text-yellow-300 font-medium">support@flowedu.xyz</span>
          </p>
        </div>

        <div className="bg-white/5 rounded-xl p-6 space-y-6 border border-white/10">
          <h2 className="text-2xl font-semibold text-yellow-300">Help Center</h2>
          <p className="text-white/80">
            Check out our{" "}
            <Link href="#faq" className="underline text-yellow-300 hover:text-yellow-400">
              FAQ section
            </Link>{" "}
            for answers to common questions like wallet binding, how bridging works, and more.
          </p>
        </div>

        <div className="bg-white/5 rounded-xl p-6 space-y-6 border border-white/10">
          <h2 className="text-2xl font-semibold text-yellow-300">Join the Community</h2>
          <p className="text-white/80">
            Join our Telegram or follow us on Twitter to stay in the loop and ask quick questions:
          </p>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-400">
                Telegram Community
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-400">
                @flowedu on Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
