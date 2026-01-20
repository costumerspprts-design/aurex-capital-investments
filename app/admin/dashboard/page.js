'use client';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, X, Search, User, Download } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState({ users: [], transactions: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const refreshData = async () => {
     try {
        const res = await fetch('/api/admin/data');
        const json = await res.json();
        setData(json);
     } catch (e) {
        console.error(e);
     } finally {
        setLoading(false);
     }
  };

  useEffect(() => {
     refreshData();
  }, []);

  const handleTransaction = async (id, action) => {
     if (!confirm(`Are you sure you want to ${action} this transaction?`)) return;

     await fetch(`/api/admin/transactions/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId: id })
     });
     refreshData();
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Username', 'Email', 'Role', 'Status', 'Balance', 'Created At'];
    const rows = data.users.map(u => [
       u.id,
       u.username,
       u.email,
       u.role,
       u.status,
       u.balance,
       u.createdAt
    ]);

    const csvContent = [
       headers.join(','),
       ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'users_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredUsers = data.users.filter(u =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingDeposits = data.transactions.filter(t => t.type === 'deposit' && t.status === 'pending');

  return (
    <div className="space-y-8">
       <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExportCSV}>
             <Download size={16} /> Export CSV
          </Button>
       </div>

       {/* Stats */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-brand-navy-light">
             <div className="text-brand-silver text-sm">Total Users</div>
             <div className="text-2xl font-bold">{data.users.length}</div>
          </Card>
          <Card className="bg-brand-navy-light">
             <div className="text-brand-silver text-sm">Total Deposits</div>
             <div className="text-2xl font-bold text-green-400">
                ${data.transactions.filter(t => t.type === 'deposit' && t.status === 'Approved').reduce((acc, t) => acc + t.amount, 0).toLocaleString()}
             </div>
          </Card>
          <Card className="bg-brand-navy-light">
             <div className="text-brand-silver text-sm">Pending Requests</div>
             <div className="text-2xl font-bold text-yellow-400">{pendingDeposits.length}</div>
          </Card>
       </div>

       {/* Pending Deposits */}
       {pendingDeposits.length > 0 && (
          <Card className="border-brand-gold/50">
             <h2 className="text-xl font-bold text-brand-gold mb-4">Pending Deposits</h2>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="text-brand-silver text-sm border-b border-white/5">
                         <th className="py-2">User</th>
                         <th className="py-2">Amount</th>
                         <th className="py-2">Method</th>
                         <th className="py-2">Details</th>
                         <th className="py-2">Date</th>
                         <th className="py-2 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {pendingDeposits.map(tx => (
                         <tr key={tx.id} className="border-b border-white/5 last:border-0">
                            <td className="py-3">{tx.username}</td>
                            <td className="py-3 font-mono">${tx.amount}</td>
                            <td className="py-3">{tx.method}</td>
                            <td className="py-3 text-sm text-brand-silver max-w-xs truncate">{tx.details}</td>
                            <td className="py-3 text-sm text-brand-silver">{new Date(tx.date).toLocaleDateString()}</td>
                            <td className="py-3 text-right">
                               <div className="flex justify-end gap-2">
                                  <button onClick={() => handleTransaction(tx.id, 'approve')} className="p-1 bg-green-500/20 text-green-500 rounded hover:bg-green-500 hover:text-white transition"><Check size={18} /></button>
                                  <button onClick={() => handleTransaction(tx.id, 'reject')} className="p-1 bg-red-500/20 text-red-500 rounded hover:bg-red-500 hover:text-white transition"><X size={18} /></button>
                               </div>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </Card>
       )}

       {/* Users List */}
       <Card>
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold">Registered Users</h2>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-silver" size={16} />
                <input
                   type="text"
                   placeholder="Search users..."
                   className="bg-brand-black border border-brand-silver/20 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-brand-gold outline-none"
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                />
             </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead>
                   <tr className="text-brand-silver text-sm border-b border-white/5">
                      <th className="py-2">User</th>
                      <th className="py-2">Email</th>
                      <th className="py-2">Balance</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Role</th>
                      <th className="py-2 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody>
                   {filteredUsers.map(u => (
                      <tr key={u.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                         <td className="py-3 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-brand-navy text-xs flex items-center justify-center border border-brand-gold/30">
                               <User size={14} />
                            </div>
                            {u.username}
                         </td>
                         <td className="py-3 text-brand-silver">{u.email}</td>
                         <td className="py-3 font-mono">${u.balance?.toLocaleString() || 0}</td>
                         <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${u.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                               {u.status}
                            </span>
                         </td>
                         <td className="py-3 text-xs uppercase">{u.role}</td>
                         <td className="py-3 text-right">
                            <button className="text-xs text-brand-gold hover:underline">Edit</button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </Card>
    </div>
  );
}
