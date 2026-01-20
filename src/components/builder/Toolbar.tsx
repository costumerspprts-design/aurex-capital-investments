import React from 'react';
import { Monitor, Smartphone, Globe, Save } from 'lucide-react';

export function Toolbar() {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center space-x-2">
         <button className="p-2 text-gray-500 hover:bg-gray-100 rounded" title="Desktop View"><Monitor size={20} /></button>
         <button className="p-2 text-gray-500 hover:bg-gray-100 rounded" title="Mobile View"><Smartphone size={20} /></button>
      </div>

      <div className="flex items-center space-x-4">
         <button className="text-gray-600 hover:text-gray-900 flex items-center space-x-1">
            <Save size={18} />
            <span className="text-sm">Save</span>
         </button>
         <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm">
            <Globe size={16} />
            <span className="font-medium">Publish</span>
         </button>
      </div>
    </div>
  );
}
