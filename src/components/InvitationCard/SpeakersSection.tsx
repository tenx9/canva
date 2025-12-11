import React from 'react';
import type { Speaker } from '@/types/invitation.types';
import { EditableText } from './EditableText';

interface SpeakersSectionProps {
  speakers: Speaker[];
  onUpdateSpeaker: (id: string, updates: Partial<Speaker>) => void;
}

export const SpeakersSection: React.FC<SpeakersSectionProps> = ({
  speakers,
  onUpdateSpeaker,
}) => {
  if (!speakers || speakers.length === 0) {
    return null;
  }

  const layout = speakers.length > 2 ? 'vertical' : 'horizontal';

  return (
    <div className="mb-6 print:mb-4">
      <h3 className="text-xl font-semibold mb-3 text-text-dark">المتحدثون:</h3>
      <div
        className={`flex ${
          layout === 'vertical' ? 'flex-col gap-2' : 'flex-row flex-wrap gap-4'
        }`}
      >
        {speakers.map((speaker) => (
          <div key={speaker.id} className="flex items-center gap-2">
            <span className="text-primary-green text-lg">•</span>
            <EditableText
              value={speaker.title || ''}
              onChange={(newTitle) => onUpdateSpeaker(speaker.id, { title: newTitle })}
              className="text-lg font-medium text-text-dark inline"
              placeholder="اللقب"
            />
            <EditableText
              value={speaker.name}
              onChange={(newName) => onUpdateSpeaker(speaker.id, { name: newName })}
              className="text-lg font-medium text-text-dark inline"
              placeholder="اسم المتحدث"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
