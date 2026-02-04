import React from 'react';
import { useBuilderStore, Section } from '@/lib/store';
import { CheckCircle } from 'lucide-react';

interface Feature {
    title: string;
    description: string;
    [key: string]: string;
}

export function FeaturesSection({ pageId, section }: { pageId: string, section: Section }) {
  const { updateSection } = useBuilderStore();
  const features = (section.content.features as Feature[]) || [];

  const updateFeature = (index: number, key: string, value: string) => {
    const newFeatures = features.map((f, i) => i === index ? { ...f, [key]: value } : f);
    updateSection(pageId, section.id, { features: newFeatures });
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-blue-600 mb-4">
                        <CheckCircle size={32} />
                    </div>
                    <h3
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => updateFeature(index, 'title', e.currentTarget.textContent || '')}
                        className="text-xl font-bold mb-2 outline-none hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 rounded px-1"
                    >
                        {feature.title}
                    </h3>
                    <p
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => updateFeature(index, 'description', e.currentTarget.textContent || '')}
                        className="text-gray-600 outline-none hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 rounded px-1"
                    >
                        {feature.description}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
