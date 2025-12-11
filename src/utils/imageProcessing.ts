import type { ImageEditorControls } from '@/types/invitation.types';

/**
 * تطبيق تعديلات الصورة على شكل CSS Filters
 */
export function applyImageFilters(controls: ImageEditorControls): string {
  const filters: string[] = [];

  // Brightness
  if (controls.brightness !== 0) {
    const brightnessValue = 100 + controls.brightness;
    filters.push(`brightness(${brightnessValue}%)`);
  }

  // Contrast
  if (controls.contrast !== 100) {
    filters.push(`contrast(${controls.contrast}%)`);
  }

  // Saturation
  if (controls.saturation !== 100) {
    filters.push(`saturate(${controls.saturation}%)`);
  }

  // Hue rotation
  if (controls.hue !== 0) {
    filters.push(`hue-rotate(${controls.hue}deg)`);
  }

  // Blur
  if (controls.blur > 0) {
    filters.push(`blur(${controls.blur}px)`);
  }

  return filters.length > 0 ? filters.join(' ') : 'none';
}

/**
 * تطبيق التحويلات (Transform) على الصورة
 */
export function applyImageTransform(controls: ImageEditorControls): string {
  const transforms: string[] = [];

  // Scale
  if (controls.scale !== 1) {
    transforms.push(`scale(${controls.scale})`);
  }

  // Translate (Position)
  if (controls.position.x !== 0 || controls.position.y !== 0) {
    transforms.push(`translate(${controls.position.x}px, ${controls.position.y}px)`);
  }

  // Rotation
  if (controls.rotation !== 0) {
    transforms.push(`rotate(${controls.rotation}deg)`);
  }

  return transforms.length > 0 ? transforms.join(' ') : 'none';
}

/**
 * توليد Pattern SVG بناءً على النوع
 */
export function generatePatternSVG(
  type: 'dots' | 'lines' | 'circles' | 'grid',
  opacity: number
): string {
  const opacityValue = opacity / 100;

  const patterns = {
    dots: `
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="2" fill="white" opacity="${opacityValue}" />
      </svg>
    `,
    lines: `
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="0" x2="20" y2="20" stroke="white" stroke-width="1" opacity="${opacityValue}" />
      </svg>
    `,
    circles: `
      <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="15" stroke="white" stroke-width="1" fill="none" opacity="${opacityValue}" />
      </svg>
    `,
    grid: `
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="20" height="20" stroke="white" stroke-width="1" fill="none" opacity="${opacityValue}" />
      </svg>
    `,
  };

  const svgString = patterns[type];
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
}

/**
 * التحقق من حجم الصورة
 */
export function validateImageSize(file: File, maxSizeMB: number = 5): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

/**
 * قراءة الملف كـ Data URL
 */
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('فشل قراءة الملف'));
      }
    };
    reader.onerror = () => reject(new Error('فشل قراءة الملف'));
    reader.readAsDataURL(file);
  });
}

/**
 * الحصول على الأبعاد الافتراضية للصورة
 */
export const DEFAULT_IMAGE_CONTROLS: ImageEditorControls = {
  hue: 0,
  saturation: 100,
  brightness: 0,
  contrast: 100,
  blur: 0,
  pattern: 'none',
  patternOpacity: 50,
  scale: 1,
  position: { x: 0, y: 0 },
  rotation: 0,
};
