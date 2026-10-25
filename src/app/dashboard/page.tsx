'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, LayoutGrid, List, X } from 'lucide-react';
import Link from 'next/link';
import { useWatchlistStore } from '@/store/watchlist';
import { StockCard } from '@/components/ui/StockCard';
import { StockDetailPage } from '@/components/ui/StockDetailOverlay';

interface StockData {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
}

export default function Dashboard() {
  const { watchlist, toggleWatchlist } = useWatchlistStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  const fetchStocks = async () => {
    try {
      const promises = watchlist.map(async (symbol) => {
        const res = await fetch(`/api/stocks/${symbol}`);
        return res.json();
      });
      const results = await Promise.all(promises);
      setStocks(results);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
    const interval = setInterval(fetchStocks, 10000); // Update every 10s
    return () => clearInterval(interval);
  }, [watchlist]);

  const filteredStocks = stocks.filter(s =>
    s?.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-black tracking-tighter">My Portfolio</h1>
              <p className="text-gray-500 text-sm">Real-time market intelligence</p>
            </div>
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const symbol = formData.get('symbol') as string;
                if (symbol) {
                  toggleWatchlist(symbol);
                  setSearchQuery('');
                }
              }}
              className="relative"
            >
              <input
                name="symbol"
                type="text"
                placeholder="Add ticker (e.g. AMZN)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full md:w-64 transition-all"
              />
            </form>
          </div>
        </header>

        {/* Main Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredStocks.map((stock) => (
                <div key={stock.symbol} onClick={() => setSelectedSymbol(stock.symbol)}>
                  <StockCard
                    {...stock}
                    isWatched={watchlist.includes(stock.symbol)}
                    onToggleWatch={toggleWatchlist}
                  />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredStocks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No stocks found matching your search.</p>
          </div>
        )}
      </div>

      {/* Expansion Overlay */}
      <AnimatePresence>
        {selectedSymbol && (
          <StockDetailPage
            symbol={selectedSymbol}
            onClose={() => setSelectedSymbol(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
