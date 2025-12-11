import React from 'react';
import { DepartmentSelector } from './DepartmentSelector';
import { TitleInput } from './TitleInput';
import { DateTimeInputs } from './DateTimeInputs';
import { LocationInput } from './LocationInput';
import { SpeakersManager } from './SpeakersManager';
import { LogoUploader } from './LogoUploader';

interface ControlPanelProps {
  data: any;
  onDepartmentChange: (dept: any) => void;
  onTitleChange: (title: string) => void;
  onDateChange: (date: string) => void;
  onTimeStartChange: (time: string) => void;
  onTimeEndChange: (time: string) => void;
  onMeetingTypeChange: (type: any) => void;
  onLocationChange: (location: string) => void;
  onLinkChange: (link: string) => void;
  onSpeakersToggle: (enabled: boolean) => void;
  onAddSpeaker: () => void;
  onRemoveSpeaker: (id: string) => void;
  onUpdateSpeaker: (id: string, updates: any) => void;
  onLogoChange: (url: string | undefined) => void;
  onAISuggest?: () => void;
  onVoiceInput?: () => void;
  isAILoading?: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  data,
  onDepartmentChange,
  onTitleChange,
  onDateChange,
  onTimeStartChange,
  onTimeEndChange,
  onMeetingTypeChange,
  onLocationChange,
  onLinkChange,
  onSpeakersToggle,
  onAddSpeaker,
  onRemoveSpeaker,
  onUpdateSpeaker,
  onLogoChange,
  onAISuggest,
  onVoiceInput,
  isAILoading,
}) => {
  return (
    <div className="control-panel w-full max-w-md bg-white rounded-lg shadow-lg p-6 overflow-y-auto print:hidden">
      <h1 className="text-2xl font-bold text-primary-green mb-6 text-center">
        لوحة التحكم
      </h1>

      {/* القسم */}
      <DepartmentSelector
        value={data.department}
        onChange={onDepartmentChange}
      />

      {/* العنوان */}
      <TitleInput
        value={data.title}
        onChange={onTitleChange}
        onAISuggest={onAISuggest}
        onVoiceInput={onVoiceInput}
        isLoading={isAILoading}
      />

      {/* التاريخ والوقت */}
      <DateTimeInputs
        date={data.date}
        timeStart={data.timeStart}
        timeEnd={data.timeEnd}
        onDateChange={onDateChange}
        onTimeStartChange={onTimeStartChange}
        onTimeEndChange={onTimeEndChange}
      />

      {/* المكان */}
      <LocationInput
        meetingType={data.meeting.type}
        location={data.meeting.location}
        link={data.meeting.link}
        onMeetingTypeChange={onMeetingTypeChange}
        onLocationChange={onLocationChange}
        onLinkChange={onLinkChange}
      />

      {/* المتحدثون */}
      <SpeakersManager
        enabled={data.speakers.enabled}
        speakers={data.speakers.speakers}
        onToggle={onSpeakersToggle}
        onAdd={onAddSpeaker}
        onRemove={onRemoveSpeaker}
        onUpdate={onUpdateSpeaker}
      />

      {/* الشعار */}
      <LogoUploader logoUrl={data.logo.url} onLogoChange={onLogoChange} />
    </div>
  );
};
