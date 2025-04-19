export default function TermsPage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-gradient-to-b from-[#0a0f1c] to-[#111d35] text-white">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-yellow-300">Terms of Service</h1>
        <p className="text-white/80">Last updated: April 10, 2025</p>

        <p>
          Welcome to FlowEDU. These Terms of Service (&quot;Terms&quot;) govern your access to and use of the FlowEDU
          platform. By using FlowEDU, you agree to be bound by these Terms.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-300">1. Use of the Service</h2>
        <p>
          FlowEDU provides a Web3 bridging service to transfer tokens into EDU Chain. You must use the service in
          compliance with all applicable laws and only for lawful purposes.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-300">2. Wallet Binding</h2>
        <p>
          To use FlowEDU, you must connect your wallet and authorize binding via signature. You are responsible for the
          security of your wallet and associated keys.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-300">3. No Custody</h2>
        <p>
          FlowEDU is a non-custodial service. We do not hold your assets. Your tokens are bridged via smart contracts
          and automated infrastructure.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-300">4. Risk Acknowledgment</h2>
        <p>
          By using FlowEDU, you acknowledge the risks inherent in blockchain-based systems. Transactions are
          irreversible. FlowEDU is not liable for any losses or disruptions.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-300">5. Modifications</h2>
        <p>
          We may modify these Terms at any time. Continued use of the service constitutes acceptance of the updated
          Terms.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-300">6. Termination</h2>
        <p>
          We reserve the right to suspend or terminate access to FlowEDU if we believe a user is violating these Terms
          or engaging in harmful behavior.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-300">7. Contact</h2>
        <p>
          For questions regarding these Terms, please contact us at{" "}
          <span className="text-yellow-300">support@flowedu.techypharm</span>.
        </p>
      </div>
    </main>
  );
}
