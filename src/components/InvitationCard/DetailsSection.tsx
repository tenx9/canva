import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { formatFullDateInArabic, formatTimeRange } from '@/utils/dateHelpers';
import { EditableText } from './EditableText';
import type { MeetingLocation } from '@/types/invitation.types';

interface DetailsSectionProps {
  date: string;
  timeStart: string;
  timeEnd: string;
  meeting: MeetingLocation;
  onUpdateLocation?: (location: string) => void;
  onUpdateLink?: (link: string) => void;
}

export const DetailsSection: React.FC<DetailsSectionProps> = ({
  date,
  timeStart,
  timeEnd,
  meeting,
  onUpdateLocation,
  onUpdateLink,
}) => {
  const fullDate = formatFullDateInArabic(date);
  const timeRange = formatTimeRange(timeStart, timeEnd);

  return (
    <div className="mt-8 border-t-2 border-gray-200 pt-6 print:mt-6 print:pt-4">
      <div className="space-y-4">
        {/* التاريخ */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">📅</span>
          <span className="text-lg font-medium text-text-dark">{fullDate}</span>
        </div>

        {/* الوقت */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">🕐</span>
          <span className="text-lg font-medium text-text-dark">{timeRange}</span>
        </div>

        {/* المكان أو الرابط */}
        {meeting.type === 'physical' ? (
          <div className="flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <EditableText
              value={meeting.location || ''}
              onChange={(newLocation) => onUpdateLocation?.(newLocation)}
              className="text-lg font-medium text-text-dark"
              placeholder="اسم القاعة"
            />
          </div>
        ) : (
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌐</span>
            <div className="flex-1">
              <EditableText
                value={meeting.link || ''}
                onChange={(newLink) => onUpdateLink?.(newLink)}
                className="text-lg font-medium text-primary-green underline break-all"
                placeholder="رابط اللقاء"
              />
              {meeting.link && (
                <div className="mt-2 flex justify-start">
                  <div className="bg-white p-2 rounded-lg border-2 border-gray-200">
                    <QRCodeSVG value={meeting.link} size={100} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* الموقع الإلكتروني */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌐</span>
          <span className="text-lg font-medium text-text-dark">
            www.iugaza.edu.ps
          </span>
        </div>
      </div>
    </div>
  );
};
