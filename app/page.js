'use client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { PlanCard } from '@/components/PlanCard';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldAlert, Globe, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const PLANS = [
  { name: 'Starter Plan', roi: '5', duration: 'Daily for 5 Days', min: '$500' },
  { name: 'Standard Plan', roi: '8', duration: 'Daily for 7 Days', min: '$1,000' },
  { name: 'Premium Plan', roi: '12', duration: 'Daily for 10 Days', min: '$5,000' },
  { name: 'Institutional', roi: '20', duration: 'Daily for 14 Days', min: '$20,000' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-black selection:bg-brand-gold selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-navy-light/20 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-brand-silver to-brand-silver-light"
          >
            Grow Your Wealth with <br />
            <span className="text-brand-gold">Aurex Capital</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-brand-silver/80 mb-10 max-w-2xl mx-auto"
          >
            Smart investing, secure growth, global opportunities. Join thousands of investors trusting our institutional-grade platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/register">
              <Button variant="primary" className="w-full sm:w-auto text-lg px-8">
                Get Started <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/plans">
              <Button variant="outline" className="w-full sm:w-auto text-lg px-8">
                Invest Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats/Features Banner */}
      <section className="py-12 border-y border-white/5 bg-brand-navy-main/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-4">
                 <Globe className="w-10 h-10 text-brand-gold mx-auto mb-4" />
                 <h3 className="text-white font-bold text-lg">Global Coverage</h3>
                 <p className="text-brand-silver/60">Investors from 100+ countries</p>
              </div>
              <div className="p-4">
                 <ShieldAlert className="w-10 h-10 text-brand-gold mx-auto mb-4" />
                 <h3 className="text-white font-bold text-lg">Bank-Grade Security</h3>
                 <p className="text-brand-silver/60">Encrypted data & secure wallets</p>
              </div>
              <div className="p-4">
                 <TrendingUp className="w-10 h-10 text-brand-gold mx-auto mb-4" />
                 <h3 className="text-white font-bold text-lg">High Returns</h3>
                 <p className="text-brand-silver/60">Consistent market-beating ROI</p>
              </div>
           </div>
        </div>
      </section>

      {/* Investment Plans Section */}
      <section className="py-24 relative" id="plans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Investment Plans</h2>
            <p className="text-brand-silver/60 max-w-2xl mx-auto">
              Choose a plan that suits your financial goals. All plans include 24/7 support and instant withdrawals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PLANS.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PlanCard plan={plan} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Warning Banner */}
      <section className="py-8 bg-red-900/20 border-y border-red-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start sm:items-center gap-4 text-red-200">
          <ShieldAlert className="flex-shrink-0 text-red-500" />
          <p className="text-sm sm:text-base font-medium">
            <span className="font-bold text-red-400">SECURITY WARNING:</span> Send funds to the correct address. Sending to the wrong address may cause permanent loss. Confirm before sending.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
