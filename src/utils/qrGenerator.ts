/**
 * توليد QR Code من رابط
 * ملاحظة: سنستخدم مكتبة qrcode.react في المكون نفسه
 * هذا الملف يحتوي على دوال مساعدة للـ QR Code
 */

/**
 * التحقق من صحة الرابط
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * تنسيق الرابط (إضافة https:// إذا لزم الأمر)
 */
export function formatUrl(url: string): string {
  if (!url) return '';

  const trimmed = url.trim();

  // إذا كان يبدأ بـ http:// أو https://
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  // إضافة https:// افتراضياً
  return `https://${trimmed}`;
}

/**
 * اختصار الرابط للعرض
 */
export function shortenUrl(url: string, maxLength: number = 50): string {
  if (!url || url.length <= maxLength) return url;

  return `${url.substring(0, maxLength)}...`;
}
