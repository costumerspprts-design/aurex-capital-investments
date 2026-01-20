'use client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function SendPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Send Funds</h1>
      <Card>
         <p className="text-brand-silver mb-6">Send funds to another Aurex Capital user.</p>
         <div className="space-y-4">
            <input
               type="text"
               placeholder="Recipient Username or Email"
               className="w-full bg-brand-black border border-brand-silver/20 rounded p-4 text-white"
            />
            <input
               type="number"
               placeholder="Amount"
               className="w-full bg-brand-black border border-brand-silver/20 rounded p-4 text-white"
            />
            <Button className="w-full">Send Now</Button>
         </div>
      </Card>
    </div>
  );
}
