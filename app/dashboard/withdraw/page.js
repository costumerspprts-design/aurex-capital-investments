'use client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function WithdrawPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Withdraw Funds</h1>
      <Card>
        <div className="text-center py-12">
          <p className="text-brand-silver mb-4">Withdrawals are processed within 24 hours.</p>
          <div className="mb-6">
            <input
               type="text"
               placeholder="Enter Amount"
               className="w-full bg-brand-black border border-brand-silver/20 rounded p-4 text-white mb-4"
            />
            <input
               type="text"
               placeholder="Wallet Address"
               className="w-full bg-brand-black border border-brand-silver/20 rounded p-4 text-white"
            />
          </div>
          <Button className="w-full">Request Withdrawal</Button>
        </div>
      </Card>
    </div>
  );
}
