'use client';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowUpRight, ArrowDownLeft, Wallet, TrendingUp, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Link from 'next/link';

// Mock chart data
const chartData = [
  { name: 'Mon', val: 4000 },
  { name: 'Tue', val: 3000 },
  { name: 'Wed', val: 5000 },
  { name: 'Thu', val: 2780 },
  { name: 'Fri', val: 6890 },
  { name: 'Sat', val: 8390 },
  { name: 'Sun', val: 10490 },
];

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
     // Fetch fresh data
     fetch('/api/user/me')
       .then(res => res.json())
       .then(data => setUser(data));

     fetch('/api/transactions')
       .then(res => res.json())
       .then(data => setTransactions(data.reverse().slice(0, 5))); // Last 5
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-8">
       {/* Balance Section */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 bg-gradient-to-br from-brand-navy-light to-brand-black border-brand-gold/20">
             <div className="flex justify-between items-start mb-6">
                <div>
                   <h2 className="text-brand-silver mb-1">Total Balance</h2>
                   <div className="text-4xl font-bold text-white flex items-center gap-2">
                      <span>$</span>
                      <span>{user.balance?.toLocaleString() || '0.00'}</span>
                   </div>
                </div>
                <div className="bg-brand-gold/10 p-3 rounded-full text-brand-gold">
                   <Wallet size={24} />
                </div>
             </div>

             <div className="flex flex-wrap gap-4">
                <Link href="/dashboard/deposit">
                   <Button variant="primary" className="px-6">Deposit</Button>
                </Link>
                <Link href="/dashboard/withdraw">
                   <Button variant="secondary" className="px-6">Withdraw</Button>
                </Link>
                <Link href="/dashboard/send">
                   <Button variant="outline" className="px-6">Send</Button>
                </Link>
                <Button variant="outline" className="px-6">Pay Bills</Button>
                <Button variant="outline" className="px-6">Receive</Button>
             </div>
          </Card>

          <Card className="flex flex-col justify-center">
             <h3 className="text-brand-silver mb-4">Active Investment</h3>
             <div className="text-2xl font-bold text-white mb-2">Standard Plan</div>
             <div className="w-full bg-brand-navy-main h-2 rounded-full mb-2">
                <div className="bg-brand-gold h-full rounded-full" style={{ width: '45%' }}></div>
             </div>
             <div className="flex justify-between text-sm text-brand-silver">
                <span>45% Complete</span>
                <span>ROI: 8%</span>
             </div>
          </Card>
       </div>

       {/* Chart Section */}
       <Card>
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-bold text-white">Performance Overview</h3>
             <div className="flex gap-2">
                <span className="text-xs bg-brand-navy p-1 rounded text-brand-gold">1W</span>
                <span className="text-xs text-brand-silver p-1">1M</span>
                <span className="text-xs text-brand-silver p-1">1Y</span>
             </div>
          </div>
          <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                   <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                      </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                   <XAxis dataKey="name" stroke="#888" />
                   <YAxis stroke="#888" />
                   <Tooltip
                      contentStyle={{ backgroundColor: '#0a192f', borderColor: '#D4AF37', color: '#fff' }}
                   />
                   <Area type="monotone" dataKey="val" stroke="#D4AF37" fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
       </Card>

       {/* Recent Transactions */}
       <Card>
          <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead>
                   <tr className="border-b border-white/5 text-brand-silver text-sm">
                      <th className="py-3 font-normal">Type</th>
                      <th className="py-3 font-normal">Amount</th>
                      <th className="py-3 font-normal">Date</th>
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
                         <td colSpan="4" className="py-8 text-center text-brand-silver">No transactions found</td>
                      </tr>
                   )}
                </tbody>
             </table>
          </div>
       </Card>
    </div>
  );
}
