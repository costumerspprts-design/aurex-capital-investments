'use client';

import { BuilderLayout } from '@/components/builder/BuilderLayout';
import { Sidebar } from '@/components/builder/Sidebar';
import { Canvas } from '@/components/builder/Canvas';
import { Toolbar } from '@/components/builder/Toolbar';

export default function BuilderPage() {
  return (
    <BuilderLayout
      sidebar={<Sidebar />}
      toolbar={<Toolbar />}
    >
      <Canvas />
    </BuilderLayout>
  );
}
