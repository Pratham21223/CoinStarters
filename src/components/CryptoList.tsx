import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import { mockCryptocurrencies, Cryptocurrency } from './mockData';

interface CryptoListProps {
  onCryptoSelect: (crypto: Cryptocurrency) => void;
}

export const CryptoList: React.FC<CryptoListProps> = ({ onCryptoSelect }) => {
  const [cryptos, setCryptos] = useState<Cryptocurrency[]>(mockCryptocurrencies);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptos(prevCryptos => 
        prevCryptos.map(crypto => {
          const volatility = crypto.symbol === 'USDT' || crypto.symbol === 'USDC' ? 0.001 : 0.02;
          const change = (Math.random() - 0.5) * volatility;
          const newPrice = crypto.price * (1 + change);
          const priceChange = newPrice - crypto.price;
          const percentChange = (priceChange / crypto.price) * 100;

          return {
            ...crypto,
            price: newPrice,
            change24h: crypto.change24h + priceChange,
            changePercent24h: crypto.changePercent24h + percentChange * 0.1 // Smooth the percentage change
          };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    if (price < 1) {
      return `$${price.toFixed(6)}`;
    } else if (price < 100) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `$${marketCap.toLocaleString()}`;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Top 20 Cryptocurrencies</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {cryptos.map((crypto) => (
              <div
                key={crypto.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => onCryptoSelect(crypto)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg">
                    {crypto.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{crypto.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {crypto.symbol}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        #{crypto.rank}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Market Cap: {formatMarketCap(crypto.marketCap)}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-medium">{formatPrice(crypto.price)}</div>
                  <div className="flex items-center space-x-1">
                    {crypto.changePercent24h >= 0 ? (
                      <ArrowUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm ${
                        crypto.changePercent24h >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {crypto.changePercent24h >= 0 ? '+' : ''}
                      {crypto.changePercent24h.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  View Chart
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};