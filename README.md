# Premium Salla Theme

ثيم احترافي متكامل لمنصة سلة مبني على محرك Twilight مع دعم كامل لـ Tailwind CSS

## 🌟 المميزات

### 🎨 تصميم احترافي
- **4 أنماط للهيدر**: افتراضي، شفاف، ثابت، بسيط
- **3 أنماط للفوتر**: افتراضي، بسيط، موسع
- **تصميم متجاوب 100%** على جميع الأجهزة
- **نظام ألوان مرن** قابل للتخصيص بالكامل

### 🛠️ مكونات متقدمة
- ✅ Header متعدد الأنماط
- ✅ Footer احترافي
- ✅ Cart Drawer منزلق
- ✅ Search Modal مع نتائج فورية
- ✅ Mobile Menu متجاوب
- ✅ Hero Slider
- ✅ Products Slider
- ✅ Categories Grid
- ✅ Features Section
- ✅ Product Card قابل للتخصيص

### ⚡ الأداء والتقنيات
- **Tailwind CSS 3.3+** لتصميم سريع ومرن
- **Webpack 5** لتجميع وتحسين الملفات
- **SCSS/Sass** لأنماط منظمة
- **ES6+ JavaScript** مع Babel
- **Lazy Loading** للصور
- **Code Splitting** لتحسين الأداء
- **SEO Optimized** مع Meta Tags كاملة

### ♿ إمكانية الوصول
- **ARIA Labels** كاملة
- **Keyboard Navigation** مدعومة
- **Screen Reader Friendly**
- **Focus States** واضحة
- **Reduced Motion** للمستخدمين الذين يفضلون تقليل الحركة

### 🌐 دعم متعدد اللغات
- **RTL/LTR Support** كامل
- **ملفات ترجمة** للعربية والإنجليزية
- **قابل للتوسع** لإضافة لغات أخرى

## 📦 التثبيت

### المتطلبات الأساسية
- Node.js 18+ و pnpm
- حساب على [Salla Partners Portal](https://salla.partners/)
- [Salla CLI](https://www.npmjs.com/package/@salla.sa/cli)

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone https://github.com/alaalai/premium-theme.git
cd premium-theme
```

2. **تثبيت التبعيات**
```bash
pnpm install
```

3. **البناء للتطوير**
```bash
pnpm run dev
```

4. **البناء للإنتاج**
```bash
pnpm run prod
```

5. **المراقبة والبناء التلقائي**
```bash
pnpm run watch
```

## 🗂️ البنية الهيكلية

```
premium-theme/
├── src/
│   ├── assets/
│   │   ├── images/          # الصور
│   │   ├── js/              # ملفات JavaScript
│   │   │   ├── partials/    # مكونات JS قابلة لإعادة الاستخدام
│   │   │   ├── pages/       # JS خاص بالصفحات
│   │   │   └── app.js       # الملف الرئيسي
│   │   └── styles/          # ملفات SCSS
│   │       ├── 01-settings/ # المتغيرات والإعدادات
│   │       ├── 02-generic/  # الأنماط العامة
│   │       ├── 03-elements/ # أنماط العناصر
│   │       ├── 04-components/ # أنماط المكونات
│   │       ├── 05-utilities/ # الأدوات المساعدة
│   │       └── app.scss     # الملف الرئيسي
│   ├── locales/
│   │   ├── ar.json          # الترجمة العربية
│   │   └── en.json          # الترجمة الإنجليزية
│   └── views/
│       ├── components/      # المكونات
│       │   ├── header/
│       │   ├── footer/
│       │   ├── home/        # مكونات الصفحة الرئيسية
│       │   ├── cart/
│       │   ├── search/
│       │   └── mobile-menu/
│       ├── layouts/         # القوالب الأساسية
│       │   └── master.twig
│       ├── pages/           # الصفحات
│       └── partials/        # أجزاء قابلة لإعادة الاستخدام
├── public/                  # الملفات المجمعة
├── twilight.json           # إعدادات الثيم
├── tailwind.config.js      # إعدادات Tailwind
├── webpack.config.js       # إعدادات Webpack
├── postcss.config.js       # إعدادات PostCSS
└── package.json
```

## ⚙️ التخصيص

### الألوان

يمكنك تخصيص الألوان من خلال `twilight.json`:

```json
{
  "settings": [
    {
      "key": "primary_color",
      "type": "color",
      "title": "اللون الأساسي",
      "default": "#0ea5e9"
    }
  ]
}
```

أو مباشرة في `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#0ea5e9',
    light: '#38bdf8',
    dark: '#0284c7',
  }
}
```

### الخطوط

تعديل الخطوط في `src/assets/styles/01-settings/fonts.scss`:

```scss
:root {
  --font-main: 'Cairo', sans-serif;
  --font-heading: 'Cairo', sans-serif;
}
```

### إضافة مكون جديد للصفحة الرئيسية

1. **إنشاء ملف Twig** في `src/views/components/home/`
2. **إضافة التعريف** في `twilight.json`:

```json
{
  "blocks": [
    {
      "name": "my-component",
      "title": "مكوني الجديد",
      "description": "وصف المكون",
      "fields": [
        {
          "key": "title",
          "type": "text",
          "title": "العنوان"
        }
      ]
    }
  ]
}
```

## 🎨 نظام التصميم

### الألوان الأساسية
- **Primary**: `#0ea5e9` (أزرق)
- **Secondary**: `#a855f7` (بنفسجي)
- **Accent**: `#f59e0b` (برتقالي)
- **Success**: `#10B981` (أخضر)
- **Warning**: `#F59E0B` (أصفر)
- **Danger**: `#EF4444` (أحمر)

