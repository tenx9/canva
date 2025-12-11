import { useState, useEffect, useCallback } from 'react';
import type { InvitationData, DepartmentId, Speaker, MeetingType, ImageEditorControls } from '@/types/invitation.types';
import { getDayNameInArabic } from '@/utils/dateHelpers';
import { DEFAULT_IMAGE_CONTROLS } from '@/utils/imageProcessing';

// البيانات الافتراضية
const DEFAULT_INVITATION_DATA: InvitationData = {
  department: 'dean',
  title: '',
  date: new Date().toISOString().split('T')[0], // تاريخ اليوم
  dayName: getDayNameInArabic(new Date()),
  timeStart: '10:00',
  timeEnd: '12:00',
  meeting: {
    type: 'physical',
    location: '',
  },
  speakers: {
    enabled: false,
    speakers: [],
  },
  logo: {
    enabled: false,
  },
  backgroundImage: undefined,
  backgroundEditor: DEFAULT_IMAGE_CONTROLS,
};

// مفتاح التخزين المحلي
const STORAGE_KEY = 'invitation_data';

export function useInvitationData() {
  const [data, setData] = useState<InvitationData>(() => {
    // محاولة تحميل البيانات من LocalStorage
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // تحديث اسم اليوم بناءً على التاريخ المحفوظ
        if (parsed.date) {
          parsed.dayName = getDayNameInArabic(parsed.date);
        }
        return { ...DEFAULT_INVITATION_DATA, ...parsed };
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
    return DEFAULT_INVITATION_DATA;
  });

  // حفظ البيانات في LocalStorage عند أي تغيير
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [data]);

  // تحديث القسم
  const setDepartment = useCallback((department: DepartmentId) => {
    setData((prev) => ({ ...prev, department }));
  }, []);

  // تحديث العنوان
  const setTitle = useCallback((title: string) => {
    setData((prev) => ({ ...prev, title }));
  }, []);

  // تحديث التاريخ (مع حساب اسم اليوم تلقائياً)
  const setDate = useCallback((date: string) => {
    const dayName = getDayNameInArabic(date);
    setData((prev) => ({ ...prev, date, dayName }));
  }, []);

  // تحديث وقت البداية
  const setTimeStart = useCallback((timeStart: string) => {
    setData((prev) => ({ ...prev, timeStart }));
  }, []);

  // تحديث وقت النهاية
  const setTimeEnd = useCallback((timeEnd: string) => {
    setData((prev) => ({ ...prev, timeEnd }));
  }, []);

  // تحديث نوع اللقاء
  const setMeetingType = useCallback((type: MeetingType) => {
    setData((prev) => ({
      ...prev,
      meeting: {
        ...prev.meeting,
        type,
        location: type === 'physical' ? prev.meeting.location : undefined,
        link: type === 'online' ? prev.meeting.link : undefined,
        qrCode: type === 'online' ? prev.meeting.qrCode : undefined,
      },
    }));
  }, []);

  // تحديث المكان (للقاءات الفيزيائية)
  const setLocation = useCallback((location: string) => {
    setData((prev) => ({
      ...prev,
      meeting: { ...prev.meeting, location },
    }));
  }, []);

  // تحديث الرابط (للقاءات الأونلاين)
  const setMeetingLink = useCallback((link: string) => {
    setData((prev) => ({
      ...prev,
      meeting: { ...prev.meeting, link },
    }));
  }, []);

  // تفعيل/إلغاء قسم المتحدثين
  const toggleSpeakers = useCallback((enabled: boolean) => {
    setData((prev) => ({
      ...prev,
      speakers: { ...prev.speakers, enabled },
    }));
  }, []);

  // إضافة متحدث
  const addSpeaker = useCallback(() => {
    const newSpeaker: Speaker = {
      id: `speaker-${Date.now()}`,
      name: '',
      title: '',
    };
    setData((prev) => ({
      ...prev,
      speakers: {
        ...prev.speakers,
        speakers: [...prev.speakers.speakers, newSpeaker],
      },
    }));
  }, []);

  // حذف متحدث
  const removeSpeaker = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      speakers: {
        ...prev.speakers,
        speakers: prev.speakers.speakers.filter((s) => s.id !== id),
      },
    }));
  }, []);

  // تحديث بيانات متحدث
  const updateSpeaker = useCallback((id: string, updates: Partial<Speaker>) => {
    setData((prev) => ({
      ...prev,
      speakers: {
        ...prev.speakers,
        speakers: prev.speakers.speakers.map((s) =>
          s.id === id ? { ...s, ...updates } : s
        ),
      },
    }));
  }, []);

  // تحديث الشعار
  const setLogo = useCallback((url: string | undefined) => {
    setData((prev) => ({
      ...prev,
      logo: {
        enabled: !!url,
        url,
      },
    }));
  }, []);

  // تحديث الخلفية
  const setBackgroundImage = useCallback((url: string | undefined) => {
    setData((prev) => ({ ...prev, backgroundImage: url }));
  }, []);

  // تحديث إعدادات محرر الصورة
  const setBackgroundEditor = useCallback((editor: Partial<ImageEditorControls>) => {
    setData((prev) => ({
      ...prev,
      backgroundEditor: { ...prev.backgroundEditor!, ...editor },
    }));
  }, []);

  // إعادة تعيين البيانات
  const reset = useCallback(() => {
    setData(DEFAULT_INVITATION_DATA);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    data,
    setDepartment,
    setTitle,
    setDate,
    setTimeStart,
    setTimeEnd,
    setMeetingType,
    setLocation,
    setMeetingLink,
    toggleSpeakers,
    addSpeaker,
    removeSpeaker,
    updateSpeaker,
    setLogo,
    setBackgroundImage,
    setBackgroundEditor,
    reset,
  };
}
