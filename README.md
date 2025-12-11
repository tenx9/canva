# تطبيق تصميم الدعوات الرسمية 🎨

تطبيق ويب احترافي متكامل لكلية الاقتصاد والعلوم الإدارية في الجامعة الإسلامية بغزة لتصميم وتوليد دعوات رسمية للورش والمؤتمرات واللقاءات الأكاديمية.

## ✨ المميزات

### 🎯 الميزات الأساسية
- ✅ واجهة مستخدم سهلة وبديهية بالكامل بالعربية (RTL)
- ✅ معاينة حية للدعوة مع التحديث الفوري
- ✅ تحرير مباشر بالنقر المزدوج على أي نص في البطاقة
- ✅ دعم كامل للطباعة والتصدير بجودة عالية (PNG)
- ✅ حفظ تلقائي للبيانات في المتصفح (LocalStorage)

### 🤖 الذكاء الاصطناعي (Google Gemini)
- 🎨 توليد خلفيات احترافية بالذكاء الاصطناعي
- 💡 اقتراح عناوين جذابة للقاءات
- 🎤 إملاء صوتي لتحويل الصوت إلى نص (قيد التطوير)
- 🖼️ محرر متقدم للصور مع تأثيرات متعددة

### 📋 خيارات التخصيص
- اختيار القسم (إدارة الأعمال، المحاسبة، الاقتصاد، العمادة)
- إضافة عدد غير محدود من المتحدثين
- دعم اللقاءات الفيزيائية والأونلاين
- توليد QR Code تلقائي للقاءات الأونلاين
- رفع شعار الكلية/القسم (اختياري)
- حساب تلقائي لاسم اليوم من التاريخ

## 🚀 البدء السريع

### المتطلبات الأساسية
- Node.js (الإصدار 18 أو أحدث)
- npm أو yarn
- Gemini API Key (اختياري للمزايا الذكية)

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd invitation-designer
```

2. **تثبيت الحزم**
```bash
npm install
```

3. **إعداد متغيرات البيئة**

أنشئ ملف `.env` في المجلد الرئيسي:
```bash
cp .env.example .env
```

افتح `.env` وأضف مفتاح Gemini API الخاص بك:
```env
VITE_GEMINI_API_KEY=your_api_key_here
VITE_IMAGE_MODEL=gemini-2.0-flash-exp
VITE_TEXT_MODEL=gemini-2.0-flash-exp
VITE_AUDIO_MODEL=gemini-2.0-flash-exp
```

**للحصول على Gemini API Key:**
1. اذهب إلى [Google AI Studio](https://aistudio.google.com/app/apikey)
2. قم بإنشاء مفتاح API جديد
3. انسخه والصقه في ملف `.env`

> **ملاحظة:** التطبيق يعمل بدون API key ولكن بدون المزايا الذكية (اقتراح العناوين، توليد الخلفيات).

4. **تشغيل التطبيق**
```bash
npm run dev
```

سيعمل التطبيق على: `http://localhost:5173`

## 📖 دليل الاستخدام

### 1️⃣ إنشاء دعوة جديدة

1. **اختر القسم** من القائمة المنسدلة
2. **أدخل عنوان اللقاء** (أو استخدم زر "اقترح عنوان" للحصول على اقتراحات ذكية)
3. **حدد التاريخ والوقت**
4. **اختر نوع اللقاء**:
   - 🏫 **في الجامعة**: أدخل اسم القاعة
   - 💻 **أونلاين**: أدخل رابط اللقاء (سيتم توليد QR Code تلقائياً)

### 2️⃣ إضافة المتحدثين (اختياري)

1. فعّل خيار "قسم المتحدثين"
2. انقر "إضافة متحدث"
3. أدخل اللقب العلمي (د. / أ.د. / إلخ) والاسم
4. كرر لإضافة متحدثين آخرين
5. لحذف متحدث، انقر على ✕

### 3️⃣ التخصيص المتقدم

#### رفع الشعار:
- انقر على "انقر لرفع الشعار"
- اختر صورة (PNG, JPG, WebP)
- الحد الأقصى: 5 ميجابايت

#### توليد خلفية بالذكاء الاصطناعي:
1. انقر "توليد خلفية بالـ AI"
2. انتظر حتى يتم التوليد
3. استخدم محرر الخلفية لتعديل:
   - التمويه (Blur)
   - السطوع (Brightness)
   - التباين (Contrast)
   - التشبع (Saturation)
   - إضافة نمط (Pattern)

#### التحرير المباشر:
- انقر **مرتين** على أي نص في البطاقة
- ستظهر حقل إدخال للتعديل
- اضغط **Enter** أو انقر خارج الحقل للحفظ
- اضغط **ESC** للإلغاء

