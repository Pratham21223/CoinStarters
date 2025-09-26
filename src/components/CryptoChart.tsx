import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Cryptocurrency, ChartDataPoint, generateMockChartData } from './mockData';
import { TradingModal } from './TradingModal';

interface CryptoChartProps {
  crypto: Cryptocurrency;
  onBack: () => void;
}

export const CryptoChart: React.FC<CryptoChartProps> = ({ crypto, onBack }) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d' | '90d'>('30d');
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(crypto.price);

  useEffect(() => {
    const days = timeframe === '24h' ? 1 : timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
    const data = generateMockChartData(crypto, days);
    setChartData(data);
  }, [crypto, timeframe]);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const volatility = crypto.symbol === 'USDT' || crypto.symbol === 'USDC' ? 0.001 : 0.02;
      const change = (Math.random() - 0.5) * volatility;
      setCurrentPrice(prev => prev * (1 + change));
    }, 2000);

    return () => clearInterval(interval);
  }, [crypto.symbol]);

  const formatPrice = (price: number) => {
    if (price < 1) {
      return `$${price.toFixed(6)}`;
    } else if (price < 100) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    if (timeframe === '24h') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
          <p className="text-sm text-muted-foreground">{formatDate(label)}</p>
          <p className="text-sm font-medium">
            Price: {formatPrice(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const priceChange = currentPrice - crypto.price;
  const percentChange = (priceChange / crypto.price) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
                <span className="ml-2">Back to Market</span>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl">
                  {crypto.icon}
                </div>
                <div>
                  <CardTitle className="text-2xl">{crypto.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{crypto.symbol}</Badge>
                    <Badge variant="outline">Rank #{crypto.rank}</Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setIsTradeModalOpen(true)} className="bg-green-500 hover:bg-green-600">
                Buy {crypto.symbol}
              </Button>
              <Button variant="outline" onClick={() => setIsTradeModalOpen(true)}>
                Sell {crypto.symbol}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-3xl font-bold">{formatPrice(currentPrice)}</div>
                  <div className="flex items-center space-x-1">
                    {percentChange >= 0 ? (
                      <ArrowUp className="h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowDown className="h-5 w-5 text-red-500" />
                    )}
                    <span className={`text-lg ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2 mb-4">
                  {(['24h', '7d', '30d', '90d'] as const).map((tf) => (
                    <Button
                      key={tf}
                      variant={timeframe === tf ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTimeframe(tf)}
                    >
                      {tf}
                    </Button>
                  ))}
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="timestamp"
                        tickFormatter={formatDate}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis 
                        tickFormatter={(value) => formatPrice(value)}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Market Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Market Cap</div>
                    <div className="text-sm font-medium">
                      ${(crypto.marketCap / 1e9).toFixed(2)}B
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">24h Volume</div>
                    <div className="text-sm font-medium">
                      ${(crypto.volume24h / 1e9).toFixed(2)}B
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">24h Change</div>
                    <div className={`text-sm font-medium ${crypto.changePercent24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {crypto.changePercent24h >= 0 ? '+' : ''}{crypto.changePercent24h.toFixed(2)}%
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Quick Trade</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={() => setIsTradeModalOpen(true)}
                  >
                    Buy {crypto.symbol}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsTradeModalOpen(true)}
                  >
                    Sell {crypto.symbol}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <TradingModal
        crypto={crypto}
        currentPrice={currentPrice}
        isOpen={isTradeModalOpen}
        onClose={() => setIsTradeModalOpen(false)}
      />
    </div>
  );
};