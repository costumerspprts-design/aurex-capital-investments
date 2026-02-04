import React from 'react';
import { useBuilderStore, Section } from '@/lib/store';

export function GallerySection({ section }: { pageId: string, section: Section }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updateSection } = useBuilderStore();
  const images = (section.content.images as string[]) || [
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e',
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131'
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center" contentEditable suppressContentEditableWarning>Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {images.map((url: string, index: number) => (
                <div key={index} className="aspect-square bg-gray-200 overflow-hidden rounded-lg relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="text-white bg-blue-600 px-4 py-2 rounded text-sm font-medium hover:bg-blue-700">Change</button>
                    </div>
                </div>
            ))}
            <button className="aspect-square bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-200 transition-colors">
                <span className="text-gray-500 font-medium">+ Add Image</span>
            </button>
        </div>
      </div>
    </section>
  );
}
