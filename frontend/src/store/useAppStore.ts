import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // Lightweight client-side auth mirror. The real source of truth is the
  // httpOnly JWT cookie; this just lets the UI react instantly without a
  // round trip, and is re-synced from /api/auth/me on load.
  user: { id: string; mobile: string; name?: string } | null;
  setUser: (user: AppState['user']) => void;
  logout: () => void;

  savedTourSlugs: string[];
  toggleSavedTour: (slug: string) => void;

  // Drives the hero's scroll-linked 3D camera flight — read by Hero3D and
  // written by the scroll-progress hook so unrelated components stay decoupled.
  heroScrollProgress: number;
  setHeroScrollProgress: (value: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),

      savedTourSlugs: [],
      toggleSavedTour: (slug) =>
        set((state) => ({
          savedTourSlugs: state.savedTourSlugs.includes(slug)
            ? state.savedTourSlugs.filter((s) => s !== slug)
            : [...state.savedTourSlugs, slug],
        })),

      heroScrollProgress: 0,
      setHeroScrollProgress: (value) => set({ heroScrollProgress: value }),
    }),
    {
      name: 'hy-app-store',
      partialize: (state) => ({ savedTourSlugs: state.savedTourSlugs }), // don't persist auth or scroll state
    },
  ),
);
