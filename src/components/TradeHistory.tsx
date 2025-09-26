import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { History, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Trade, mockCryptocurrencies } from './mockData';

export const TradeHistory: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const savedTrades = JSON.parse(localStorage.getItem('trades') || '[]');
    setTrades(savedTrades);
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

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (trades.length === 0) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <History className="h-5 w-5" />
              <span>Trade History</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No trades yet</h3>
              <p className="text-muted-foreground">
                Your trading history will appear here once you start trading
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
          <CardTitle className="flex items-center space-x-2">
            <History className="h-5 w-5" />
            <span>Trade History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trades.map((trade) => {
              const crypto = mockCryptocurrencies.find(c => c.id === trade.cryptoId);
              if (!crypto) return null;

              return (
                <div
                  key={trade.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg">
                      {crypto.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{crypto.name}</span>
                        <Badge 
                          variant={trade.type === 'buy' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          <div className="flex items-center space-x-1">
                            {trade.type === 'buy' ? (
                              <ArrowDownLeft className="h-3 w-3" />
                            ) : (
                              <ArrowUpRight className="h-3 w-3" />
                            )}
                            <span>{trade.type.toUpperCase()}</span>
                          </div>
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(trade.timestamp)}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-medium">
                      {formatAmount(trade.amount)} {trade.symbol}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      @ {formatPrice(trade.price)}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`font-medium ${
                      trade.type === 'buy' ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {trade.type === 'buy' ? '-' : '+'}
                      {formatPrice(trade.total)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total
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