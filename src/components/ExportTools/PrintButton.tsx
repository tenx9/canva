import React from 'react';
import { printCard } from '@/utils/exportHelpers';

export const PrintButton: React.FC = () => {
  const handlePrint = () => {
    printCard();
  };

  return (
    <button
      onClick={handlePrint}
      className="export-buttons flex-1 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
    >
      <span className="mr-2">🖨️</span>
      طباعة
    </button>
  );
};
