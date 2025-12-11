import { GoogleGenerativeAI } from '@google/generative-ai';
import type { TitleSuggestion, AIGenerationOptions } from '@/types/invitation.types';

// إعداد Gemini API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

// Models
const TEXT_MODEL = import.meta.env.VITE_TEXT_MODEL || 'gemini-2.0-flash-exp';
const AUDIO_MODEL = import.meta.env.VITE_AUDIO_MODEL || 'gemini-2.0-flash-exp';

/**
 * اقتراح عناوين للدعوة بناءً على موضوع معين
 */
export async function suggestTitles(topic: string): Promise<TitleSuggestion> {
  try {
    if (!API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    const model = genAI.getGenerativeModel({ model: TEXT_MODEL });

    const prompt = `أنت مساعد أكاديمي متخصص في صياغة عناوين احترافية للفعاليات الجامعية.

بناءً على الموضوع التالي: ${topic}

اقترح 5 عناوين جذابة، رسمية، وأكاديمية مناسبة لدعوة رسمية لكلية الاقتصاد والعلوم الإدارية.

الشروط:
- يجب أن يكون العنوان واضحاً ومختصراً (لا يتجاوز 80 حرف)
- استخدم لغة أكاديمية احترافية
- ركّز على القيمة المضافة للحضور
- نوّع بين الأساليب (سؤال، بيان، وعد)

أخرج النتيجة بصيغة JSON فقط بدون أي نص إضافي:
{
  "titles": [
    "العنوان الأول",
    "العنوان الثاني",
    "العنوان الثالث",
    "العنوان الرابع",
    "العنوان الخامس"
  ]
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // استخراج JSON من الاستجابة
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Gemini');
    }

    const parsed = JSON.parse(jsonMatch[0]) as TitleSuggestion;
    return parsed;
  } catch (error) {
    console.error('Error suggesting titles:', error);
    throw new Error('فشل اقتراح العناوين. يرجى المحاولة مرة أخرى.');
  }
}

/**
 * توليد خلفية بالذكاء الاصطناعي
 * ملاحظة: حالياً Gemini لا يدعم توليد الصور مباشرة في النموذج المجاني
 * هذه دالة placeholder - يمكن استبدالها بـ API آخر مثل DALL-E أو Stable Diffusion
 */
export async function generateBackground(
  options: AIGenerationOptions = {}
): Promise<string> {
  try {
    // للتجريب، سنعيد صورة افتراضية
    // في الإنتاج، استخدم API توليد صور حقيقي
    console.log('Generating background with options:', options);

    // يمكن استخدام unsplash API أو خدمة مشابهة
    const { colorPalette = ['green', 'gray'], style = 'professional' } = options;

    // Unsplash API example (مجاني ولا يحتاج API key للاستخدام الأساسي)
    const query = `abstract+${style}+background+${colorPalette.join('+')}`;
    const unsplashUrl = `https://source.unsplash.com/1920x1080/?${query}`;

    return unsplashUrl;
  } catch (error) {
    console.error('Error generating background:', error);
    throw new Error('فشل توليد الخلفية. يرجى المحاولة مرة أخرى.');
  }
}

/**
 * تحويل الصوت إلى نص
 * ملاحظة: Gemini يدعم Multimodal لكن للصوت نحتاج تحويله إلى base64
 */
export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  try {
    if (!API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    const model = genAI.getGenerativeModel({ model: AUDIO_MODEL });

    // تحويل الصوت إلى base64
    const base64Audio = await blobToBase64(audioBlob);

    const prompt = 'حوّل هذا المقطع الصوتي إلى نص عربي دقيق. النص مخصص لعنوان لقاء أكاديمي.';

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Audio.split(',')[1], // إزالة البادئة data:audio/...;base64,
          mimeType: 'audio/webm',
        },
      },
    ]);

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw new Error('فشل تحويل الصوت إلى نص. يرجى المحاولة مرة أخرى.');
  }
}

/**
 * تحسين نص العنوان
 */
export async function improveTitle(title: string): Promise<string> {
  try {
    if (!API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    const model = genAI.getGenerativeModel({ model: TEXT_MODEL });

    const prompt = `حسّن هذا العنوان ليصبح أكثر احترافية وجاذبية للفعاليات الأكاديمية:

"${title}"

اجعله:
- واضحاً ومختصراً (لا يتجاوز 80 حرف)
- أكاديمي الأسلوب
- جذاباً ومشوقاً

أخرج العنوان المحسّن فقط بدون أي شرح أو نص إضافي.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error improving title:', error);
    throw new Error('فشل تحسين العنوان. يرجى المحاولة مرة أخرى.');
  }
}

/**
 * Helper: تحويل Blob إلى Base64
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to convert blob to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * التحقق من توفر API Key
 */
export function isGeminiConfigured(): boolean {
  return !!API_KEY && API_KEY !== 'your_api_key_here';
}
