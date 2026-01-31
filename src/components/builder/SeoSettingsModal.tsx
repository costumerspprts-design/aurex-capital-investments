import React from 'react';
import { useBuilderStore } from '@/lib/store';
import { X } from 'lucide-react';
import clsx from 'clsx';

export function SeoSettingsModal({ onClose }: { onClose: () => void }) {
  const { pages, activePageId, updatePageSeo } = useBuilderStore();
  const activePage = pages.find(p => p.id === activePageId);

  const titleId = React.useId();
  const titleCountId = React.useId();
  const descriptionId = React.useId();
  const descriptionCountId = React.useId();
  const slugId = React.useId();

  if (!activePage) return null;

  const titleLength = activePage.seo.title.length;
  const descriptionLength = activePage.seo.description.length;
  const titleLimit = 60;
  const descriptionLimit = 160;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4 animate-in zoom-in-95">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">SEO & Page Settings</h2>
            <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-700">
                <X size={24} />
            </button>
        </div>

        <div className="space-y-4">
            <div>
                <div className="flex justify-between items-center mb-1">
                    <label htmlFor={titleId} className="block text-sm font-medium text-gray-700">Page Title (Meta Title)</label>
                    <span id={titleCountId} className={clsx("text-xs font-medium", titleLength > titleLimit ? "text-red-600" : "text-gray-500")}>
                        {titleLength}/{titleLimit}
                    </span>
                </div>
                <input
                    id={titleId}
                    type="text"
                    value={activePage.seo.title}
                    onChange={(e) => updatePageSeo(activePage.id, { title: e.target.value })}
                    className={clsx(
                        "w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none",
                         titleLength > titleLimit ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-300"
                    )}
                    placeholder="e.g. Home - My Website"
                    aria-describedby={titleCountId}
                />
            </div>
            <div>
                <div className="flex justify-between items-center mb-1">
                    <label htmlFor={descriptionId} className="block text-sm font-medium text-gray-700">Meta Description</label>
                    <span id={descriptionCountId} className={clsx("text-xs font-medium", descriptionLength > descriptionLimit ? "text-red-600" : "text-gray-500")}>
                        {descriptionLength}/{descriptionLimit}
                    </span>
                </div>
                <textarea
                    id={descriptionId}
                    value={activePage.seo.description}
                    onChange={(e) => updatePageSeo(activePage.id, { description: e.target.value })}
                    className={clsx(
                        "w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none h-24",
                        descriptionLength > descriptionLimit ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-300"
                    )}
                    placeholder="Brief description of this page for search engines..."
                    aria-describedby={descriptionCountId}
                />
            </div>
             <div>
                <label htmlFor={slugId} className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                <input
                    id={slugId}
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
