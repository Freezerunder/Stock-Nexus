import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WatchlistState {
  watchlist: string[];
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  toggleWatchlist: (symbol: string) => void;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set) => ({
      watchlist: ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'GOOGL'],
      addToWatchlist: (symbol) =>
        set((state) => ({ watchlist: [...state.watchlist, symbol.toUpperCase()] })),
      removeFromWatchlist: (symbol) =>
        set((state) => ({ watchlist: state.watchlist.filter((s) => s !== symbol.toUpperCase()) })),
      toggleWatchlist: (symbol) =>
        set((state) => ({
          watchlist: state.watchlist.includes(symbol.toUpperCase())
            ? state.watchlist.filter((s) => s !== symbol.toUpperCase())
            : [...state.watchlist, symbol.toUpperCase()],
        })),
    }),
    {
      name: 'stock-nexus-watchlist',
    }
  )
);
