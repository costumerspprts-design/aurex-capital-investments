'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Shield } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
       if (data.user.role === 'admin') {
          router.push('/admin/dashboard');
       } else {
          setError('Access Denied. Admin privileges required.');
       }
    } else {
       setError(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border-brand-gold/30">
         <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center text-brand-gold">
               <Shield size={32} />
            </div>
         </div>
         <h1 className="text-2xl font-bold text-center text-white mb-8">Admin Access</h1>

         {error && <div className="bg-red-900/50 text-red-200 p-3 rounded mb-4 text-center">{error}</div>}

         <form onSubmit={handleSubmit} className="space-y-6">
            <div>
               <label className="text-brand-silver text-sm block mb-2">Username</label>
               <input
                  type="text"
                  className="w-full bg-brand-navy-main border border-brand-silver/20 rounded p-3 text-white"
                  value={formData.identifier}
                  onChange={e => setFormData({...formData, identifier: e.target.value})}
               />
            </div>
            <div>
               <label className="text-brand-silver text-sm block mb-2">Password</label>
               <input
                  type="password"
                  className="w-full bg-brand-navy-main border border-brand-silver/20 rounded p-3 text-white"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
               />
            </div>
            <Button className="w-full">Authenticate</Button>
         </form>
      </Card>
    </div>
  );
}
