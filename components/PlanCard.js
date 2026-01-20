'use client';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function PlanCard({ plan }) {
  return (
    <Card className="flex flex-col h-full border-brand-gold/10 hover:border-brand-gold/50 transition-colors">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-brand-gold mb-2">{plan.name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">{plan.roi}%</span>
          <span className="text-brand-silver">ROI</span>
        </div>
        <p className="text-sm text-brand-silver/60 mt-1">{plan.duration}</p>
      </div>

      <div className="space-y-4 mb-8 flex-grow">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-brand-gold/10 flex items-center justify-center">
            <Check size={14} className="text-brand-gold" />
          </div>
          <span className="text-brand-silver">Min: {plan.min}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-brand-gold/10 flex items-center justify-center">
            <Check size={14} className="text-brand-gold" />
          </div>
          <span className="text-brand-silver">Instant Withdrawal</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-brand-gold/10 flex items-center justify-center">
            <Check size={14} className="text-brand-gold" />
          </div>
          <span className="text-brand-silver">24/7 Support</span>
        </div>
      </div>

      <Link href="/register" className="block w-full">
        <Button variant="outline" className="w-full hover:bg-brand-gold hover:text-black">
          Invest Now
        </Button>
      </Link>
    </Card>
  );
}
