import React from 'react';

export function BuilderLayout({ children, sidebar, toolbar }: { children: React.ReactNode, sidebar: React.ReactNode, toolbar: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden text-gray-900">
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto z-10">
        {sidebar}
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 justify-between z-10">
           {toolbar}
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-8 bg-gray-50">
          <div className="mx-auto bg-white shadow-xl min-h-[calc(100vh-8rem)] rounded-lg overflow-hidden border border-gray-200">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}
