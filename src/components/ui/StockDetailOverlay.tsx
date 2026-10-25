'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, Activity, Newspaper, Globe, Clock, DollarSign, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StockDetailData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  high: string;
  low: string;
  timestamp: string;
}

export const StockDetailPage = ({ symbol, onClose }: { symbol: string; onClose: () => void }) => {
  const [data, setData] = useState<StockDetailData | null>(null);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [stockRes, newsRes] = await Promise.all([
          fetch(`/api/stocks/${symbol}`),
          fetch(`/api/news?symbol=${symbol}`)
        ]);

        const stockData = await stockRes.json();
        const newsData = await newsRes.json();

        setData(stockData);
        setNews(newsData);
      } catch (error) {
        console.error("Error fetching detail data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [symbol]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-[#0f0f12] border border-white/10 w-full max-w-6xl max-h-[90vh] rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-6xl font-black tracking-tighter">{data.symbol}</h1>
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
                    EQUITY
                  </span>
                </div>
                <p className="text-2xl text-gray-400 font-medium mb-6">{data.name}</p>

                <div className="flex items-baseline gap-4">
                  <span className="text-7xl font-mono font-bold">${data.price}</span>
                  <span className={`text-2xl font-bold flex items-center gap-1 ${data.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {data.change.startsWith('+') ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
                    {data.changePercent}
                  </span>
                </div>
              </div>

              {/* Chart Area */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 relative h-80 group">
                <div className="absolute top-4 left-6 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <BarChart3 className="w-4 h-4" /> Price Performance (24h)
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-medium italic opacity-20">
                  Interactive Chart Engine
                </div>
                <svg className="absolute inset-0 w-full h-full p-12" preserveAspectRatio="none">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d="M0 200 Q 100 150, 200 180 T 400 100 T 600 150 T 800 50 T 1000 100"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Data Table */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Volume', value: data.volume, icon: Activity },
                  { label: 'High', value: `$${data.high}`, icon: TrendingUp },
                  { label: 'Low', value: `$${data.low}`, icon: TrendingUp },
                  { label: 'Update', value: 'Real-time', icon: Clock },
                ].map((stat, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase mb-2">
                      <stat.icon className="w-3 h-3" />
                      {stat.label}
                    </div>
                    <div className="text-xl font-bold">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Panel */}
            <div className="space-y-8">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-6">
                  <Newspaper className="w-5 h-5 text-blue-400" />
                  <h2 className="text-2xl font-bold">Intelligence</h2>
                </div>
                <div className="space-y-4">
                  {news.map((item, i) => (
                    <a
                      key={i}
                      href={`https://www.google.com/search?q=${encodeURIComponent(item.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-2xl bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/10 transition-all group cursor-pointer"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          item.sentiment === 'positive' ? 'bg-green-500/10 text-green-400' :
                          item.sentiment === 'negative' ? 'bg-red-500/10 text-red-400' : 'bg-gray-500/10 text-gray-400'
                        }`}>
                          {item.sentiment}
                        </span>
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                      <h3 className="text-sm font-bold group-hover:text-blue-400 transition-colors leading-snug mb-2">
                        {item.title}
                      </h3>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {item.source}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
