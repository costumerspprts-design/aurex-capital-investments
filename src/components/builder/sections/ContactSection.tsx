import React from 'react';
import { useBuilderStore } from '@/lib/store';
import { Mail, Phone } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ContactSection({ pageId, section }: { pageId: string, section: any }) {
  const { updateSection } = useBuilderStore();

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-700">
                    <Mail className="text-blue-600" />
                    <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => updateSection(pageId, section.id, { email: e.currentTarget.textContent })}
                        className="outline-none hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 rounded px-1"
                    >
                        {section.content.email || 'email@example.com'}
                    </span>
                </div>
                {section.content.showPhone && (
                    <div className="flex items-center space-x-3 text-gray-700">
                        <Phone className="text-blue-600" />
                        <span>+1 (555) 123-4567</span>
                    </div>
                )}
            </div>
        </div>

        <form className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-200" onSubmit={(e) => e.preventDefault()}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Your Name" disabled />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="your@email.com" disabled />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none h-32" placeholder="How can we help?" disabled></textarea>
            </div>
            <button className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition-colors" disabled>
                Send Message
            </button>
        </form>
      </div>
    </section>
  );
}
