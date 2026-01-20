'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
     fetch('/api/user/me')
        .then(res => res.json())
        .then(data => {
           if (data.role === 'admin') {
              setAuthorized(true);
           } else {
              router.push('/admin-login');
           }
        })
        .catch(() => router.push('/admin-login'));
  }, [router]);

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-brand-black text-white">
       <nav className="bg-brand-navy-main border-b border-brand-gold/20 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
             <span className="font-bold text-brand-gold">Aurex Admin Panel</span>
             <button onClick={() => router.push('/')} className="text-sm text-brand-silver hover:text-white">Exit</button>
          </div>
       </nav>
       <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
       </main>
    </div>
  );
}
