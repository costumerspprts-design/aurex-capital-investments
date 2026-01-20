'use client';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     fetch('/api/transactions')
       .then(res => res.json())
       .then(data => {
          setTransactions(data.reverse());
          setLoading(false);
       });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Transaction History</h1>
      <Card>
         <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead>
                   <tr className="border-b border-white/5 text-brand-silver text-sm">
                      <th className="py-3 font-normal">Type</th>
                      <th className="py-3 font-normal">Amount</th>
                      <th className="py-3 font-normal">Date</th>
                      <th className="py-3 font-normal">Details</th>
                      <th className="py-3 font-normal">Status</th>
                   </tr>
                </thead>
                <tbody className="text-white">
                   {transactions.length > 0 ? transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                         <td className="py-4 capitalize">
                            <div className="flex items-center gap-2">
                               {tx.type === 'deposit' ? <ArrowDownLeft size={16} className="text-green-500" /> : <ArrowUpRight size={16} className="text-red-500" />}
                               {tx.type}
                            </div>
                         </td>
                         <td className="py-4 font-mono">${tx.amount}</td>
                         <td className="py-4 text-sm text-brand-silver">{new Date(tx.date).toLocaleDateString()}</td>
                         <td className="py-4 text-sm text-brand-silver">{tx.method || '-'}</td>
                         <td className="py-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                               tx.status === 'Approved' ? 'bg-green-500/20 text-green-500' :
                               tx.status === 'Rejected' ? 'bg-red-500/20 text-red-500' :
                               'bg-yellow-500/20 text-yellow-500'
                            }`}>
                               {tx.status}
                            </span>
                         </td>
                      </tr>
                   )) : (
                      <tr>
                         <td colSpan="5" className="py-8 text-center text-brand-silver">No transactions found</td>
                      </tr>
                   )}
                </tbody>
             </table>
          </div>
      </Card>
    </div>
  );
}
