'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Check role to redirect (admin or user)
      if (data.user.role === 'admin') {
         router.push('/admin/dashboard');
      } else {
         router.push('/dashboard');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome Back</h2>

          {error && (
            <div className="bg-red-900/50 text-red-200 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-brand-silver mb-2">Username or Email</label>
              <input
                type="text"
                required
                className="w-full bg-brand-black/50 border border-brand-silver/20 rounded-lg p-3 text-white focus:border-brand-gold outline-none"
                value={formData.identifier}
                onChange={(e) => setFormData({...formData, identifier: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-brand-silver mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full bg-brand-black/50 border border-brand-silver/20 rounded-lg p-3 text-white focus:border-brand-gold outline-none"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <Button variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p className="mt-6 text-center text-brand-silver">
            Don&apos;t have an account? <Link href="/register" className="text-brand-gold hover:underline">Register here</Link>
          </p>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
