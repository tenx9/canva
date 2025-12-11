import React, { useState } from 'react';
import { exportAsPNG } from '@/utils/exportHelpers';

interface ExportButtonProps {
  cardRef: React.RefObject<HTMLDivElement>;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ cardRef }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!cardRef.current) {
      alert('لا يمكن تصدير البطاقة في الوقت الحالي');
      return;
    }

    setIsExporting(true);
    try {
      await exportAsPNG(cardRef.current, 'invitation.png', { format: 'png', scale: 2, quality: 1 });
    } catch (error) {
      console.error('Export error:', error);
      alert('فشل التصدير. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="export-buttons flex-1 px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-primary-dark-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
    >
      {isExporting ? (
        <>
          <span className="animate-spin inline-block mr-2">⏳</span>
          جاري التصدير...
        </>
      ) : (
        <>
          <span className="mr-2">💾</span>
          تصدير كـ PNG
        </>
      )}
    </button>
  );
};
