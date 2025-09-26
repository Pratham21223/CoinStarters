import React from 'react';
import { Button } from './ui/button';
import { useAuth } from './AuthContext';
import { LogOut, User, Wallet } from 'lucide-react';
import { Badge } from './ui/badge';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-orange-500">Bitcoin Learner</h1>
          
          <nav className="flex space-x-4">
            <Button
              variant={activeTab === 'market' ? 'default' : 'ghost'}
              onClick={() => onTabChange('market')}
            >
              Market
            </Button>
            <Button
              variant={activeTab === 'portfolio' ? 'default' : 'ghost'}
              onClick={() => onTabChange('portfolio')}
            >
              Portfolio
            </Button>
            <Button
              variant={activeTab === 'trades' ? 'default' : 'ghost'}
              onClick={() => onTabChange('trades')}
            >
              Trade History
            </Button>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Wallet className="h-4 w-4 text-green-500" />
            <Badge variant="secondary" className="text-sm">
              ${user?.balance?.toLocaleString() || '0'}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span className="text-sm">{user?.name}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={logout}
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};