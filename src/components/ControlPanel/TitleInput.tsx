import React, { useState } from 'react';

interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
  onAISuggest?: () => void;
  onVoiceInput?: () => void;
  isLoading?: boolean;
}

export const TitleInput: React.FC<TitleInputProps> = ({
  value,
  onChange,
  onAISuggest,
  onVoiceInput,
  isLoading = false,
}) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleVoiceClick = () => {
    setIsRecording(!isRecording);
    onVoiceInput?.();
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-text-dark mb-2">
        عنوان اللقاء
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="أدخل عنوان اللقاء..."
          rows={3}
          className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary-green text-text-dark resize-none"
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={onAISuggest}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-primary-dark-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="اقترح عنوان بالذكاء الاصطناعي"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                <span className="text-sm">جاري التحميل...</span>
              </>
            ) : (
              <>
                <span>🤖</span>
                <span className="text-sm">اقترح عنوان</span>
              </>
            )}
          </button>
          <button
            onClick={handleVoiceClick}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isRecording
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-text-dark hover:bg-gray-300'
            }`}
            title="إملاء صوتي"
          >
            <span className="text-xl">{isRecording ? '🔴' : '🎤'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
