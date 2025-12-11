import React from 'react';
import type { Speaker } from '@/types/invitation.types';

interface SpeakersManagerProps {
  enabled: boolean;
  speakers: Speaker[];
  onToggle: (enabled: boolean) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Speaker>) => void;
}

export const SpeakersManager: React.FC<SpeakersManagerProps> = ({
  enabled,
  speakers,
  onToggle,
  onAdd,
  onRemove,
  onUpdate,
}) => {
  return (
    <div className="mb-6">
      {/* Toggle */}
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-semibold text-text-dark">
          قسم المتحدثين
        </label>
        <button
          onClick={() => onToggle(!enabled)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            enabled
              ? 'bg-primary-green text-white'
              : 'bg-gray-200 text-text-dark hover:bg-gray-300'
          }`}
        >
          {enabled ? '✓ مفعّل' : '✗ معطّل'}
        </button>
      </div>

      {/* Speakers list */}
      {enabled && (
        <div className="space-y-3">
          {speakers.map((speaker, index) => (
            <div
              key={speaker.id}
              className="border-2 border-border rounded-lg p-3 bg-gray-50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-dark">
                  متحدث {index + 1}
                </span>
                <button
                  onClick={() => onRemove(speaker.id)}
                  className="text-red-500 hover:text-red-700 font-bold"
                  title="حذف المتحدث"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  value={speaker.title || ''}
                  onChange={(e) => onUpdate(speaker.id, { title: e.target.value })}
                  placeholder="اللقب العلمي (د. / أ.د. / م.)"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-primary-green text-sm"
                />
                <input
                  type="text"
                  value={speaker.name}
                  onChange={(e) => onUpdate(speaker.id, { name: e.target.value })}
                  placeholder="اسم المتحدث"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-primary-green text-sm"
                />
              </div>
            </div>
          ))}

          {/* Add button */}
          <button
            onClick={onAdd}
            className="w-full px-4 py-3 border-2 border-dashed border-primary-green text-primary-green rounded-lg hover:bg-green-50 transition-colors font-medium"
          >
            + إضافة متحدث
          </button>
        </div>
      )}
    </div>
  );
};
