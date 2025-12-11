import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

/**
 * تحويل التاريخ إلى اسم اليوم بالعربية
 */
export function getDayNameInArabic(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'EEEE', { locale: ar });
}

/**
 * تنسيق التاريخ بالعربية (مثال: 2023/03/29)
 */
export function formatDateInArabic(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'yyyy/MM/dd', { locale: ar });
}

/**
 * تنسيق التاريخ بشكل كامل مع اسم اليوم
 * مثال: "الأربعاء 2023/03/29"
 */
export function formatFullDateInArabic(date: Date | string): string {
  const dayName = getDayNameInArabic(date);
  const formattedDate = formatDateInArabic(date);
  return `${dayName} ${formattedDate}`;
}

/**
 * تنسيق الوقت (مثال: "10:00 صباحاً")
 */
export function formatTimeInArabic(time: string): string {
  if (!time) return '';

  const [hours, minutes] = time.split(':').map(Number);
  const isPM = hours >= 12;
  const hours12 = hours % 12 || 12;
  const period = isPM ? 'مساءً' : 'صباحاً';

  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * تنسيق فترة زمنية (من - إلى)
 */
export function formatTimeRange(timeStart: string, timeEnd: string): string {
  if (!timeStart || !timeEnd) return '';

  const startFormatted = formatTimeInArabic(timeStart);
  const endFormatted = formatTimeInArabic(timeEnd);

  return `${startFormatted} - ${endFormatted}`;
}
