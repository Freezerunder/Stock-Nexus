// src/lib/api.ts

// Baseline real-world approximate prices (October 2026 estimate/averages)
const BASELINE_MARKET_DATA: Record<string, { price: number; volatility: number }> = {
  // Tech Giants
  'AAPL': { price: 230.50, volatility: 2.5 },
  'TSLA': { price: 250.20, volatility: 5.0 },
  'NVDA': { price: 145.10, volatility: 6.0 },
  'MSFT': { price: 420.00, volatility: 2.0 },
  'GOOGL': { price: 170.00, volatility: 2.0 },
  'AMZN': { price: 185.00, volatility: 3.0 },
  'META': { price: 530.00, volatility: 3.5 },
  'AMD': { price: 160.00, volatility: 4.5 },
  'NFLX': { price: 620.00, volatility: 3.0 },
  'INTC': { price: 30.00, volatility: 4.0 },
  'ORCL': { price: 140.00, volatility: 2.0 },
  'CSCO': { price: 50.00, volatility: 1.5 },
  'CRM': { price: 280.00, volatility: 3.0 },
  'ADBE': { price: 550.00, volatility: 2.5 },
  'PYPL': { price: 65.00, volatility: 3.5 },
  'SBUX': { price: 95.00, volatility: 2.0 },
  'UBER': { price: 70.00, volatility: 4.0 },
  'ABNB': { price: 140.00, volatility: 4.0 },
  'SHOP': { price: 80.00, volatility: 5.0 },

  // Finance & Payments
  'V': { price: 270.00, volatility: 1.5 },
  'MA': { price: 460.00, volatility: 1.5 },
  'JPM': { price: 210.00, volatility: 1.2 },
  'BAC': { price: 38.00, volatility: 1.2 },
  'GS': { price: 480.00, volatility: 2.0 },
  'MS': { price: 120.00, volatility: 2.0 },
  'AXP': { price: 240.00, volatility: 2.0 },

  // Consumer & Retail
  'WMT': { price: 65.00, volatility: 1.0 },
  'TGT': { price: 150.00, volatility: 2.0 },
  'COST': { price: 850.00, volatility: 1.5 },
  'NKE': { price: 110.00, volatility: 3.0 },
  'PGR': { price: 210.00, volatility: 2.0 },
  'HD': { price: 340.00, volatility: 2.0 },
  'LVMH': { price: 800.00, volatility: 3.0 },

  // Energy & Auto
  'XOM': { price: 115.00, volatility: 2.0 },
  'CVX': { price: 155.00, volatility: 2.0 },
  'F': { price: 12.00, volatility: 4.0 },
  'GM': { price: 45.00, volatility: 4.0 },
  'SHEL': { price: 65.00, volatility: 2.5 },
  'BP': { price: 35.00, volatility: 3.0 },

  // Crypto / Digital Assets
  'BTC': { price: 65000.00, volatility: 8.0 },
  'ETH': { price: 3500.00, volatility: 7.0 },
  'SOL': { price: 150.00, volatility: 10.0 },
  'BNB': { price: 600.00, volatility: 6.0 },
  'ADA': { price: 0.45, volatility: 12.0 },
  'DOT': { price: 7.00, volatility: 12.0 },

  // International
  'BABA': { price: 80.00, volatility: 4.0 },
  'TCEHY': { price: 40.00, volatility: 3.5 },
  'SONY': { price: 90.00, volatility: 2.5 },
  'SAP': { price: 200.00, volatility: 2.0 },
  'ASML': { price: 900.00, volatility: 4.0 },
  'TM': { price: 180.00, volatility: 2.0 },
};

