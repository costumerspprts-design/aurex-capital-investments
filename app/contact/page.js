'use client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Phone, Send, MapPin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar />
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-brand-silver/60 mb-12">
              Our support team is available 24/7 to assist you with any questions or concerns.
            </p>

            <div className="space-y-8">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-navy-light rounded-lg flex items-center justify-center text-brand-gold">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Phone Support</h3>
                    <p className="text-brand-silver">+371 2820 9283</p>
                  </div>
               </div>

               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-navy-light rounded-lg flex items-center justify-center text-brand-gold">
                    <Send size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Telegram</h3>
                    <p className="text-brand-silver">@AurexSupport</p>
                  </div>
               </div>

               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-navy-light rounded-lg flex items-center justify-center text-brand-gold">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Email</h3>
                    <p className="text-brand-silver">support@aurexcapital.com</p>
                  </div>
               </div>

               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-navy-light rounded-lg flex items-center justify-center text-brand-gold">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Office</h3>
                    <p className="text-brand-silver">12 Financial District, London, UK</p>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
               <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>
               <form className="space-y-4">
                  <div>
                    <label className="block text-sm text-brand-silver mb-2">Name</label>
                    <input type="text" className="w-full bg-brand-black/50 border border-brand-silver/20 rounded-lg p-3 text-white focus:border-brand-gold outline-none" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-silver mb-2">Email</label>
                    <input type="email" className="w-full bg-brand-black/50 border border-brand-silver/20 rounded-lg p-3 text-white focus:border-brand-gold outline-none" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-silver mb-2">Message</label>
                    <textarea className="w-full bg-brand-black/50 border border-brand-silver/20 rounded-lg p-3 text-white focus:border-brand-gold outline-none h-32" placeholder="How can we help?"></textarea>
                  </div>
                  <Button className="w-full">Send Message</Button>
               </form>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
