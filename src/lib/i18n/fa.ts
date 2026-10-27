import type { Dictionary } from './en.ts'

export const fa: Dictionary = {
  common: {
    save: 'ذخیره',
    cancel: 'انصراف',
    close: 'بستن',
    back: 'بازگشت',
    delete: 'حذف',
    duplicate: 'تکثیر',
    settings: 'تنظیمات',
    actions: 'عملیات'
  },
  header: {
    aiActive: 'هوش مصنوعی فعال',
    noApiKey: 'بدون کلید API',
    settings: 'تنظیمات'
  },
  dashboard: {
    title: 'رزومه‌های من',
    loading: 'در حال بارگذاری رزومه‌ها...',
    emptyHint: 'برای شروع، اولین رزومه را بسازید',
    countOne: '{count} رزومه',
    countMany: '{count} رزومه',
    newResume: 'رزومه جدید',
    untitled: 'رزومه بدون عنوان',
    noResumesTitle: 'هنوز رزومه‌ای نساخته‌اید',
    noResumesBody: 'اولین رزومه را بسازید، قالب را انتخاب کنید و با هوش مصنوعی متن را حرفه‌ای‌تر کنید.',
    createFirst: 'ساخت اولین رزومه',
    noName: 'نام وارد نشده',
    updated: '{name} · به‌روزرسانی {time}',
    copySuffix: 'کپی',
    duplicated: 'رزومه تکثیر شد',
    duplicatedDescription: '«{title}» ساخته شد.',
    deleted: 'رزومه حذف شد',
    deletedDescription: '«{title}» حذف شد.'
  },
  editor: {
    loading: 'در حال باز کردن ویرایشگر...',
    notFound: 'رزومه پیدا نشد',
    backToDashboard: 'بازگشت به فهرست',
    titlePlaceholder: 'عنوان رزومه',
    saved: 'رزومه ذخیره شد'
  },
  sections: {
    personal: 'اطلاعات فردی',
    summary: 'خلاصه حرفه‌ای',
    experience: 'سوابق کاری',
    education: 'تحصیلات',
    skills: 'مهارت‌ها'
  },
  personal: {
    fullName: 'نام و نام خانوادگی',
    jobTitle: 'عنوان شغلی',
    email: 'ایمیل',
    phone: 'تلفن',
    location: 'محل سکونت',
    website: 'وب‌سایت',
    linkedin: 'لینکدین'
  },
  summary: {
    label: 'خلاصه حرفه‌ای',
    tip: 'دو تا چهار جمله کافی است. مهارت‌های اصلی و سال‌های تجربه را در آن بیاورید.'
  },
  experience: {
    empty: 'هنوز سابقه‌ای ثبت نشده است.',
    add: 'افزودن سابقه',
    item: 'سابقه {n}',
    position: 'سمت',
    company: 'شرکت',
    location: 'محل',
    startDate: 'تاریخ شروع',
    endDate: 'تاریخ پایان',
    current: 'مشغول به کار',
    achievements: 'دستاوردهای کلیدی',
    addBullet: 'افزودن مورد',
    removeBullet: 'حذف مورد'
  },
  education: {
    empty: 'هنوز تحصیلی ثبت نشده است.',
    add: 'افزودن تحصیلات',
    item: 'تحصیلات {n}',
    institution: 'مؤسسه',
    degree: 'مدرک',
    field: 'رشته',
    gpa: 'معدل',
    startDate: 'تاریخ شروع',
    endDate: 'تاریخ پایان',
    description: 'توضیحات'
  },
  skills: {
    add: 'افزودن مهارت',
    empty: 'مهارتی اضافه نشده. نام مهارت را بنویسید و Enter را بزنید.',
    count: '{count} از {max} مهارت',
    remove: 'حذف {name}',
    levels: {
      beginner: 'مبتدی',
      intermediate: 'متوسط',
      advanced: 'پیشرفته',
      expert: 'حرفه‌ای'
    }
  },
  preview: {
    template: 'قالب',
    contentLanguage: 'زبان رزومه',
    vazirmatn: 'وزیرمتن',
    zoomOut: 'کوچک‌نمایی',
    zoomIn: 'بزرگ‌نمایی',
    templates: {
      modern: 'مدرن',
      minimalist: 'ساده',
      professional: 'رسمی'
    },
    fontSize: {
      xs: 'خیلی کوچک',
      sm: 'کوچک',
      md: 'متوسط',
      lg: 'بزرگ',
      xl: 'خیلی بزرگ'
    },
    languages: {
      fa: 'فارسی',
      en: 'English'
    }
  },
  exportMenu: {
    export: 'خروجی',
    pdf: 'خروجی PDF',
    docx: 'خروجی DOCX',
    previewNotReady: 'پیش‌نمایش هنوز آماده نیست',
    pdfSuccess: 'فایل PDF ذخیره شد',
    pdfError: 'ذخیره PDF انجام نشد',
    docxSuccess: 'فایل DOCX ذخیره شد',
    docxError: 'ذخیره DOCX انجام نشد'
  },
  settings: {
    title: 'تنظیمات',
    description: 'زبان رابط، سرویس هوش مصنوعی و کلید API را اینجا تنظیم کنید.',
    language: 'زبان رابط کاربری',
    languageFa: 'فارسی',
    languageEn: 'English',
    provider: 'سرویس هوش مصنوعی',
    providerPlaceholder: 'انتخاب سرویس',
    openai: 'OpenAI (GPT)',
    gemini: 'Google Gemini',
    apiKey: 'کلید API',
    active: 'فعال',
    showKey: 'نمایش کلید',
    hideKey: 'پنهان کردن کلید',
    keyHint: 'کلید فقط در همین مرورگر می‌ماند و با هر درخواست مستقیماً برای سرویس انتخاب‌شده فرستاده می‌شود. آن را در اختیار دیگران نگذارید.',
    privacyTitle: 'حریم خصوصی',
    privacyBody:
      'رزومه‌ها در مرورگر شما ذخیره می‌شوند. درخواست‌های هوش مصنوعی مستقیم از مرورگر به سرویس انتخاب‌شده می‌روند و به سرور ورق فرستاده نمی‌شوند.',
    save: 'ذخیره تنظیمات',
    saved: 'تنظیمات ذخیره شد',
    keyStored: 'کلید در همین مرورگر ذخیره شد.',
    keyCleared: 'کلید پاک شد.'
  },
  mic: {
    unsupported: 'این مرورگر از ورود صوتی پشتیبانی نمی‌کند',
    stop: 'پایان ضبط',
    start: 'ورود صوتی'
  },
  ai: {
    enhance: 'بهبود با هوش مصنوعی',
    apply: 'اعمال متن',
    discard: 'رد کردن',
    nothingToEnhance: 'ابتدا متنی بنویسید',
    applied: 'متن بهبودیافته اعمال شد',
    keyMissing: 'ابتدا کلید API را در تنظیمات وارد کنید',
    atsButton: 'بررسی ATS',
    atsTitle: 'بررسی سازگاری با ATS',
    atsDescription: 'ببینید رزومه چقدر برای سامانه‌های بررسی رزومه مناسب است',
    atsIntro: 'این بررسی به کلمات کلیدی، ساختار و وضوح متن امتیاز می‌دهد و پیشنهاد اصلاح می‌دهد.',
    atsRun: 'شروع بررسی',
    atsRunning: 'در حال بررسی...',
    atsScore: 'امتیاز ATS از ۱۰۰',
    atsCategories: 'جزئیات امتیاز',
    atsSuggestions: 'پیشنهادها',
    atsAgain: 'بررسی دوباره',
    jobButton: 'تطبیق شغلی',
    jobTitle: 'تطبیق با آگهی شغلی',
    jobDescription: 'متن آگهی را وارد کنید تا فاصله رزومه با آن مشخص شود',
    jobPlaceholder: 'متن کامل آگهی شغلی را اینجا قرار دهید...',
    jobRun: 'بررسی تطبیق',
    jobRunning: 'در حال بررسی...',
    jobScore: 'درصد تطبیق',
    jobMissing: 'کلیدواژه‌های جاافتاده',
    jobSuggestions: 'پیشنهادها',
    jobAgain: 'بررسی آگهی دیگر',
    jobEmpty: 'ابتدا متن آگهی شغلی را وارد کنید',
    translateButton: 'ترجمه',
    translateTitle: 'ترجمه رزومه',
    translateDescription: 'متن رزومه را به زبان دیگری ترجمه کنید',
    translateTarget: 'زبان مقصد',
    translateNote: 'نام، عنوان، خلاصه، سوابق، تحصیلات و مهارت‌ها ترجمه می‌شوند. نام شرکت و دانشگاه دست نمی‌خورد.',
    translateRun: 'ترجمه به {language}',
    translateRunning: 'در حال ترجمه...',
    translateDone: 'رزومه به {language} ترجمه شد',
    categories: {
      keywords: 'کلمات کلیدی',
      formatting: 'قالب‌بندی',
      sections: 'بخش‌ها',
      experience: 'سوابق',
      education: 'تحصیلات',
      summary: 'خلاصه',
      skills: 'مهارت‌ها'
    },
    priority: {
      high: 'بالا',
      medium: 'متوسط',
      low: 'کم'
    },
    actions: {
      add: 'افزودن',
      modify: 'ویرایش',
      emphasize: 'تأکید'
    },
    languages: {
      Persian: 'فارسی',
      English: 'انگلیسی',
      Indonesian: 'اندونزیایی',
      Japanese: 'ژاپنی',
      Korean: 'کره‌ای',
      'Chinese (Simplified)': 'چینی ساده‌شده',
      Spanish: 'اسپانیایی',
      German: 'آلمانی',
      French: 'فرانسوی',
      Arabic: 'عربی',
      Portuguese: 'پرتغالی',
      Hindi: 'هندی'
    },
    errors: {
      keyRequired: 'کلید API لازم است. آن را در تنظیمات وارد کنید.',
      parse: 'پاسخ هوش مصنوعی قابل خواندن نبود. دوباره تلاش کنید.',
      empty: 'پاسخ هوش مصنوعی خالی بود. دوباره تلاش کنید.',
      enhance: 'بهبود متن انجام نشد',
      ats: 'بررسی ATS انجام نشد',
      match: 'تطبیق شغلی انجام نشد',
      translate: 'ترجمه انجام نشد'
    }
  },
  validation: {
    fullName: 'نام و نام خانوادگی را وارد کنید',
    email: 'ایمیل معتبر نیست',
    url: 'نشانی وب معتبر نیست',
    company: 'نام شرکت را وارد کنید',
    position: 'سمت را وارد کنید',
    startDate: 'تاریخ شروع را وارد کنید',
    institution: 'نام مؤسسه را وارد کنید',
    degree: 'مدرک را وارد کنید',
    skill: 'نام مهارت را وارد کنید',
    title: 'عنوان رزومه را وارد کنید'
  }
}
