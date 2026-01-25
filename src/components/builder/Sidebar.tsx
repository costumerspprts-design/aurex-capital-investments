import React, { useState } from 'react';
import { useBuilderStore, Section } from '@/lib/store';
import { Plus, FileText, Upload, Settings } from 'lucide-react';
import { SeoSettingsModal } from '@/components/builder/SeoSettingsModal';

export function Sidebar() {
  const { pages, activePageId, setActivePage, addPage } = useBuilderStore();
  const [isAdding, setIsAdding] = useState(false);
  const [tab, setTab] = useState<'pages' | 'assets'>('pages');
  const [showSeoSettings, setShowSeoSettings] = useState(false);

  const handleAddPage = (type: 'about' | 'services' | 'contact' | 'empty') => {
    let name = '';
    let sections: Omit<Section, 'id'>[] = [];

    switch (type) {
      case 'about':
        name = 'About Us';
        sections = [
            { type: 'hero', content: { headline: 'About Our Company', subheadline: 'We are dedicated to providing the best service.', buttonText: 'Contact Us' } },
            { type: 'text', content: { text: 'Founded in 2024, Bee Ai has been at the forefront of AI website generation...' } }
        ];
        break;
      case 'services':
        name = 'Services';
        sections = [
            { type: 'hero', content: { headline: 'Our Services', subheadline: 'What we can do for you.', buttonText: 'Learn More' } },
            { type: 'features', content: { features: [
                { title: 'Web Design', description: 'Beautiful responsive websites.' },
                { title: 'SEO', description: 'Rank higher in search results.' },
                { title: 'Development', description: 'Custom functionality.' }
            ] } }
        ];
        break;
      case 'contact':
        name = 'Contact Us';
        sections = [
             { type: 'hero', content: { headline: 'Get in Touch', subheadline: 'We would love to hear from you.', buttonText: '' } },
             { type: 'contact', content: { email: 'contact@example.com', showPhone: true } }
        ];
        break;
      default:
        name = 'New Page';
        sections = [];
    }

    // Check for duplicates
    let uniqueName = name;
    let counter = 1;
    while (pages.some(p => p.name === uniqueName)) {
        uniqueName = `${name} (${counter++})`;
    }

    const sectionsWithIds = sections.map(s => ({
        ...s,
        id: Math.random().toString(36).substr(2, 9)
    }));

    addPage({
        name: uniqueName,
        slug: uniqueName.toLowerCase().replace(/ /g, '-').replace(/[()]/g, ''),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sections: sectionsWithIds as any
    });
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg text-blue-600">Bee Ai Builder</h2>
      </div>

      <div className="flex border-b text-sm" role="tablist">
        <button
          onClick={() => setTab('pages')}
          className={`flex-1 py-3 text-center transition-colors ${tab === 'pages' ? 'border-b-2 border-blue-600 font-medium text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          role="tab"
          aria-selected={tab === 'pages'}
        >
          Pages
        </button>
        <button
          onClick={() => setTab('assets')}
          className={`flex-1 py-3 text-center transition-colors ${tab === 'assets' ? 'border-b-2 border-blue-600 font-medium text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          role="tab"
          aria-selected={tab === 'assets'}
        >
          Assets
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        {tab === 'pages' ? (
            <>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pages</h3>
                    <button
                      onClick={() => setIsAdding(!isAdding)}
                      className="text-gray-500 hover:text-blue-600"
                      aria-label="Add new page"
                      aria-expanded={isAdding}
                    >
                        <Plus size={16} />
                    </button>
                </div>

                {isAdding && (
                    <div className="mb-4 bg-gray-50 p-2 rounded border border-gray-200 text-sm animate-in fade-in slide-in-from-top-2">
                        <p className="mb-2 font-medium text-gray-700">Select Template:</p>
                        <div className="space-y-1">
                            <button autoFocus onClick={() => handleAddPage('about')} className="block w-full text-left px-2 py-1 hover:bg-white rounded transition-colors">About</button>
                            <button onClick={() => handleAddPage('services')} className="block w-full text-left px-2 py-1 hover:bg-white rounded transition-colors">Services</button>
                            <button onClick={() => handleAddPage('contact')} className="block w-full text-left px-2 py-1 hover:bg-white rounded transition-colors">Contact</button>
                            <button onClick={() => handleAddPage('empty')} className="block w-full text-left px-2 py-1 hover:bg-white rounded transition-colors">Empty</button>
                        </div>
                    </div>
                )}

                <nav className="space-y-1">
                {pages.map(page => (
                    <div key={page.id} className="flex items-center group">
                        <button
                        onClick={() => setActivePage(page.id)}
                        className={`flex-1 text-left px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-2 ${
                            activePageId === page.id
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        >
                        <FileText size={14} />
                        <span>{page.name}</span>
                        </button>
                    </div>
                ))}
                </nav>
            </>
        ) : (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-gray-100 rounded overflow-hidden relative group cursor-pointer border border-transparent hover:border-blue-500">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                             <img src={`https://picsum.photos/200?random=${i}`} alt={`Asset ${i}`} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
                                 Select
                             </div>
                        </div>
                    ))}
                </div>
                <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center justify-center space-x-2">
                    <Upload size={16} />
                    <span>Upload Image</span>
                </button>
            </div>
        )}
      </div>

      <div className="p-4 border-t mt-auto space-y-2">
          <button
            onClick={() => setShowSeoSettings(true)}
            className="w-full flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-2 py-2 rounded hover:bg-gray-50 transition-colors"
          >
            <Settings size={16} />
            <span className="text-sm font-medium">Page SEO Settings</span>
          </button>
      </div>

      {showSeoSettings && <SeoSettingsModal onClose={() => setShowSeoSettings(false)} />}
    </div>
  );
}
