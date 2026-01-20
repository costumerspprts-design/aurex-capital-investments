'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, Wallet, ArrowUpRight, ArrowDownLeft, Settings, LogOut, Menu, X, Send, PieChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function DashboardLayout({ children, user }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  // Mobile check
  useEffect(() => {
    const handleResize = () => {
       if (window.innerWidth < 1024) {
          setSidebarOpen(false);
       } else {
          setSidebarOpen(true);
       }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Deposit', href: '/dashboard/deposit', icon: ArrowDownLeft },
    { name: 'Withdraw', href: '/dashboard/withdraw', icon: ArrowUpRight },
    { name: 'Invest', href: '/dashboard/invest', icon: PieChart },
    { name: 'Transactions', href: '/dashboard/transactions', icon: Wallet },
    { name: 'Send', href: '/dashboard/send', icon: Send },
  ];

  return (
    <div className="min-h-screen bg-brand-black flex">
      {/* Sidebar */}
      <AnimatePresence mode='wait'>
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="fixed lg:static inset-y-0 left-0 z-40 bg-brand-navy-main border-r border-white/5 flex flex-col"
          >
             <div className="p-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                   <div className="w-8 h-8 bg-gradient-to-br from-brand-gold to-brand-gold-dark rounded-md flex items-center justify-center">
                      <span className="text-black font-bold">A</span>
                   </div>
                   <span className="text-xl font-bold text-white">Aurex</span>
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-brand-silver">
                   <X size={24} />
                </button>
             </div>

             <nav className="flex-1 px-4 py-4 space-y-2">
                {navItems.map((item) => {
                   const isActive = pathname === item.href;
                   return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20' : 'text-brand-silver hover:bg-white/5 hover:text-white'}`}
                      >
                         <item.icon size={20} />
                         <span>{item.name}</span>
                      </Link>
                   );
                })}
             </nav>

             <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                   <div className="w-10 h-10 rounded-full bg-brand-gold text-black flex items-center justify-center font-bold text-lg">
                      {user?.username?.[0]?.toUpperCase() || 'U'}
                   </div>
                   <div className="overflow-hidden">
                      <p className="text-sm font-bold text-white truncate">{user?.username || 'User'}</p>
                      <p className="text-xs text-brand-silver truncate">{user?.email}</p>
                   </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-colors"
                >
                   <LogOut size={20} />
                   <span>Logout</span>
                </button>
             </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
         <header className="h-16 bg-brand-navy-main/50 border-b border-white/5 flex items-center justify-between px-4 lg:px-8">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-brand-silver hover:text-white">
               <Menu size={24} />
            </button>
            <div className="flex items-center gap-4">
               {/* Header actions */}
            </div>
         </header>
         <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
            {children}
         </main>
      </div>
    </div>
  );
}
