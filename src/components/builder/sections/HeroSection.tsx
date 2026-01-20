import React from 'react';
import { useBuilderStore } from '@/lib/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HeroSection({ pageId, section }: { pageId: string, section: any }) {
  const { updateSection } = useBuilderStore();

  return (
    <section className="bg-gray-900 text-white py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => updateSection(pageId, section.id, { headline: e.currentTarget.textContent })}
            className="text-4xl md:text-6xl font-bold mb-6 outline-none hover:bg-gray-800/50 focus:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 rounded px-2"
        >
            {section.content.headline}
        </h1>
        <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => updateSection(pageId, section.id, { subheadline: e.currentTarget.textContent })}
            className="text-xl md:text-2xl text-gray-300 mb-8 outline-none hover:bg-gray-800/50 focus:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 rounded px-2"
        >
            {section.content.subheadline}
        </p>
        <div>
            <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateSection(pageId, section.id, { buttonText: e.currentTarget.textContent })}
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors outline-none focus:ring-2 focus:ring-white cursor-text"
            >
                {section.content.buttonText || 'Button'}
            </span>
        </div>
      </div>
    </section>
  );
}
