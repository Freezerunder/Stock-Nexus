'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Activity, Newspaper, Globe, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface StockDetailData {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  high: string;
  low: string;
  timestamp: string;
}

export default function StockDetailPage() {
  const params = useParams();
  const symbol = (params.symbol as string).toUpperCase();
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
      <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center">
        <p>Stock not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
              LIVE MARKET
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Main Stats */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <h1 className="text-6xl font-black tracking-tighter mb-2">{symbol}</h1>
                  <p className="text-gray-400 text-xl">Real-time Intelligence Feed</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-mono font-bold mb-1">${data.price}</div>
                  <div className={`text-xl font-bold ${data.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {data.change} ({data.changePercent})
                  </div>
                </div>
              </div>

              {/* Mock Graph Area */}
              <div className="h-64 w-full bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden mb-8 group">
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-medium italic">
                  Interactive Price Chart Visualization
                </div>
                {/* SVG Mock Line */}
                <svg className="absolute inset-0 w-full h-full p-4" preserveAspectRatio="none">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M0 150 Q 100 120, 200 160 T 400 100 T 600 140 T 800 80 T 1000 120"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="4"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Volume', value: data.volume, icon: Activity },
                  { label: 'Day High', value: `$${data.high}`, icon: TrendingUp },
                  { label: 'Day Low', value: `$${data.low}`, icon: TrendingUp },
                  { label: 'Updated', value: 'Just Now', icon: Clock },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase mb-2">
                      <stat.icon className="w-3 h-3" />
                      {stat.label}
                    </div>
                    <div className="text-lg font-bold">{stat.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: News & Sentiment */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-6">
                <Newspaper className="w-5 h-5 text-blue-400" />
                <h2 className="text-2xl font-bold">Market News</h2>
              </div>
              <div className="space-y-6">
                {news.map((item, i) => (
                  <div key={i} className="group cursor-pointer p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/10 ${
                        item.sentiment === 'positive' ? 'text-green-400' :
                        item.sentiment === 'negative' ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {item.sentiment}
                      </span>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                    <h3 className="text-sm font-bold group-hover:text-blue-400 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {item.source}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
