import React, { useRef } from 'react';
import { validateImageSize, readFileAsDataURL } from '@/utils/imageProcessing';

interface LogoUploaderProps {
  logoUrl?: string;
  onLogoChange: (url: string | undefined) => void;
}

export const LogoUploader: React.FC<LogoUploaderProps> = ({
  logoUrl,
  onLogoChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // التحقق من الحجم
    if (!validateImageSize(file, 5)) {
      alert('حجم الملف كبير جداً! الحد الأقصى 5 ميجابايت.');
      return;
    }

    // التحقق من النوع
    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح.');
      return;
    }

    try {
      const dataUrl = await readFileAsDataURL(file);
      onLogoChange(dataUrl);
    } catch (error) {
      alert('فشل تحميل الصورة. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleRemove = () => {
    onLogoChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-text-dark mb-2">
        شعار الكلية/القسم (اختياري)
      </label>

      {logoUrl ? (
        <div className="border-2 border-border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center gap-4">
            <img
              src={logoUrl}
              alt="شعار الكلية"
              className="w-20 h-20 object-contain border border-gray-300 rounded"
            />
            <div className="flex-1">
              <p className="text-sm text-text-dark mb-2">الشعار محمّل</p>
              <button
                onClick={handleRemove}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
              >
                ✕ إزالة الشعار
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="logo-upload"
          />
          <label
            htmlFor="logo-upload"
            className="block w-full px-4 py-6 border-2 border-dashed border-border rounded-lg text-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="text-3xl mb-2 block">📁</span>
            <span className="text-sm text-text-dark font-medium">
              انقر لرفع الشعار
            </span>
            <span className="text-xs text-text-light block mt-1">
              PNG, JPG, WebP (حد أقصى 5 ميجابايت)
            </span>
          </label>
        </div>
      )}
    </div>
  );
};
