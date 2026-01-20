import React from 'react';
import { useBuilderStore } from '@/lib/store';
import { X } from 'lucide-react';

export function SeoSettingsModal({ onClose }: { onClose: () => void }) {
  const { pages, activePageId, updatePageSeo } = useBuilderStore();
  const activePage = pages.find(p => p.id === activePageId);

  if (!activePage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4 animate-in zoom-in-95">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">SEO & Page Settings</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
            </button>
        </div>

        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title (Meta Title)</label>
                <input
                    type="text"
                    value={activePage.seo.title}
                    onChange={(e) => updatePageSeo(activePage.id, { title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. Home - My Website"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended length: 50-60 characters</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea
                    value={activePage.seo.description}
                    onChange={(e) => updatePageSeo(activePage.id, { description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none h-24"
                    placeholder="Brief description of this page for search engines..."
                />
                 <p className="text-xs text-gray-500 mt-1">Recommended length: 150-160 characters</p>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                <input
                    type="text"
                    value={activePage.slug}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                />
            </div>
        </div>

        <div className="mt-8 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">Save & Close</button>
        </div>
      </div>
    </div>
  );
}
