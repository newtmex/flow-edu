"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is FlowEDU?",
    answer:
      "FlowEDU is a seamless token bridge for the EDU ecosystem. It automates the token bridging process, so you only need to interact with our UI once.",
  },
  {
    question: "How do I start bridging?",
    answer:
      "Simply connect your wallet and bind it. Once bound, FlowEDU generates a wallet address for you — just send your tokens there and we’ll handle the rest.",
  },
  {
    question: "Is there a fee for bridging?",
    answer: "Yes. We charge a small 0.3% fee on each bridged transaction to keep things running smoothly.",
  },
  {
    question: "Which chains are supported?",
    answer: "Currently, we support bridging from BNB Chain to EDU Chain. More chains will be added soon.",
  },
  {
    question: "Do I control the destination wallet?",
    answer:
      "Yes. The destination is deterministically derived from your bound wallet, and only you can control it through your original wallet signature.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-gradient-to-b from-[#0a0f1c] to-[#111d35] text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-10">
          <span className="text-yellow-300">Frequently Asked Questions</span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto grid gap-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-white/10 rounded-xl bg-white/5 p-5 transition-all duration-200 hover:bg-white/10"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left text-lg font-semibold text-white-300"
            >
              <span>{faq.question}</span>
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && <p className="mt-3 text-white/80 text-base leading-relaxed">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
