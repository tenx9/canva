import React, { forwardRef } from 'react';
import type { InvitationData } from '@/types/invitation.types';
import { Header } from './Header';
import { SpeakersSection } from './SpeakersSection';
import { DetailsSection } from './DetailsSection';
import { EditableText } from './EditableText';
import { applyImageFilters, applyImageTransform, generatePatternSVG } from '@/utils/imageProcessing';

interface InvitationCardProps {
  data: InvitationData;
  onUpdateTitle: (title: string) => void;
  onUpdateSpeaker: (id: string, updates: any) => void;
  onUpdateLocation: (location: string) => void;
  onUpdateLink: (link: string) => void;
}

// قائمة الأقسام
const DEPARTMENTS = {
  business: 'إدارة الأعمال',
  accounting: 'المحاسبة',
  economics: 'الاقتصاد',
  dean: 'عمادة كلية الاقتصاد والعلوم الإدارية',
};

export const InvitationCard = forwardRef<HTMLDivElement, InvitationCardProps>(
  ({ data, onUpdateTitle, onUpdateSpeaker, onUpdateLocation, onUpdateLink }, ref) => {
    const departmentName = DEPARTMENTS[data.department];

    // تطبيق التأثيرات على الخلفية
    const backgroundStyle: React.CSSProperties = {};
    if (data.backgroundImage) {
      const filters = data.backgroundEditor
        ? applyImageFilters(data.backgroundEditor)
        : 'none';
      const transform = data.backgroundEditor
        ? applyImageTransform(data.backgroundEditor)
        : 'none';

      backgroundStyle.backgroundImage = `url(${data.backgroundImage})`;
      backgroundStyle.backgroundSize = 'cover';
      backgroundStyle.backgroundPosition = 'center';
      backgroundStyle.filter = filters;
      backgroundStyle.transform = transform;
    }

    // Pattern overlay
    const patternStyle: React.CSSProperties = {};
    if (data.backgroundEditor && data.backgroundEditor.pattern !== 'none') {
      const patternUrl = generatePatternSVG(
        data.backgroundEditor.pattern,
        data.backgroundEditor.patternOpacity
      );
      patternStyle.backgroundImage = `url(${patternUrl})`;
      patternStyle.backgroundRepeat = 'repeat';
    }

    return (
      <div
        ref={ref}
        className="relative w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden print:shadow-none print:rounded-none"
        style={{ aspectRatio: '16/9', minHeight: '600px' }}
      >
        {/* Background */}
        {data.backgroundImage && (
          <>
            <div
              className="absolute inset-0 -z-10"
              style={backgroundStyle}
            />
            {data.backgroundEditor && data.backgroundEditor.pattern !== 'none' && (
              <div
                className="absolute inset-0 -z-10"
                style={patternStyle}
              />
            )}
            {/* Overlay للوضوح */}
            <div className="absolute inset-0 bg-white bg-opacity-60 -z-10" />
          </>
        )}

        {/* المحتوى */}
        <div className="relative z-10 p-12 h-full flex flex-col print:p-8">
          {/* Header */}
          <Header logoUrl={data.logo.url} showLogo={data.logo.enabled} />

          {/* الترويسة */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-text-dark mb-2">
              تدعوكم {departmentName}
            </h2>
            <p className="text-xl text-text-dark mb-2">
              بالجامعة الإسلامية بغزة
            </p>
            <p className="text-xl text-text-dark mb-4">
              لحضور محاضرة بعنوان:
            </p>
          </div>

          {/* العنوان */}
          <div className="flex justify-center mb-6">
            <div className="bg-primary-green text-white px-8 py-4 rounded-xl max-w-3xl w-full">
              <EditableText
                value={data.title}
                onChange={onUpdateTitle}
                className="text-2xl font-bold text-center"
                placeholder="عنوان اللقاء..."
                multiline
              />
            </div>
          </div>

          {/* قسم المتحدثين */}
          {data.speakers.enabled && data.speakers.speakers.length > 0 && (
            <SpeakersSection
              speakers={data.speakers.speakers}
              onUpdateSpeaker={onUpdateSpeaker}
            />
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* قسم التفاصيل */}
          <DetailsSection
            date={data.date}
            timeStart={data.timeStart}
            timeEnd={data.timeEnd}
            meeting={data.meeting}
            onUpdateLocation={onUpdateLocation}
            onUpdateLink={onUpdateLink}
          />
        </div>
      </div>
    );
  }
);

InvitationCard.displayName = 'InvitationCard';
