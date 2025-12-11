import html2canvas from 'html2canvas';
import type { ExportOptions } from '@/types/invitation.types';

/**
 * تصدير العنصر كصورة PNG
 */
export async function exportAsPNG(
  element: HTMLElement,
  fileName: string = 'invitation.png',
  options: ExportOptions = { format: 'png' }
): Promise<void> {
  try {
    const { quality = 1, scale = 2 } = options;

    // إخفاء أي عناصر تحكم
    hideControlElements();

    // التقاط العنصر
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: scale,
      useCORS: true, // للصور الخارجية
      logging: false,
      imageTimeout: 0,
      allowTaint: true,
    });

    // إعادة إظهار عناصر التحكم
    showControlElements();

    // تحويل إلى صورة
    const image = canvas.toDataURL('image/png', quality);

    // تحميل الصورة
    downloadImage(image, fileName);
  } catch (error) {
    console.error('Error exporting as PNG:', error);
    showControlElements(); // التأكد من إعادة العناصر حتى في حالة الخطأ
    throw new Error('فشل تصدير الصورة. يرجى المحاولة مرة أخرى.');
  }
}

/**
 * طباعة البطاقة
 */
export function printCard(): void {
  window.print();
}

/**
 * تحميل الصورة
 */
function downloadImage(dataUrl: string, fileName: string): void {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * إخفاء عناصر التحكم قبل التصدير
 */
function hideControlElements(): void {
  const controlElements = document.querySelectorAll(
    '.control-panel, .export-buttons, .no-print'
  );
  controlElements.forEach((el) => {
    (el as HTMLElement).style.display = 'none';
  });
}

/**
 * إعادة إظهار عناصر التحكم بعد التصدير
 */
function showControlElements(): void {
  const controlElements = document.querySelectorAll(
    '.control-panel, .export-buttons, .no-print'
  );
  controlElements.forEach((el) => {
    (el as HTMLElement).style.display = '';
  });
}

/**
 * معاينة قبل الطباعة
 */
export function previewPrint(): void {
  // فتح نافذة معاينة الطباعة
  window.print();
}
