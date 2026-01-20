'use client';
import { PlanCard } from '@/components/PlanCard';
import { motion } from 'framer-motion';

const PLANS = [
  { name: 'Starter Plan', roi: '5', duration: 'Daily for 5 Days', min: '$500' },
  { name: 'Standard Plan', roi: '8', duration: 'Daily for 7 Days', min: '$1,000' },
  { name: 'Premium Plan', roi: '12', duration: 'Daily for 10 Days', min: '$5,000' },
  { name: 'Institutional', roi: '20', duration: 'Daily for 14 Days', min: '$20,000' },
];

export default function InvestPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Start an Investment</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
}
