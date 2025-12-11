import React, { useState } from 'react';
import { useGemini } from '@/hooks/useGemini';

interface TitleSuggesterProps {
  onTitleSelect: (title: string) => void;
}

export const TitleSuggester: React.FC<TitleSuggesterProps> = ({
  onTitleSelect,
}) => {
  const { fetchTitleSuggestions, titleSuggestions, isLoading, error } = useGemini();
  const [topic, setTopic] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSuggest = async () => {
    if (!topic.trim()) {
      alert('يرجى إدخال موضوع للبحث');
      return;
    }

    await fetchTitleSuggestions(topic);
    setShowModal(true);
  };

  const handleSelectTitle = (title: string) => {
    onTitleSelect(title);
    setShowModal(false);
    setTopic('');
  };

  return (
    <>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-text-dark mb-2">
          اقتراح عناوين بالذكاء الاصطناعي
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="أدخل موضوع اللقاء..."
            className="flex-1 px-4 py-2 border-2 border-border rounded-lg focus:outline-none focus:border-primary-green text-sm"
          />
          <button
            onClick={handleSuggest}
            disabled={isLoading}
            className="px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-primary-dark-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '...' : '🤖'}
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-500 mt-2">{error}</p>
        )}
      </div>

      {/* Modal */}
      {showModal && titleSuggestions.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 print:hidden">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <h3 className="text-xl font-bold text-text-dark mb-4">
              العناوين المقترحة
            </h3>

            <div className="space-y-2">
              {titleSuggestions.map((title, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectTitle(title)}
                  className="w-full text-right px-4 py-3 border-2 border-border rounded-lg hover:border-primary-green hover:bg-green-50 transition-colors"
                >
                  {title}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-200 text-text-dark rounded-lg hover:bg-gray-300 transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </>
  );
};
