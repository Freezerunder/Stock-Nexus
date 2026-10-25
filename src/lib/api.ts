// src/lib/api.ts
export async function getStockData(symbol: string) {
  // In a real production app, you would use:
  // const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.STOCK_API_KEY}`);
  // return res.json();

  // For now, we implement a realistic mock to allow immediate development and testing
  return {
    symbol,
    price: (Math.random() * 200 + 100).toFixed(2),
    change: (Math.random() * 4 - 2).toFixed(2),
    changePercent: (Math.random() * 2 - 1).toFixed(2) + '%',
    volume: Math.floor(Math.random() * 1000000).toLocaleString(),
    high: (Math.random() * 200 + 100).toFixed(2),
    low: (Math.random() * 200 + 100).toFixed(2),
    timestamp: new Date().toISOString(),
  };
}

export async function getStockNews(symbol: string) {
  // Mock news data based on the symbol
  const newsItems = [
    { id: 1, title: `${symbol} announces quarterly earnings beating expectations`, sentiment: 'positive', source: 'Reuters', time: '2h ago' },
    { id: 2, title: `Market analysts debate the future valuation of ${symbol}`, sentiment: 'neutral', source: 'Bloomberg', time: '5h ago' },
    { id: 3, title: `New regulatory headwinds could impact ${symbol} operations`, sentiment: 'negative', source: 'Financial Times', time: '12h ago' },
    { id: 4, title: `${symbol} expands its partnership with AI leader`, sentiment: 'positive', source: 'CNBC', time: '1d ago' },
  ];

  return newsItems;
}
