import React from 'react';
import { useBuilderStore } from '@/lib/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TextSection({ pageId, section }: { pageId: string, section: any }) {
  const { updateSection } = useBuilderStore();

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => updateSection(pageId, section.id, { text: e.currentTarget.innerText })}
            className="outline-none hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 rounded p-2"
        >
            {section.content.text || 'Write your content here...'}
        </div>
      </div>
    </section>
  );
}
