'use client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar />
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-16"
        >
           <h1 className="text-4xl font-bold text-white mb-6">Our Portfolio Performance</h1>
           <p className="text-brand-silver/60 max-w-2xl mx-auto">
             Track our institutional assets and market performance.
           </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* Mock Portfolio Items */}
           {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: item * 0.1 }}
              >
                 <Card className="hover:border-brand-gold/50 transition-colors">
                    <div className="h-40 bg-brand-navy-light rounded-lg mb-4 flex items-center justify-center">
                       <span className="text-brand-gold font-bold">Asset Class {item}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                       <h3 className="text-white font-bold">Crypto Growth Fund</h3>
                       <span className="text-green-400 font-bold">+12.5%</span>
                    </div>
                    <p className="text-sm text-brand-silver">High-yield DeFi strategy focusing on stablecoin liquidity provision.</p>
                 </Card>
              </motion.div>
           ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
