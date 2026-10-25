import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import Link from 'next/link';

interface StockCardProps {
  symbol: string;
  name?: string;
  price: string;
  change: string;
  changePercent: string;
  isWatched: boolean;
  onToggleWatch: (symbol: string) => void;
}

export const StockCard = ({ symbol, name, price, change, changePercent, isWatched, onToggleWatch }: StockCardProps) => {
  const isPositive = parseFloat(change) >= 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-5 rounded-3xl relative overflow-hidden group hover:border-blue-500/50 transition-all h-full flex flex-col justify-between"
    >
      <Link href={`/dashboard/${symbol}`} className="absolute inset-0 z-0">
        <span className="sr-only">View ${symbol} details</span>
      </Link>
      <div className="relative z-10 flex justify-between items-start mb-4">
        <div className="pointer-events-none min-w-0">
          <h3 className="text-2xl font-black tracking-tighter text-white truncate">{symbol}</h3>
          <p className="text-xs text-gray-400 font-medium truncate max-w-[120px]">{name || 'Market Asset'}</p>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleWatch(symbol);
          }}
          className={`p-2 rounded-full transition-all ${isWatched ? 'bg-yellow-500/20 text-yellow-500' : 'bg-white/5 text-gray-500 hover:text-white'}`}
        >
          <Star className={`w-4 h-4 ${isWatched ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="relative z-10 flex items-end justify-between">
        <div className="pointer-events-none">
          <span className="text-3xl font-bold text-white">${price}</span>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-bold ${isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {changePercent}
        </div>
      </div>

      {/* Decorative background glow on hover */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-600/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};
