import React from 'react';
import { useGemini } from '@/hooks/useGemini';

interface BackgroundGeneratorProps {
  onBackgroundGenerated: (url: string) => void;
}

export const BackgroundGenerator: React.FC<BackgroundGeneratorProps> = ({
  onBackgroundGenerated,
}) => {
  const { fetchBackground, isLoading, error } = useGemini();
  const colorPalette = ['green', 'gray'];

  const handleGenerate = async () => {
    const url = await fetchBackground({ colorPalette, style: 'professional' });
    if (url) {
      onBackgroundGenerated(url);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-text-dark mb-2">
        خلفية الدعوة
      </label>

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full px-4 py-3 bg-primary-green text-white rounded-lg hover:bg-primary-dark-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {isLoading ? (
          <>
            <span className="animate-spin inline-block mr-2">⏳</span>
            جاري التوليد...
          </>
        ) : (
          <>
            <span className="mr-2">🎨</span>
            توليد خلفية بالـ AI
          </>
        )}
      </button>

      {error && (
        <p className="text-xs text-red-500 mt-2">{error}</p>
      )}

      <p className="text-xs text-text-light mt-2">
        💡 سيتم توليد خلفية مموهة احترافية مناسبة للدعوة
      </p>
    </div>
  );
};
