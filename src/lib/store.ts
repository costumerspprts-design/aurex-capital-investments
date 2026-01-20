import { create } from 'zustand';

export interface Section {
  id: string;
  type: 'hero' | 'features' | 'about' | 'contact' | 'services' | 'text' | 'gallery';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any; // Flexible for now
}

export interface Page {
  id: string;
  name: string;
  slug: string;
  sections: Section[];
  seo: {
    title: string;
    description: string;
  };
}

export interface SiteConfig {
  name: string;
  theme: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
  };
}

interface BuilderState {
  pages: Page[];
  activePageId: string;
  siteConfig: SiteConfig;

  // Actions
  setActivePage: (id: string) => void;
  addPage: (page: Partial<Page> & { name: string, slug: string }) => void;
  updatePageSeo: (pageId: string, seo: Partial<Page['seo']>) => void;
  addSection: (pageId: string, section: Omit<Section, 'id'>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateSection: (pageId: string, sectionId: string, content: any) => void;
  removeSection: (pageId: string, sectionId: string) => void;
  updateSiteConfig: (config: Partial<SiteConfig>) => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  pages: [
    {
      id: 'home',
      name: 'Home',
      slug: '/',
      seo: { title: 'Home', description: 'Welcome to my website' },
      sections: [
        {
           id: 'hero-1',
           type: 'hero',
           content: { headline: 'Welcome to My Website', subheadline: 'Built with Bee Ai', buttonText: 'Get Started' }
        }
      ]
    }
  ],
  activePageId: 'home',
  siteConfig: {
    name: 'My Bee Ai Site',
    theme: 'light',
    colors: { primary: '#3b82f6', secondary: '#1e293b' }
  },

  setActivePage: (id) => set({ activePageId: id }),
  addPage: (page) => set((state) => {
    const id = page.slug === '/' ? 'home' : page.slug.replace('/', '').toLowerCase();
    return {
      pages: [...state.pages, {
        id,
        sections: [],
        seo: { title: page.name, description: '' },
        ...page
      }],
      activePageId: id // Switch to new page
    };
  }),
  updatePageSeo: (pageId, seo) => set((state) => ({
    pages: state.pages.map(p => p.id === pageId ? { ...p, seo: { ...p.seo, ...seo } } : p)
  })),
  addSection: (pageId, section) => set((state) => ({
    pages: state.pages.map(p => p.id === pageId ? {
      ...p,
      sections: [...p.sections, { ...section, id: Math.random().toString(36).substr(2, 9) }]
    } : p)
  })),
  updateSection: (pageId, sectionId, content) => set((state) => ({
    pages: state.pages.map(p => p.id === pageId ? {
      ...p,
      sections: p.sections.map(s => s.id === sectionId ? { ...s, content: { ...s.content, ...content } } : s)
    } : p)
  })),
  removeSection: (pageId, sectionId) => set((state) => ({
    pages: state.pages.map(p => p.id === pageId ? {
      ...p,
      sections: p.sections.filter(s => s.id !== sectionId)
    } : p)
  })),
  updateSiteConfig: (config) => set((state) => ({ siteConfig: { ...state.siteConfig, ...config } }))
}));