### المسافات
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

### نقاط التوقف (Breakpoints)
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## 📱 المكونات

### Header

```twig
{% component 'header.header' %}
```

**الإعدادات المتاحة:**
- `header_style`: default | transparent | sticky | minimal
- `header_bg_color`: لون الخلفية
- `header_text_color`: لون النص
- `show_search_in_header`: إظهار البحث
- `show_cart_in_header`: إظهار السلة
- `show_wishlist_in_header`: إظهار المفضلة

### Footer

```twig
{% component 'footer.footer' %}
```

**الإعدادات المتاحة:**
- `footer_style`: default | minimal | extended
- `footer_bg_color`: لون الخلفية
- `footer_text_color`: لون النص

### Cart Drawer

```twig
{% component 'cart.cart-drawer' %}
```

**المميزات:**
- إضافة/حذف المنتجات
- تحديث الكميات
- عرض الإجمالي
- انتقال سلس للدفع

### Search Modal

```twig
{% component 'search.search-modal' %}
```

**المميزات:**
- بحث فوري
- عرض النتائج المباشرة
- عمليات بحث شائعة
- أقسام مقترحة

### Mobile Menu

```twig
{% component 'mobile-menu.mobile-menu' %}
```

**المميزات:**
- قوائم منسدلة
- روابط المستخدم
- تصميم متجاوب
- انتقالات سلسة

## 🔧 JavaScript API

### استخدام Salla Twilight

```javascript
import Salla from '@salla.sa/twilight';

Salla.onReady(() => {
  // الكود الخاص بك هنا
});

// الاستماع لتحديثات السلة
Salla.event.cart.updated((response) => {
  console.log('Cart updated:', response.data);
});

// إضافة منتج للسلة
Salla.cart.addItem(productId, quantity);

// حذف منتج من السلة
Salla.cart.deleteItem(itemId);
```

### المكونات المخصصة

```javascript
// Cart Drawer
import CartDrawer from './partials/cart-drawer';
const cartDrawer = new CartDrawer();

// Mobile Menu
import MobileMenu from './partials/mobile-menu';
const mobileMenu = new MobileMenu();

// Search Modal
import SearchModal from './partials/search';
const searchModal = new SearchModal();
```

## 📊 الأداء

### تحسينات مطبقة
- ✅ **Code Splitting** - تقسيم الكود لتحميل أسرع
- ✅ **Lazy Loading** - تحميل كسول للصور
- ✅ **Minification** - تصغير CSS و JS
- ✅ **Tree Shaking** - إزالة الكود غير المستخدم
- ✅ **Critical CSS** - تحميل CSS الحرج أولاً
- ✅ **Image Optimization** - تحسين الصور

### نصائح للأداء الأفضل
1. استخدم صور WebP عندما يكون ممكناً
2. فعّل التخزين المؤقت (Caching)
3. استخدم CDN للملفات الثابتة
4. قلل من استخدام الخطوط المخصصة
5. راقب حجم الحزم (Bundle Size)

## 🐛 استكشاف الأخطاء

### المشاكل الشائعة

**1. الأنماط لا تظهر**
```bash
# تأكد من بناء الملفات
pnpm run dev
```

**2. JavaScript لا يعمل**
```bash
# تحقق من الأخطاء في Console
# تأكد من تحميل Twilight بشكل صحيح
```

**3. الصور لا تظهر**
```bash
# تأكد من نسخ الصور إلى public/images
# تحقق من المسارات في الكود
```

## 📝 المساهمة

نرحب بالمساهمات! إذا كنت ترغب في المساهمة:

1. Fork المشروع
2. أنشئ فرع للميزة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للفرع (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE)

## 🤝 الدعم

للحصول على الدعم:
- 📧 البريد الإلكتروني: support@example.com
- 💬 Telegram: [@salladev](https://t.me/salladev)
- 📚 التوثيق: [docs.salla.dev](https://docs.salla.dev)

## 🙏 شكر وتقدير

- [Salla](https://salla.sa) - منصة التجارة الإلكترونية
- [Tailwind CSS](https://tailwindcss.com) - إطار عمل CSS
- [Webpack](https://webpack.js.org) - أداة البناء

---

صُنع بـ ❤️ بواسطة [Alaa](https://github.com/alaalai)
