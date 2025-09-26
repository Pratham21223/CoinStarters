export interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  marketCap: number;
  volume24h: number;
  rank: number;
  icon: string;
}

export interface ChartDataPoint {
  timestamp: number;
  price: number;
  volume: number;
}

// Mock cryptocurrency data - top 20
export const mockCryptocurrencies: Cryptocurrency[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 42350.45,
    change24h: 1250.30,
    changePercent24h: 3.04,
    marketCap: 828000000000,
    volume24h: 15600000000,
    rank: 1,
    icon: '₿'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2580.67,
    change24h: -45.20,
    changePercent24h: -1.72,
    marketCap: 310000000000,
    volume24h: 8900000000,
    rank: 2,
    icon: 'Ξ'
  },
  {
    id: 'tether',
    name: 'Tether',
    symbol: 'USDT',
    price: 1.00,
    change24h: 0.001,
    changePercent24h: 0.1,
    marketCap: 95000000000,
    volume24h: 23000000000,
    rank: 3,
    icon: '₮'
  },
  {
    id: 'bnb',
    name: 'BNB',
    symbol: 'BNB',
    price: 315.42,
    change24h: 8.75,
    changePercent24h: 2.85,
    marketCap: 47000000000,
    volume24h: 1200000000,
    rank: 4,
    icon: 'B'
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 98.23,
    change24h: 5.67,
    changePercent24h: 6.13,
    marketCap: 42000000000,
    volume24h: 2400000000,
    rank: 5,
    icon: '◎'
  },
  {
    id: 'xrp',
    name: 'XRP',
    symbol: 'XRP',
    price: 0.625,
    change24h: 0.034,
    changePercent24h: 5.75,
    marketCap: 34000000000,
    volume24h: 1800000000,
    rank: 6,
    icon: 'X'
  },
  {
    id: 'usdc',
    name: 'USD Coin',
    symbol: 'USDC',
    price: 1.000,
    change24h: 0.0001,
    changePercent24h: 0.01,
    marketCap: 32000000000,
    volume24h: 5600000000,
    rank: 7,
    icon: '$'
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.485,
    change24h: 0.023,
    changePercent24h: 4.98,
    marketCap: 17000000000,
    volume24h: 890000000,
    rank: 8,
    icon: '₳'
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 36.84,
    change24h: -1.42,
    changePercent24h: -3.71,
    marketCap: 14500000000,
    volume24h: 650000000,
    rank: 9,
    icon: 'A'
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.082,
    change24h: 0.004,
    changePercent24h: 5.12,
    marketCap: 11800000000,
    volume24h: 420000000,
    rank: 10,
    icon: 'D'
  },
  {
    id: 'chainlink',
    name: 'Chainlink',
    symbol: 'LINK',
    price: 14.67,
    change24h: 0.85,
    changePercent24h: 6.15,
    marketCap: 8600000000,
    volume24h: 340000000,
    rank: 11,
    icon: '⬢'
  },
  {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    price: 0.89,
    change24h: 0.045,
    changePercent24h: 5.33,
    marketCap: 8200000000,
    volume24h: 380000000,
    rank: 12,
    icon: 'M'
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    symbol: 'LTC',
    price: 72.34,
    change24h: -2.15,
    changePercent24h: -2.89,
    marketCap: 5400000000,
    volume24h: 290000000,
    rank: 13,
    icon: 'Ł'
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    price: 6.78,
    change24h: 0.34,
    changePercent24h: 5.27,
    marketCap: 5100000000,
    volume24h: 185000000,
    rank: 14,
    icon: '●'
  },
  {
    id: 'tron',
    name: 'TRON',
    symbol: 'TRX',
    price: 0.105,
    change24h: 0.008,
    changePercent24h: 8.25,
    marketCap: 9200000000,
    volume24h: 950000000,
    rank: 15,
    icon: 'T'
  },
  {
    id: 'wrapped-bitcoin',
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    price: 42335.67,
    change24h: 1245.20,
    changePercent24h: 3.03,
    marketCap: 6700000000,
    volume24h: 145000000,
    rank: 16,
    icon: '₿'
  },
  {
    id: 'uniswap',
    name: 'Uniswap',
    symbol: 'UNI',
    price: 6.45,
    change24h: 0.23,
    changePercent24h: 3.70,
    marketCap: 4900000000,
    volume24h: 98000000,
    rank: 17,
    icon: '🦄'
  },
  {
    id: 'cosmos',
    name: 'Cosmos',
    symbol: 'ATOM',
    price: 10.56,
    change24h: 0.67,
    changePercent24h: 6.78,
    marketCap: 4100000000,
    volume24h: 125000000,
    rank: 18,
    icon: '⚛'
  },
  {
    id: 'stellar',
    name: 'Stellar',
    symbol: 'XLM',
    price: 0.125,
    change24h: 0.009,
    changePercent24h: 7.75,
    marketCap: 3600000000,
    volume24h: 87000000,
    rank: 19,
    icon: '✦'
  },
  {
    id: 'ethereum-classic',
    name: 'Ethereum Classic',
    symbol: 'ETC',
    price: 20.45,
    change24h: -0.95,
    changePercent24h: -4.44,
    marketCap: 3100000000,
    volume24h: 165000000,
    rank: 20,
    icon: 'Ξ'
  }
];

// Generate mock chart data for a cryptocurrency
export const generateMockChartData = (crypto: Cryptocurrency, days: number = 30): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const now = Date.now();
  const msPerDay = 24 * 60 * 60 * 1000;
  
  let currentPrice = crypto.price * 0.9; // Start 10% lower than current price
  
  for (let i = days; i >= 0; i--) {
    const timestamp = now - (i * msPerDay);
    
    // Add some realistic price movement
    const volatility = crypto.symbol === 'BTC' ? 0.05 : 0.08; // Bitcoin less volatile
    const change = (Math.random() - 0.5) * volatility;
    currentPrice = currentPrice * (1 + change);
    
    // Ensure we end up close to the current price
    if (i === 0) {
      currentPrice = crypto.price;
    }
    
    const volume = crypto.volume24h * (0.5 + Math.random() * 0.5);
    
    data.push({
      timestamp,
      price: currentPrice,
      volume
    });
  }
  
  return data;
};

// Portfolio holding interface
export interface PortfolioHolding {
  cryptoId: string;
  symbol: string;
  amount: number;
  averagePrice: number;
  currentValue: number;
}

// Trade interface
export interface Trade {
  id: string;
  cryptoId: string;
  symbol: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  total: number;
  timestamp: number;
}