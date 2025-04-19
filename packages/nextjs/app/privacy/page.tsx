export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-gradient-to-b from-[#0a0f1c] to-[#111d35] text-white">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-yellow-300">Privacy Policy</h1>
        <p className="text-white/80">Last updated: April 10, 2025</p>

        <p>
          FlowEDU is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and
          safeguard your information when you use our platform.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-300">1. Information We Collect</h2>
        <p>We do not collect any personal information unless explicitly provided. We may collect:</p>
        <ul className="list-disc list-inside pl-4 text-white/80">
          <li>Your connected wallet address</li>
          <li>Signed messages for wallet binding</li>
          <li>Bridging activity (on-chain events)</li>
        </ul>

        <h2 className="text-2xl font-semibold text-yellow-300">2. How We Use Information</h2>
        <p>The information we collect is used to:</p>
        <ul className="list-disc list-inside pl-4 text-white/80">
          <li>Enable wallet binding and token bridging</li>
          <li>Ensure the security and integrity of the bridge</li>
          <li>Improve the user experience</li>
        </ul>

        <h2 className="text-2xl font-semibold text-yellow-300">3. Data Sharing</h2>
        <p>We do not sell or share your information with third parties. On-chain data may be publicly viewable.</p>

        <h2 className="text-2xl font-semibold text-yellow-300">4. Security</h2>
        <p>
          FlowEDU uses secure cryptographic methods and standard web3 practices to protect your information and ensure
          non-custodial bridging.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-300">5. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify users of any material changes.</p>

        <h2 className="text-2xl font-semibold text-yellow-300">6. Contact</h2>
        <p>
          If you have any questions about this policy, contact us at{" "}
          <span className="text-yellow-300">support@flowedu.techypharm</span>.
        </p>
      </div>
    </main>
  );
}
