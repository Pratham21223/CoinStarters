import React, { useState } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { AuthForms } from './components/AuthForms';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CryptoList } from './components/CryptoList';
import { CryptoChart } from './components/CryptoChart';
import { Portfolio } from './components/Portfolio';
import { TradeHistory } from './components/TradeHistory';
import { Toaster } from './components/ui/sonner';
import { Cryptocurrency } from './components/mockData';

function AppContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('market');
  const [selectedCrypto, setSelectedCrypto] = useState<Cryptocurrency | null>(null);

  if (!user) {
    return <AuthForms />;
  }

  const renderContent = () => {
    if (selectedCrypto) {
      return (
        <CryptoChart 
          crypto={selectedCrypto} 
          onBack={() => setSelectedCrypto(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'market':
        return <CryptoList onCryptoSelect={setSelectedCrypto} />;
      case 'portfolio':
        return <Portfolio />;
      case 'trades':
        return <TradeHistory />;
      default:
        return <CryptoList onCryptoSelect={setSelectedCrypto} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1">
        {renderContent()}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}