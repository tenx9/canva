import React from 'react';
import type { MeetingType } from '@/types/invitation.types';

interface LocationInputProps {
  meetingType: MeetingType;
  location?: string;
  link?: string;
  onMeetingTypeChange: (type: MeetingType) => void;
  onLocationChange: (location: string) => void;
  onLinkChange: (link: string) => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({
  meetingType,
  location,
  link,
  onMeetingTypeChange,
  onLocationChange,
  onLinkChange,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-text-dark mb-2">
        نوع اللقاء
      </label>

      {/* Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => onMeetingTypeChange('physical')}
          className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
            meetingType === 'physical'
              ? 'bg-primary-green text-white'
              : 'bg-gray-200 text-text-dark hover:bg-gray-300'
          }`}
        >
          🏫 في الجامعة
        </button>
        <button
          onClick={() => onMeetingTypeChange('online')}
          className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
            meetingType === 'online'
              ? 'bg-primary-green text-white'
              : 'bg-gray-200 text-text-dark hover:bg-gray-300'
          }`}
        >
          💻 أونلاين
        </button>
      </div>

      {/* Input based on type */}
      {meetingType === 'physical' ? (
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            اسم القاعة
          </label>
          <input
            type="text"
            value={location || ''}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="مثال: قاعة المؤتمرات الرئيسية"
            className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary-green text-text-dark"
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            رابط اللقاء
          </label>
          <input
            type="url"
            value={link || ''}
            onChange={(e) => onLinkChange(e.target.value)}
            placeholder="https://zoom.us/j/..."
            className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary-green text-text-dark"
          />
          {link && (
            <p className="text-xs text-text-light mt-1">
              💡 سيتم توليد QR Code تلقائياً
            </p>
          )}
        </div>
      )}
    </div>
  );
};
