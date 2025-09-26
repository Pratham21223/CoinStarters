import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Cryptocurrency } from './mockData';
import { useAuth } from './AuthContext';
import { toast } from 'sonner@2.0.3';

interface TradingModalProps {
  crypto: Cryptocurrency;
  currentPrice: number;
  isOpen: boolean;
  onClose: () => void;
}

export const TradingModal: React.FC<TradingModalProps> = ({
  crypto,
  currentPrice,
  isOpen,
  onClose
}) => {
  const { user, updateBalance } = useAuth();
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [activeTab, setActiveTab] = useState('buy');

  const formatPrice = (price: number) => {
    if (price < 1) {
      return `$${price.toFixed(6)}`;
    } else if (price < 100) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  };

  const calculateBuyTotal = () => {
    const amount = parseFloat(buyAmount) || 0;
    return amount * currentPrice;
  };

  const calculateSellTotal = () => {
    const amount = parseFloat(sellAmount) || 0;
    return amount * currentPrice;
  };

  const handleBuy = () => {
    const amount = parseFloat(buyAmount);
    const total = calculateBuyTotal();

    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!user || user.balance < total) {
      toast.error('Insufficient balance');
      return;
    }

    // Update user balance
    updateBalance(user.balance - total);

    // Store the trade in localStorage (in a real app, this would be sent to a backend)
    const trade = {
      id: Date.now().toString(),
      cryptoId: crypto.id,
      symbol: crypto.symbol,
      type: 'buy' as const,
      amount,
      price: currentPrice,
      total,
      timestamp: Date.now()
    };

    const existingTrades = JSON.parse(localStorage.getItem('trades') || '[]');
    localStorage.setItem('trades', JSON.stringify([trade, ...existingTrades]));

    // Update portfolio
    const existingPortfolio = JSON.parse(localStorage.getItem('portfolio') || '[]');
    const existingHolding = existingPortfolio.find((h: any) => h.cryptoId === crypto.id);

    if (existingHolding) {
      const totalAmount = existingHolding.amount + amount;
      const totalValue = existingHolding.amount * existingHolding.averagePrice + total;
      existingHolding.amount = totalAmount;
      existingHolding.averagePrice = totalValue / totalAmount;
    } else {
      existingPortfolio.push({
        cryptoId: crypto.id,
        symbol: crypto.symbol,
        amount,
        averagePrice: currentPrice,
        currentValue: total
      });
    }

    localStorage.setItem('portfolio', JSON.stringify(existingPortfolio));

    toast.success(`Successfully bought ${amount} ${crypto.symbol}`);
    setBuyAmount('');
    onClose();
  };

  const handleSell = () => {
    const amount = parseFloat(sellAmount);
    const total = calculateSellTotal();

    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    // Check if user has enough of this cryptocurrency
    const portfolio = JSON.parse(localStorage.getItem('portfolio') || '[]');
    const holding = portfolio.find((h: any) => h.cryptoId === crypto.id);

    if (!holding || holding.amount < amount) {
      toast.error(`Insufficient ${crypto.symbol} balance`);
      return;
    }

    // Update user balance
    if (user) {
      updateBalance(user.balance + total);
    }

    // Store the trade
    const trade = {
      id: Date.now().toString(),
      cryptoId: crypto.id,
      symbol: crypto.symbol,
      type: 'sell' as const,
      amount,
      price: currentPrice,
      total,
      timestamp: Date.now()
    };

    const existingTrades = JSON.parse(localStorage.getItem('trades') || '[]');
    localStorage.setItem('trades', JSON.stringify([trade, ...existingTrades]));

    // Update portfolio
    holding.amount -= amount;
    if (holding.amount <= 0) {
      const updatedPortfolio = portfolio.filter((h: any) => h.cryptoId !== crypto.id);
      localStorage.setItem('portfolio', JSON.stringify(updatedPortfolio));
    } else {
      localStorage.setItem('portfolio', JSON.stringify(portfolio));
    }

    toast.success(`Successfully sold ${amount} ${crypto.symbol}`);
    setSellAmount('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span className="text-2xl">{crypto.icon}</span>
            <span>Trade {crypto.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Current Price</div>
                  <div className="text-lg font-semibold">{formatPrice(currentPrice)}</div>
                </div>
                <Badge variant="secondary">{crypto.symbol}</Badge>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="sell">Sell</TabsTrigger>
            </TabsList>

            <TabsContent value="buy" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="buy-amount">Amount ({crypto.symbol})</Label>
                <Input
                  id="buy-amount"
                  type="number"
                  placeholder="0.00"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  step="any"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label>Total Cost (USD)</Label>
                <div className="text-lg font-semibold p-3 bg-muted rounded-md">
                  ${calculateBuyTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                Available Balance: ${user?.balance?.toLocaleString() || '0'}
              </div>

              <Button 
                onClick={handleBuy} 
                className="w-full bg-green-500 hover:bg-green-600"
                disabled={!buyAmount || calculateBuyTotal() > (user?.balance || 0)}
              >
                Buy {crypto.symbol}
              </Button>
            </TabsContent>

            <TabsContent value="sell" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sell-amount">Amount ({crypto.symbol})</Label>
                <Input
                  id="sell-amount"
                  type="number"
                  placeholder="0.00"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  step="any"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label>Total Value (USD)</Label>
                <div className="text-lg font-semibold p-3 bg-muted rounded-md">
                  ${calculateSellTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                Available: {(() => {
                  const portfolio = JSON.parse(localStorage.getItem('portfolio') || '[]');
                  const holding = portfolio.find((h: any) => h.cryptoId === crypto.id);
                  return holding ? holding.amount.toFixed(6) : '0';
                })()} {crypto.symbol}
              </div>

              <Button 
                onClick={handleSell} 
                className="w-full"
                variant="outline"
                disabled={!sellAmount}
              >
                Sell {crypto.symbol}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};