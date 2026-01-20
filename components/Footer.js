import Link from 'next/link';
import { Shield, Send, Phone, Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-black border-t border-brand-silver/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-gold to-brand-gold-dark rounded-md flex items-center justify-center">
                <span className="text-black font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-white">
                Aurex Capital
              </span>
            </div>
            <p className="text-brand-silver-light/60 mb-6 max-w-sm">
              Professional institutional investment platform providing secure growth and global opportunities for smart investors since 1993.
            </p>
            <div className="flex gap-4">
               {/* Social icons placeholder */}
               <div className="w-10 h-10 rounded-full bg-brand-navy-light flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-black transition-colors cursor-pointer">
                  <Send size={20} />
               </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-brand-gold font-bold mb-6">Platform</h3>
            <ul className="space-y-4">
              <li><Link href="/plans" className="text-brand-silver hover:text-brand-gold transition-colors">Investment Plans</Link></li>
              <li><Link href="/portfolio" className="text-brand-silver hover:text-brand-gold transition-colors">Portfolio</Link></li>
              <li><Link href="/whitepaper" className="text-brand-silver hover:text-brand-gold transition-colors">Whitepaper</Link></li>
              <li><Link href="/contact" className="text-brand-silver hover:text-brand-gold transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-brand-gold font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-brand-silver">
                <Phone size={18} className="text-brand-gold" />
                <span>+371 2820 9283</span>
              </li>
              <li className="flex items-center gap-3 text-brand-silver">
                <Send size={18} className="text-brand-gold" />
                <a href="#" className="hover:text-brand-gold">Telegram Support</a>
              </li>
              <li className="mt-8">
                 <Link href="/admin-login" className="flex items-center gap-2 text-xs text-brand-silver/30 hover:text-brand-gold transition-colors">
                    <Shield size={14} /> Admin Access
                 </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-sm text-brand-silver/40">
          <p>© 1993 Aurex Capital Investments. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
