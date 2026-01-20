'use client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PlanCard } from '@/components/PlanCard';
import { motion } from 'framer-motion';

const PLANS = [
  { name: 'Starter Plan', roi: '5', duration: 'Daily for 5 Days', min: '$500' },
  { name: 'Standard Plan', roi: '8', duration: 'Daily for 7 Days', min: '$1,000' },
  { name: 'Premium Plan', roi: '12', duration: 'Daily for 10 Days', min: '$5,000' },
  { name: 'Institutional', roi: '20', duration: 'Daily for 14 Days', min: '$20,000' },
  { name: 'VIP Exclusive', roi: '25', duration: 'Daily for 20 Days', min: '$50,000' },
  { name: 'Long Term', roi: '150', duration: 'After 30 Days', min: '$10,000' },
];

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar />
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Investment Plans</h1>
          <p className="text-brand-silver/60 max-w-2xl mx-auto">
            Flexible investment options designed to meet diverse financial needs and goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PLANS.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PlanCard plan={plan} />
              </motion.div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
