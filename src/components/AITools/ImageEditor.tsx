import React from 'react';
import type { ImageEditorControls, PatternType } from '@/types/invitation.types';

interface ImageEditorProps {
  controls: ImageEditorControls;
  onControlChange: (updates: Partial<ImageEditorControls>) => void;
  hasImage: boolean;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({
  controls,
  onControlChange,
  hasImage,
}) => {
  if (!hasImage) {
    return null;
  }

  return (
    <div className="mb-6 border-2 border-border rounded-lg p-4 bg-gray-50">
      <h3 className="text-sm font-semibold text-text-dark mb-3">
        محرر الخلفية
      </h3>

      <div className="space-y-4">
        {/* Blur */}
        <div>
          <label className="block text-xs font-medium text-text-dark mb-1">
            تمويه: {controls.blur}px
          </label>
          <input
            type="range"
            min="0"
            max="20"
            value={controls.blur}
            onChange={(e) => onControlChange({ blur: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        {/* Brightness */}
        <div>
          <label className="block text-xs font-medium text-text-dark mb-1">
            السطوع: {controls.brightness}
          </label>
          <input
            type="range"
            min="-100"
            max="100"
            value={controls.brightness}
            onChange={(e) => onControlChange({ brightness: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        {/* Contrast */}
        <div>
          <label className="block text-xs font-medium text-text-dark mb-1">
            التباين: {controls.contrast}%
          </label>
          <input
            type="range"
            min="0"
            max="200"
            value={controls.contrast}
            onChange={(e) => onControlChange({ contrast: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        {/* Saturation */}
        <div>
          <label className="block text-xs font-medium text-text-dark mb-1">
            التشبع: {controls.saturation}%
          </label>
          <input
            type="range"
            min="0"
            max="200"
            value={controls.saturation}
            onChange={(e) => onControlChange({ saturation: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        {/* Pattern */}
        <div>
          <label className="block text-xs font-medium text-text-dark mb-1">
            النمط
          </label>
          <select
            value={controls.pattern}
            onChange={(e) => onControlChange({ pattern: e.target.value as PatternType })}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm"
          >
            <option value="none">بدون</option>
            <option value="dots">نقاط</option>
            <option value="lines">خطوط</option>
            <option value="circles">دوائر</option>
            <option value="grid">شبكة</option>
          </select>
        </div>

        {/* Scale */}
        <div>
          <label className="block text-xs font-medium text-text-dark mb-1">
            التكبير: {controls.scale.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={controls.scale}
            onChange={(e) => onControlChange({ scale: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        {/* Reset button */}
        <button
          onClick={() =>
            onControlChange({
              blur: 0,
              brightness: 0,
              contrast: 100,
              saturation: 100,
              hue: 0,
              pattern: 'none',
              patternOpacity: 50,
              scale: 1,
              position: { x: 0, y: 0 },
              rotation: 0,
            })
          }
          className="w-full px-3 py-2 bg-gray-200 text-text-dark rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
        >
          ↺ إعادة تعيين
        </button>
      </div>
    </div>
  );
};
