import { useRef } from 'react';
import { useInvitationData } from '@/hooks/useInvitationData';
import { useGemini } from '@/hooks/useGemini';
import { InvitationCard } from '@/components/InvitationCard/InvitationCard';
import { ControlPanel } from '@/components/ControlPanel/ControlPanel';
import { BackgroundGenerator } from '@/components/AITools/BackgroundGenerator';
import { ImageEditor } from '@/components/AITools/ImageEditor';
import { TitleSuggester } from '@/components/AITools/TitleSuggester';
import { ExportButton } from '@/components/ExportTools/ExportButton';
import { PrintButton } from '@/components/ExportTools/PrintButton';

function App() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const {
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
  } = useInvitationData();

  const { fetchTitleSuggestions, isLoading: isAILoading } = useGemini();

  // AI Handlers
  const handleAISuggest = async () => {
    if (!data.title.trim()) {
      alert('يرجى إدخال موضوع في حقل العنوان أولاً');
      return;
    }
    await fetchTitleSuggestions(data.title);
  };

  const handleVoiceInput = () => {
    alert('ميزة الإملاء الصوتي قيد التطوير. يرجى استخدام لوحة المفاتيح في الوقت الحالي.');
    // TODO: Implement voice input with Web Speech API
  };

  return (
    <div className="min-h-screen bg-gray-100 font-cairo">
      {/* Header */}
      <header className="bg-primary-green text-white py-6 shadow-lg print:hidden">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">
            تطبيق تصميم الدعوات الرسمية
          </h1>
          <p className="text-center text-sm mt-2 opacity-90">
            كلية الاقتصاد والعلوم الإدارية - الجامعة الإسلامية بغزة
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel - Right Side */}
          <div className="lg:col-span-1 space-y-6">
            <ControlPanel
              data={data}
              onDepartmentChange={setDepartment}
              onTitleChange={setTitle}
              onDateChange={setDate}
              onTimeStartChange={setTimeStart}
              onTimeEndChange={setTimeEnd}
              onMeetingTypeChange={setMeetingType}
              onLocationChange={setLocation}
              onLinkChange={setMeetingLink}
              onSpeakersToggle={toggleSpeakers}
              onAddSpeaker={addSpeaker}
              onRemoveSpeaker={removeSpeaker}
              onUpdateSpeaker={updateSpeaker}
              onLogoChange={setLogo}
              onAISuggest={handleAISuggest}
              onVoiceInput={handleVoiceInput}
              isAILoading={isAILoading}
            />

            {/* AI Tools */}
            <div className="control-panel bg-white rounded-lg shadow-lg p-6 print:hidden">
              <h2 className="text-xl font-bold text-primary-green mb-4">
                أدوات الذكاء الاصطناعي
              </h2>

              <TitleSuggester onTitleSelect={setTitle} />

              <BackgroundGenerator onBackgroundGenerated={setBackgroundImage} />

              <ImageEditor
                controls={data.backgroundEditor!}
                onControlChange={setBackgroundEditor}
                hasImage={!!data.backgroundImage}
              />
            </div>
          </div>

          {/* Preview - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 print:shadow-none print:p-0">
              <h2 className="text-xl font-bold text-text-dark mb-6 print:hidden">
                معاينة حية
              </h2>

              <InvitationCard
                ref={cardRef}
                data={data}
                onUpdateTitle={setTitle}
                onUpdateSpeaker={updateSpeaker}
                onUpdateLocation={setLocation}
                onUpdateLink={setMeetingLink}
              />

              {/* Export Buttons */}
              <div className="flex gap-4 mt-8 print:hidden">
                <ExportButton cardRef={cardRef} />
                <PrintButton />
              </div>

              {/* Instructions */}
              <div className="mt-6 p-4 bg-blue-50 border-r-4 border-blue-500 rounded print:hidden">
                <h3 className="font-semibold text-blue-900 mb-2">💡 نصائح:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• انقر مرتين على أي نص في البطاقة لتحريره مباشرةً</li>
                  <li>• استخدم أدوات الذكاء الاصطناعي للحصول على عناوين مقترحة</li>
                  <li>• يمكنك توليد خلفية احترافية بنقرة واحدة</li>
                  <li>• جميع التغييرات تُحفظ تلقائياً في المتصفح</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12 print:hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 كلية الاقتصاد والعلوم الإدارية - الجامعة الإسلامية بغزة
          </p>
          <p className="text-xs mt-2 opacity-75">
            مدعوم بتقنية Google Gemini AI
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