### 4️⃣ التصدير والطباعة

#### تصدير كـ PNG:
1. انقر زر "تصدير كـ PNG"
2. سيتم تحميل صورة عالية الجودة تلقائياً

#### الطباعة:
1. انقر زر "طباعة"
2. ستفتح نافذة معاينة الطباعة
3. اختر الطابعة وأكمل الطباعة

## 🏗️ البنية المعمارية

```
invitation-designer/
├── src/
│   ├── components/
│   │   ├── InvitationCard/      # مكونات البطاقة الرئيسية
│   │   │   ├── InvitationCard.tsx
│   │   │   ├── EditableText.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── SpeakersSection.tsx
│   │   │   └── DetailsSection.tsx
│   │   ├── ControlPanel/         # لوحة التحكم
│   │   │   ├── ControlPanel.tsx
│   │   │   ├── DepartmentSelector.tsx
│   │   │   ├── TitleInput.tsx
│   │   │   ├── DateTimeInputs.tsx
│   │   │   ├── LocationInput.tsx
│   │   │   ├── SpeakersManager.tsx
│   │   │   └── LogoUploader.tsx
│   │   ├── AITools/              # أدوات الذكاء الاصطناعي
│   │   │   ├── BackgroundGenerator.tsx
│   │   │   ├── ImageEditor.tsx
│   │   │   └── TitleSuggester.tsx
│   │   └── ExportTools/          # أدوات التصدير
│   │       ├── ExportButton.tsx
│   │       └── PrintButton.tsx
│   ├── hooks/                    # Custom Hooks
│   │   ├── useInvitationData.ts
│   │   └── useGemini.ts
│   ├── services/                 # خدمات API
│   │   └── geminiAPI.ts
│   ├── utils/                    # دوال مساعدة
│   │   ├── dateHelpers.ts
│   │   ├── qrGenerator.ts
│   │   ├── exportHelpers.ts
│   │   └── imageProcessing.ts
│   ├── types/                    # TypeScript Types
│   │   └── invitation.types.ts
│   ├── App.tsx                   # المكون الرئيسي
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🛠️ التقنيات المستخدمة

- **Frontend Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **AI Integration**: Google Gemini API
- **Fonts**: Cairo من Google Fonts
- **Libraries**:
  - `html2canvas`: تحويل DOM إلى صورة
  - `qrcode.react`: توليد QR Codes
  - `date-fns`: معالجة التواريخ

## 🎨 الألوان الرئيسية

```css
--primary-green: #6FBF73
--dark-green: #4A9A4D
--light-gray: #F5F5F5
--text-dark: #2D3748
--text-light: #718096
--border-color: #E2E8F0
```

## 📱 الدعم المتجاوب

التطبيق مُحسّن للعمل على:
- 🖥️ Desktop (1024px+)
- 📱 Tablet (768px - 1023px)
- 📱 Mobile (< 768px)

## 🔧 البناء للإنتاج

```bash
# بناء التطبيق
npm run build

# معاينة البناء
npm run preview
```

ستجد الملفات المبنية في مجلد `dist/`

## 🚀 النشر

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 🐛 استكشاف الأخطاء

### المشكلة: لا تعمل مزايا الذكاء الاصطناعي
**الحل**: تأكد من إضافة Gemini API Key في ملف `.env`

### المشكلة: فشل التصدير كـ PNG
**الحل**: تأكد من أن المتصفح يدعم `html2canvas`. جرّب متصفح آخر (Chrome/Firefox)

### المشكلة: الخط العربي لا يظهر بشكل صحيح
**الحل**: تأكد من اتصال الإنترنت لتحميل خط Cairo من Google Fonts

### المشكلة: البيانات لا تُحفظ
**الحل**: تأكد من تفعيل LocalStorage في المتصفح

## 🤝 المساهمة

هذا مشروع مفتوح المصدر. المساهمات مرحب بها!

1. Fork المشروع
2. أنشئ فرع للميزة (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للفرع (`git push origin feature/amazing-feature`)
5. افتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت MIT License.

## 👥 الفريق

- **تطوير**: فريق كلية الاقتصاد والعلوم الإدارية
- **الدعم**: الجامعة الإسلامية بغزة
- **AI**: Google Gemini

## 📞 الدعم والتواصل

- 🌐 الموقع: [www.iugaza.edu.ps](https://www.iugaza.edu.ps)
- 📧 البريد: support@iugaza.edu.ps
- 📱 الهاتف: +970-8-2644400

---

**مع تمنياتنا بتجربة استخدام ممتعة! 🎉**

> تم التطوير بـ ❤️ في الجامعة الإسلامية بغزة
