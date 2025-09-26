import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="text-center text-sm text-muted-foreground">
          © {currentYear} Decrypters. All rights reserved.
        </div>
      </div>
    </footer>
  );
};