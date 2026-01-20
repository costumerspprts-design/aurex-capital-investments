'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/Button';
import { Menu, X, Shield, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-gold to-brand-gold-dark rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-gold to-brand-silver">
              Aurex Capital
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-brand-silver hover:text-brand-gold transition-colors">Home</Link>
            <Link href="/plans" className="text-brand-silver hover:text-brand-gold transition-colors">Plans</Link>
            <Link href="/whitepaper" className="text-brand-silver hover:text-brand-gold transition-colors">Whitepaper</Link>
            <Link href="/contact" className="text-brand-silver hover:text-brand-gold transition-colors">Contact</Link>
            <Link href="/login">
              <Button variant="secondary" className="px-4 py-2 text-sm">Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" className="px-4 py-2 text-sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-brand-silver hover:text-brand-gold"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-navy-main border-b border-brand-gold/20"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <Link href="/" className="block text-brand-silver hover:text-brand-gold" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="/plans" className="block text-brand-silver hover:text-brand-gold" onClick={() => setIsOpen(false)}>Plans</Link>
              <Link href="/whitepaper" className="block text-brand-silver hover:text-brand-gold" onClick={() => setIsOpen(false)}>Whitepaper</Link>
              <Link href="/contact" className="block text-brand-silver hover:text-brand-gold" onClick={() => setIsOpen(false)}>Contact</Link>
              <div className="flex flex-col gap-3 pt-4">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="secondary" className="w-full">Login</Button>
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
