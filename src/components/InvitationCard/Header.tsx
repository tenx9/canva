import React from 'react';

interface HeaderProps {
  logoUrl?: string;
  showLogo: boolean;
}

export const Header: React.FC<HeaderProps> = ({ logoUrl, showLogo }) => {
  return (
    <div className="flex items-start justify-between mb-6 print:mb-4">
      {/* شعار الكلية/القسم - اختياري */}
      <div className="w-20 h-20">
        {showLogo && logoUrl && (
          <img
            src={logoUrl}
            alt="شعار الكلية"
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* شعار "دعوة" في المنتصف */}
      <div className="flex-1 flex justify-center">
        <div className="bg-primary-green text-white px-6 py-2 rounded-lg text-2xl font-bold">
          دعــــوة
        </div>
      </div>

      {/* شعار الجامعة الإسلامية - ثابت */}
      <div className="w-20 h-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-1">
            <span className="text-xs font-bold text-gray-600">IUG</span>
          </div>
          <p className="text-xs text-gray-600">الجامعة الإسلامية</p>
        </div>
      </div>
    </div>
  );
};
