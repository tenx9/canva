// Department types
export type DepartmentId = 'business' | 'accounting' | 'economics' | 'dean';

export interface Department {
  id: DepartmentId;
  name: string;
}

// Speaker types
export interface Speaker {
  id: string;
  name: string;
  title?: string; // د. / أ.د. / م. / etc.
}

export interface SpeakersConfig {
  enabled: boolean;
  speakers: Speaker[];
}

// Meeting types
export type MeetingType = 'physical' | 'online';

export interface MeetingLocation {
  type: MeetingType;
  location?: string;  // للقاءات الفيزيائية
  link?: string;      // للقاءات الأونلاين
  qrCode?: string;    // يُولّد تلقائياً من الرابط
}

// Background image editor types
export type PatternType = 'none' | 'dots' | 'lines' | 'circles' | 'grid';

export interface ImageEditorControls {
  // Color adjustments
  hue: number;           // 0-360
  saturation: number;    // 0-200
  brightness: number;    // -100 to 100
  contrast: number;      // 0-200

  // Blur
  blur: number;          // 0-20 (px)

  // Pattern overlay
  pattern: PatternType;
  patternOpacity: number; // 0-100

  // Transform
  scale: number;         // 0.5-3
  position: { x: number; y: number };
  rotation: number;      // 0-360
}

// Logo configuration
export interface LogoConfig {
  enabled: boolean;
  url?: string;
  file?: File;
}

// Main invitation data structure
export interface InvitationData {
  // Basic info
  department: DepartmentId;
  title: string;

  // Date & Time
  date: string;
  dayName?: string;  // يُحسب تلقائياً
  timeStart: string;
  timeEnd: string;

  // Location
  meeting: MeetingLocation;

  // Speakers
  speakers: SpeakersConfig;

  // Visual customization
  logo: LogoConfig;
  backgroundImage?: string;
  backgroundEditor?: ImageEditorControls;
}

// AI-related types
export interface TitleSuggestion {
  titles: string[];
}

export interface AIGenerationOptions {
  colorPalette?: string[];
  style?: string;
  aspectRatio?: '16:9' | '4:3' | 'square';
}

// Export types
export type ExportFormat = 'png' | 'jpeg' | 'pdf';

export interface ExportOptions {
  format: ExportFormat;
  quality?: number;  // 0-1
  scale?: number;    // حجم التصدير
}
