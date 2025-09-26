import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowUp, ArrowDown, Wallet, TrendingUp } from 'lucide-react';
import { mockCryptocurrencies, PortfolioHolding } from './mockData';

export const Portfolio: React.FC = () => {
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const updatePortfolio = () => {
      const savedPortfolio = JSON.parse(localStorage.getItem('portfolio') || '[]');
      
      const updatedHoldings = savedPortfolio.map((holding: any) => {
        const crypto = mockCryptocurrencies.find(c => c.id === holding.cryptoId);
        if (!crypto) return holding;

        const currentValue = holding.amount * crypto.price;
        const profitLoss = currentValue - (holding.amount * holding.averagePrice);
        const profitLossPercent = (profitLoss / (holding.amount * holding.averagePrice)) * 100;

        return {
          ...holding,
          currentValue,
          currentPrice: crypto.price,
          profitLoss,
          profitLossPercent
        };
      });

      setHoldings(updatedHoldings);
      
      const total = updatedHoldings.reduce((sum: number, holding: any) => sum + holding.currentValue, 0);
      setTotalValue(total);
    };

    updatePortfolio();
    const interval = setInterval(updatePortfolio, 3000); // Update every 3 seconds

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

  const formatAmount = (amount: number) => {
    if (amount < 1) {
      return amount.toFixed(6);
    }
    return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 });
  };

  if (holdings.length === 0) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wallet className="h-5 w-5" />
              <span>Portfolio</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No holdings yet</h3>
              <p className="text-muted-foreground">
                Start trading cryptocurrencies to build your portfolio
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5" />
              <span>Portfolio</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{formatPrice(totalValue)}</div>
              <div className="text-sm text-muted-foreground">Total Value</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {holdings.map((holding: any) => {
              const crypto = mockCryptocurrencies.find(c => c.id === holding.cryptoId);
              if (!crypto) return null;

              return (
                <div
                  key={holding.cryptoId}
                  className="flex items-center justify-between p-4 rounded-lg border border-border"
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
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatAmount(holding.amount)} {crypto.symbol}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-medium">{formatPrice(holding.currentValue)}</div>
                    <div className="text-sm text-muted-foreground">
                      Avg: {formatPrice(holding.averagePrice)}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      {holding.profitLoss >= 0 ? (
                        <ArrowUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm ${
                          holding.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {holding.profitLoss >= 0 ? '+' : ''}
                        {formatPrice(Math.abs(holding.profitLoss))}
                      </span>
                    </div>
                    <div
                      className={`text-xs ${
                        holding.profitLossPercent >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {holding.profitLossPercent >= 0 ? '+' : ''}
                      {holding.profitLossPercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};