const stockNames: Record<string, string> = {
  'AAPL': 'Apple Inc.',
  'TSLA': 'Tesla, Inc.',
  'NVDA': 'NVIDIA Corporation',
  'MSFT': 'Microsoft Corporation',
  'GOOGL': 'Alphabet Inc.',
  'AMZN': 'Amazon.com, Inc.',
  'META': 'Meta Platforms, Inc.',
  'AMD': 'Advanced Micro Devices',
  'NFLX': 'Netflix, Inc.',
  'INTC': 'Intel Corporation',
  'ORCL': 'Oracle Corporation',
  'CSCO': 'Cisco Systems, Inc.',
  'CRM': 'Salesforce, Inc.',
  'ADBE': 'Adobe Inc.',
  'PYPL': 'PayPal Holdings, Inc.',
  'SBUX': 'Starbucks Corporation',
  'UBER': 'Uber Technologies, Inc.',
  'ABNB': 'Airbnb, Inc.',
  'SHOP': 'Shopify Inc.',
  'V': 'Visa Inc.',
  'MA': 'Mastercard Incorporated',
  'JPM': 'JPMorgan Chase & Co.',
  'BAC': 'Bank of America Corp.',
  'GS': 'Goldman Sachs Group',
  'MS': 'Morgan Stanley',
  'AXP': 'American Express',
  'WMT': 'Walmart Inc.',
  'TGT': 'Target Corporation',
  'COST': 'Costco Wholesale',
  'NKE': 'Nike, Inc.',
  'PGR': 'Progressive Corp.',
  'HD': 'Home Depot, Inc.',
  'LVMH': 'LVMH Moët Hennessy',
  'XOM': 'Exxon Mobil Corporation',
  'CVX': 'Chevron Corporation',
  'F': 'Ford Motor Company',
  'GM': 'General Motors Company',
  'SHEL': 'Shell plc',
  'BP': 'BP plc',
  'BTC': 'Bitcoin',
  'ETH': 'Ethereum',
  'SOL': 'Solana',
  'BNB': 'Binance Coin',
  'ADA': 'Cardano',
  'DOT': 'Polkadot',
  'BABA': 'Alibaba Group Holding',
  'TCEHY': 'Tencent Holdings',
  'SONY': 'Sony Group Corporation',
  'SAP': 'SAP SE',
  'ASML': 'ASML Holding',
  'TM': 'Toyota Motor Corp',
};

export async function getStockData(symbol: string) {
  const upperSymbol = symbol.toUpperCase();
  const fullName = stockNames[upperSymbol] || 'Market Asset';
  const baseline = BASELINE_MARKET_DATA[upperSymbol] || { price: 100, volatility: 3 };

  const fluctuation = (Math.random() - 0.5) * baseline.volatility;
  const currentPrice = baseline.price + fluctuation;
  const change = fluctuation;
  const changePercent = (fluctuation / baseline.price) * 100;

  return {
    symbol: upperSymbol,
    name: fullName,
    price: currentPrice.toFixed(2),
    change: change.toFixed(2),
    changePercent: changePercent.toFixed(2) + '%',
    volume: Math.floor(Math.random() * 50000000).toLocaleString(),
    high: (currentPrice + Math.random()).toFixed(2),
    low: (currentPrice - Math.random()).toFixed(2),
    timestamp: new Date().toISOString(),
  };
}

export async function getStockNews(symbol: string) {
  const upperSymbol = symbol.toUpperCase();
  const fullName = stockNames[upperSymbol] || upperSymbol;

  const newsItems = [
    { id: 1, title: `${fullName} announces quarterly earnings beating expectations`, sentiment: 'positive', source: 'Reuters', time: '2h ago' },
    { id: 2, title: `Market analysts debate the future valuation of ${fullName}`, sentiment: 'neutral', source: 'Bloomberg', time: '5h ago' },
    { id: 3, title: `New regulatory headwinds could impact ${fullName} operations`, sentiment: 'negative', source: 'Financial Times', time: '12h ago' },
    { id: 4, title: `${fullName} expands its partnership with AI leader`, sentiment: 'positive', source: 'CNBC', time: '1d ago' },
  ];

  return newsItems;
}
