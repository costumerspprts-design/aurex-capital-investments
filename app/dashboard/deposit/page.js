'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Copy, Check, Upload, AlertTriangle, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CRYPTO_ADDRESSES = {
  Bitcoin: {
    'Native SegWit': 'bc1qs46fe2ea2x4gndy267et6jjnpmqwd0ag8u7mye',
    'Legacy': '1DCHthYyLnVnJJ39MfwtQBoJDmVn95YcS',
    'SegWit': '3DPx4cKqwTX7Pg4CyEpR37ySj5ej4rTzyW',
    'Taproot': 'bc1p6pv3yfglxrmxtlxt77mcvj0yazld5x9w29ky9n2tqkrrevjp062qye2392'
  },
  Ethereum: '0xB6428a73ad888ba7a44ADCCf220227F12eB9e467',
  BNB: '0xB6428a73ad888ba7a44ADCCf220227F12eB9e467'
};

export default function DepositPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [btcType, setBtcType] = useState('Native SegWit');
  const [giftCardNumber, setGiftCardNumber] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const txData = {
        type: 'deposit',
        amount: parseFloat(amount),
        method,
        details: method === 'Bitcoin' ? btcType :
                 method === 'Gift Card' ? giftCardNumber :
                 method === 'Debit Card' ? 'Stripe Payment' :
                 'Standard Address',
      };

      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(txData),
      });

      if (!res.ok) throw new Error('Failed to create deposit');

      router.push('/dashboard');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Deposit Funds</h1>

      {/* Step 1: Amount */}
      {step === 1 && (
        <Card>
          <h2 className="text-xl font-bold text-white mb-6">Enter Amount</h2>
          <div className="mb-8">
            <div className="relative">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-silver text-xl">$</span>
               <input
                  type="number"
                  className="w-full bg-brand-black/50 border border-brand-silver/20 rounded-xl p-4 pl-10 text-2xl text-white focus:border-brand-gold outline-none"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
               />
            </div>
          </div>
          <Button
            className="w-full"
            onClick={() => { if(amount) setStep(2); }}
            disabled={!amount}
          >
            Continue
          </Button>
        </Card>
      )}

      {/* Step 2: Method */}
      {step === 2 && (
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-bold text-white mb-6">Select Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {['Bitcoin', 'Ethereum', 'BNB', 'Gift Card', 'Debit Card'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`p-4 rounded-xl border transition-all text-left ${
                      method === m
                      ? 'bg-brand-gold/10 border-brand-gold text-brand-gold'
                      : 'bg-brand-navy-light/50 border-brand-silver/10 text-brand-silver hover:bg-brand-navy-light'
                    }`}
                  >
                    <span className="font-bold">{m}</span>
                  </button>
               ))}
            </div>
          </Card>

          {/* Crypto Display */}
          {method && method !== 'Gift Card' && method !== 'Debit Card' && (
             <Card className="border-brand-gold/50">
                <div className="flex items-start gap-3 mb-6 p-3 bg-red-900/20 rounded-lg text-red-200 text-sm">
                   <AlertTriangle className="flex-shrink-0 text-red-500" />
                   <p>Send funds to the correct address. Sending to the wrong address may cause permanent loss. Confirm before sending.</p>
                </div>

                <div className="space-y-4">
                   <p className="text-brand-silver">Send <strong className="text-white">${amount}</strong> worth of <strong>{method}</strong> to:</p>

                   {method === 'Bitcoin' ? (
                      <div className="mb-4">
                         <label className="block text-sm text-brand-silver mb-2">Address Type</label>
                         <select
                            className="w-full bg-brand-black border border-brand-silver/20 rounded-lg p-3 text-white mb-4"
                            value={btcType}
                            onChange={(e) => setBtcType(e.target.value)}
                         >
                            {Object.keys(CRYPTO_ADDRESSES.Bitcoin).map(k => <option key={k} value={k}>{k}</option>)}
                         </select>
                         <AddressDisplay address={CRYPTO_ADDRESSES.Bitcoin[btcType]} onCopy={handleCopy} isCopied={isCopied} />
                      </div>
                   ) : (
                      <AddressDisplay address={CRYPTO_ADDRESSES[method]} onCopy={handleCopy} isCopied={isCopied} />
                   )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                   <Button className="w-full" onClick={handleSubmit} disabled={loading}>
                      {loading ? 'Processing...' : 'I Have Sent Payment'}
                   </Button>
                </div>
             </Card>
          )}

          {/* Gift Card Form */}
          {method === 'Gift Card' && (
             <Card>
                <div className="space-y-4">
                   <div>
                      <label className="block text-sm text-brand-silver mb-2">Gift Card Number</label>
                      <input
                         type="text"
                         className="w-full bg-brand-black/50 border border-brand-silver/20 rounded-lg p-3 text-white focus:border-brand-gold outline-none"
                         value={giftCardNumber}
                         onChange={(e) => setGiftCardNumber(e.target.value)}
                         placeholder="XXXX-XXXX-XXXX-XXXX"
                      />
                   </div>

                   <div className="border-2 border-dashed border-brand-silver/20 rounded-xl p-8 text-center hover:border-brand-gold/50 transition-colors cursor-pointer">
                      <Upload className="mx-auto text-brand-silver mb-2" />
                      <p className="text-sm text-brand-silver">Upload Payment Screenshot</p>
                   </div>

                   <Button className="w-full mt-4" onClick={handleSubmit} disabled={loading || !giftCardNumber}>
                      {loading ? 'Processing...' : 'Submit for Review'}
                   </Button>
                </div>
             </Card>
          )}

          {/* Debit Card (Mock) */}
          {method === 'Debit Card' && (
            <Card>
              <h3 className="text-lg font-bold text-white mb-4">Pay with Debit Card</h3>
              <p className="text-brand-silver mb-4">Secure payment processing.</p>
              <div className="space-y-4">
                 <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full bg-brand-black/50 border border-brand-silver/20 rounded-lg p-3 text-white"
                 />
                 <div className="flex gap-4">
                    <input
                       type="text"
                       placeholder="MM/YY"
                       className="w-1/2 bg-brand-black/50 border border-brand-silver/20 rounded-lg p-3 text-white"
                    />
                    <input
                       type="text"
                       placeholder="CVC"
                       className="w-1/2 bg-brand-black/50 border border-brand-silver/20 rounded-lg p-3 text-white"
                    />
                 </div>
                 <Button className="w-full mt-4" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Processing...' : 'Pay Now'}
                 </Button>
              </div>
            </Card>
          )}

          <div className="flex justify-between">
             <button onClick={() => setStep(1)} className="text-brand-silver hover:text-white">Back</button>
          </div>
        </div>
      )}
    </div>
  );
}

function AddressDisplay({ address, onCopy, isCopied }) {
   return (
      <div className="bg-black p-4 rounded-lg break-all font-mono text-sm border border-brand-silver/20 flex items-center justify-between gap-4">
         <span>{address}</span>
         <button
            onClick={() => onCopy(address)}
            className="p-2 hover:bg-brand-silver/10 rounded transition-colors text-brand-gold"
         >
            {isCopied ? <Check size={18} /> : <Copy size={18} />}
         </button>
      </div>
   );
}
