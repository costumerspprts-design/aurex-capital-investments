import React from 'react';
import { useBuilderStore, Section } from '@/lib/store';
import { HeroSection } from '@/components/builder/sections/HeroSection';
import { TextSection } from '@/components/builder/sections/TextSection';
import { FeaturesSection } from '@/components/builder/sections/FeaturesSection';
import { ContactSection } from '@/components/builder/sections/ContactSection';
import { GallerySection } from '@/components/builder/sections/GallerySection';

export function Canvas() {
  const { pages, activePageId } = useBuilderStore();
  const activePage = pages.find(p => p.id === activePageId);

  if (!activePage) return <div className="p-8 text-center text-gray-500">Page not found</div>;

  const renderSection = (section: Section) => {
    switch (section.type) {
        case 'hero':
            return <HeroSection key={section.id} pageId={activePage.id} section={section} />;
        case 'text':
            return <TextSection key={section.id} pageId={activePage.id} section={section} />;
        case 'features':
            return <FeaturesSection key={section.id} pageId={activePage.id} section={section} />;
        case 'contact':
            return <ContactSection key={section.id} pageId={activePage.id} section={section} />;
        case 'gallery':
            return <GallerySection key={section.id} pageId={activePage.id} section={section} />;
        default:
            return (
                <div key={section.id} className="p-4 border rounded hover:border-blue-500 transition-colors m-4">
                    <p className="text-red-500">Unknown section type: {section.type}</p>
                    <pre className="text-xs bg-gray-50 p-2 overflow-auto">{JSON.stringify(section, null, 2)}</pre>
                </div>
            );
    }
  };

  return (
    <div className="w-full h-full min-h-full bg-white relative">
      <div className="">
        {activePage.sections.length === 0 ? (
            <div className="p-20 text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-300">{activePage.name}</h1>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center text-gray-400 max-w-2xl mx-auto">
                    No sections yet. Add one from the sidebar.
                </div>
            </div>
        ) : (
            activePage.sections.map(section => renderSection(section))
        )}
      </div>
    </div>
  );
}
