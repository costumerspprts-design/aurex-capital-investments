'use client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar />
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8 border-b border-brand-gold/30 pb-4">Aurex Capital Whitepaper</h1>

          <div className="space-y-12 text-brand-silver-light">
            <section>
              <h2 className="text-2xl font-bold text-brand-gold mb-4">1. Company Overview</h2>
              <p className="leading-relaxed">
                Aurex Capital Investments is a premier institutional investment broker established in 1993.
                We specialize in high-frequency trading, cryptocurrency arbitrage, and decentralized finance (DeFi) yield farming.
                Our mission is to democratize access to institutional-grade investment strategies for individuals worldwide.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-gold mb-4">2. Investment Strategy</h2>
              <p className="leading-relaxed mb-4">
                Our proprietary AI-driven trading algorithms analyze market trends in real-time to identify profitable opportunities across forex, commodities, and crypto markets.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-brand-silver">
                <li>Algorithmic High-Frequency Trading (HFT)</li>
                <li>Cross-exchange Arbitrage</li>
                <li>Risk-Managed Portfolio Diversification</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-gold mb-4">3. Security & Transparency</h2>
              <p className="leading-relaxed">
                Security is paramount at Aurex Capital. We employ military-grade encryption, cold storage for 98% of digital assets, and multi-signature wallets.
                Our platform undergoes regular third-party audits to ensure transparency and solvency.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-gold mb-4">4. Roadmap</h2>
              <div className="border-l-2 border-brand-gold pl-6 space-y-8">
                <div>
                   <h3 className="text-lg font-bold text-white">Q1 2024</h3>
                   <p className="text-sm">Launch of Aurex 2.0 Platform with enhanced UI/UX.</p>
                </div>
                <div>
                   <h3 className="text-lg font-bold text-white">Q2 2024</h3>
                   <p className="text-sm">Integration of new DeFi protocols and yield pools.</p>
                </div>
                <div>
                   <h3 className="text-lg font-bold text-white">Q3 2024</h3>
                   <p className="text-sm">Release of mobile application for iOS and Android.</p>
                </div>
                <div>
                   <h3 className="text-lg font-bold text-white">Q4 2024</h3>
                   <p className="text-sm">Global expansion to Asian and African markets.</p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
