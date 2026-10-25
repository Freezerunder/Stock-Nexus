'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Zap, ArrowRight, Newspaper, Globe, BarChart3, ChevronDown, LayoutDashboard, MousePointer2 } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="p-8 rounded-3xl bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md border border-white/10 hover:border-blue-500/50 transition-all group"
  >
    <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-6 group-hover:bg-blue-600/40 transition-colors">
      <Icon className="text-blue-400 w-7 h-7" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-lg">{description}</p>
  </motion.div>
);

const StockTicker = () => {
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '192.42', change: '+1.2%' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: '245.10', change: '-0.8%' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '480.20', change: '+3.5%' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: '370.15', change: '+0.4%' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '142.80', change: '-0.2%' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '145.10', change: '+1.1%' },
    { symbol: 'META', name: 'Meta Platforms', price: '320.40', change: '+2.3%' },
    { symbol: 'AMD', name: 'Advanced Micro Devices', price: '160.20', change: '+1.8%' },
    { symbol: 'NFLX', name: 'Netflix, Inc.', price: '440.10', change: '-1.1%' },
    { symbol: 'BABA', name: 'Alibaba Group', price: '75.20', change: '+0.5%' },
  ];

  return (
    <div className="relative overflow-hidden py-6 bg-blue-600/5 backdrop-blur-sm border-y border-white/5">
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-12"
      >
        {[...stocks, ...stocks].map((stock, i) => (
          <div key={i} className="flex items-center gap-3 group cursor-default">
            <span className="font-black text-white text-lg">{stock.symbol}</span>
            <span className="text-gray-500 text-sm hidden md:block">• {stock.name}</span>
            <span className="text-gray-300 font-medium">${stock.price}</span>
            <span className={`text-sm font-bold ${stock.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
              {stock.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-blue-500/30 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-blue-600/20">
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter">
              {siteConfig.name.charAt(0)}
              <span className="text-blue-500">{siteConfig.name.slice(1)}</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#preview" className="hover:text-white transition-colors">Live Preview</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <Link href="/dashboard" className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-bold hover:bg-blue-500 hover:text-white transition-all active:scale-95 shadow-xl">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-blue-600/10 blur-[140px] rounded-full -z-10" />

        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8 border border-blue-500/20 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Institutional Grade Intel
            </span>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-8">
              Trade the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500">
                Future Now.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
              Hyper-accurate real-time feeds, AI-driven sentiment analysis, and
              precision charting. The edge you need, delivered instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/dashboard" className="w-full sm:w-auto px-10 py-5 bg-blue-600 rounded-full font-bold text-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-blue-600/30">
                Launch Terminal
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#preview" className="w-full sm:w-auto px-10 py-5 bg-white/5 backdrop-blur-sm rounded-full font-bold text-xl hover:bg-white/10 transition-all border border-white/10">
                Watch Demo
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-gray-500 animate-bounce"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </div>
      </section>

      {/* Ticker Section */}
      <StockTicker />

      {/* Live Preview Section */}
      <section id="preview" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Experience the Power</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto font-medium">
            A glimpse into the StockNexus terminal. Clean, fast, and uncompromising.
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-[#0f0f12] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
            <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">StockNexus Terminal v1.0</div>
              <div className="w-10" />
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { symbol: 'NVDA', name: 'NVIDIA', price: '482.10', change: '+4.2%', color: 'text-green-400' },
                { symbol: 'AAPL', name: 'Apple', price: '191.20', change: '-0.5%', color: 'text-red-400' },
                { symbol: 'TSLA', name: 'Tesla', price: '241.50', change: '+2.1%', color: 'text-green-400' },
              ].map((stock) => (
                <div key={stock.symbol} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-2xl font-black">{stock.symbol}</div>
                      <div className="text-gray-500 text-sm">{stock.name}</div>
                    </div>
                    <div className={`font-bold ${stock.color}`}>{stock.change}</div>
                  </div>
                  <div className="text-3xl font-mono font-bold">${stock.price}</div>
                  <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '70%' }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Engineered for Alpha</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto font-medium">
            Our platform combines deep-learning news analysis with military-grade
            data feeds to give you the edge in every trade.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.features.map((feature) => {
            const Icon = {
              latency: Zap,
              sentiment: Newspaper,
              security: Shield,
            }[feature.id] || Zap;
            return (
              <FeatureCard
                key={feature.id}
                icon={Icon}
                title={feature.title}
                description={feature.description}
              />
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto rounded-[48px] bg-gradient-to-br from-blue-600 to-indigo-700 p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-600/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Ready to scale your portfolio?</h2>
          <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto font-medium opacity-90">
            Join thousands of traders who have already upgraded their intelligence.
          </p>
          <Link href="/dashboard" className="inline-flex items-center gap-3 px-12 py-5 bg-white text-blue-600 rounded-full font-bold text-2xl hover:bg-gray-100 transition-all active:scale-95 shadow-xl">
            Get Instant Access
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">
              {siteConfig.name}
            </span>
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">API Docs</a>
          </div>
          <p className="text-sm">&copy; 2026 {siteConfig.name} Intelligence. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
