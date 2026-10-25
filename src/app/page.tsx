import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Zap, ArrowRight, BarChart3, Newspaper, Globe } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-blue-500/50 transition-all group"
  >
    <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4 group-hover:bg-blue-600/40 transition-colors">
      <Icon className="text-blue-400 w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

const StockTicker = () => {
  const stocks = [
    { symbol: 'AAPL', price: '192.42', change: '+1.2%' },
    { symbol: 'TSLA', price: '245.10', change: '-0.8%' },
    { symbol: 'NVDA', price: '480.20', change: '+3.5%' },
    { symbol: 'MSFT', price: '370.15', change: '+0.4%' },
    { symbol: 'GOOGL', price: '142.80', change: '-0.2%' },
    { symbol: 'AMZN', price: '145.10', change: '+1.1%' },
    { symbol: 'META', price: '320.40', change: '+2.3%' },
  ];

  return (
    <div className="relative overflow-hidden py-4 bg-black/40 backdrop-blur-sm border-y border-white/10">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-8"
      >
        {[...stocks, ...stocks].map((stock, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="font-bold text-white">{stock.symbol}</span>
            <span className="text-gray-300">${stock.price}</span>
            <span className={`text-sm font-medium ${stock.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
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
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter">
            {siteConfig.name.charAt(0)}
            <span className="text-blue-500">{siteConfig.name.slice(1)}</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#dashboard" className="hover:text-white transition-colors">Dashboard</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
        </div>
        <button className="px-5 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-blue-500 hover:text-white transition-all active:scale-95">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 border border-blue-500/20">
              The Future of Trading
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight mb-8">
              Invest with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500">
                {siteConfig.description}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Real-time data, AI-driven news analysis, and interactive charts.
              Everything you need to conquer the market in one seamless experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 rounded-full font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group">
                Explore Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full font-bold text-lg hover:bg-white/10 transition-all border border-white/10">
                View Live Market
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ticker Section */}
      <StockTicker />

      {/* Features Section */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Engineered for Alpha</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Our platform combines deep-learning news analysis with military-grade
            data feeds to give you the edge in every trade.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>&copy; 2026 {siteConfig.name} Intelligence. All rights reserved.</p>
      </footer>
    </div>
  );
}
