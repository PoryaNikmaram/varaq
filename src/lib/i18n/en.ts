export const en = {
  common: {
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    back: 'Back',
    delete: 'Delete',
    duplicate: 'Duplicate',
    settings: 'Settings',
    actions: 'Actions'
  },
  header: {
    aiActive: 'AI Active',
    noApiKey: 'No API Key',
    settings: 'Settings'
  },
  dashboard: {
    title: 'My Resumes',
    loading: 'Loading your resumes...',
    emptyHint: 'Create your first resume to get started',
    countOne: '{count} resume',
    countMany: '{count} resumes',
    newResume: 'New Resume',
    untitled: 'Untitled Resume',
    noResumesTitle: 'No resumes yet',
    noResumesBody:
      'Create your first resume, pick a template, and use AI to make the writing clearer and more professional.',
    createFirst: 'Create Your First Resume',
    noName: 'No name set',
    updated: '{name} · Updated {time}',
    copySuffix: 'Copy',
    duplicated: 'Resume duplicated',
    duplicatedDescription: '“{title}” created.',
    deleted: 'Resume deleted',
    deletedDescription: '“{title}” has been removed.'
  },
  editor: {
    loading: 'Loading editor...',
    notFound: 'Resume not found',
    backToDashboard: 'Back to Dashboard',
    titlePlaceholder: 'Resume title',
    saved: 'Resume saved'
  },
  sections: {
    personal: 'Personal Information',
    summary: 'Professional Summary',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills'
  },
  personal: {
    fullName: 'Full Name',
    jobTitle: 'Job Title',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    website: 'Website',
    linkedin: 'LinkedIn'
  },
  summary: {
    label: 'Professional Summary',
    tip: 'Keep it to two to four sentences. Mention your strongest skills and years of experience.'
  },
  experience: {
    empty: 'No experience added yet. Add your work history below.',
    add: 'Add Experience',
    item: 'Experience {n}',
    position: 'Position',
    company: 'Company',
    location: 'Location',
    startDate: 'Start Date',
    endDate: 'End Date',
    current: 'Current role',
    achievements: 'Key Achievements',
    addBullet: 'Add bullet',
    removeBullet: 'Remove bullet'
  },
  education: {
    empty: 'No education added yet.',
    add: 'Add Education',
    item: 'Education {n}',
    institution: 'Institution',
    degree: 'Degree',
    field: 'Field of Study',
    gpa: 'GPA',
    startDate: 'Start Date',
    endDate: 'End Date',
    description: 'Description'
  },
  skills: {
    add: 'Add Skill',
    empty: 'No skills added. Type a skill name and press Enter or click +.',
    count: '{count} of {max} skills',
    remove: 'Remove {name}',
    levels: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      expert: 'Expert'
    }
  },
  preview: {
    template: 'Template',
    contentLanguage: 'Resume language',
    vazirmatn: 'Vazirmatn',
    zoomOut: 'Zoom out',
    zoomIn: 'Zoom in',
    templates: {
      modern: 'Modern',
      minimalist: 'Minimalist',
      professional: 'Professional'
    },
    fontSize: {
      xs: 'Extra Small',
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
      xl: 'Extra Large'
    },
    languages: {
      fa: 'Persian',
      en: 'English'
    }
  },
  exportMenu: {
    export: 'Export',
    pdf: 'Export as PDF',
    docx: 'Export as DOCX',
    previewNotReady: 'Preview not ready',
    pdfSuccess: 'PDF exported successfully!',
    pdfError: 'Failed to export PDF',
    docxSuccess: 'DOCX exported successfully!',
    docxError: 'Failed to export DOCX'
  },
  settings: {
    title: 'Settings',
    description: 'Choose the interface language, AI provider, and API key.',
    language: 'Interface language',
    languageFa: 'فارسی',
    languageEn: 'English',
    provider: 'AI Provider',
    providerPlaceholder: 'Select provider',
    openai: 'OpenAI (GPT)',
    gemini: 'Google Gemini',
    apiKey: 'API Key',
    active: 'Active',
    showKey: 'Show API key',
    hideKey: 'Hide API key',
    keyHint: 'The key stays in this browser only. Each AI request sends it directly to the provider. Do not share it.',
    privacyTitle: 'Privacy',
    privacyBody:
      'Resumes are stored in your browser. AI requests go from your browser straight to the provider you choose. Nothing is sent to a Varaq server.',
    save: 'Save Settings',
    saved: 'Settings saved',
    keyStored: 'API key has been stored in this browser.',
    keyCleared: 'API key cleared.'
  },
  mic: {
    unsupported: 'Voice input is not supported in this browser',
    stop: 'Stop listening',
    start: 'Voice input'
  },
  ai: {
    enhance: 'Enhance with AI',
    apply: 'Apply enhanced text',
    discard: 'Discard',
    nothingToEnhance: 'Nothing to enhance — write some text first',
    applied: 'Enhanced text applied!',
    keyMissing: 'Add your API key in Settings first',
    atsButton: 'ATS Check',
    atsTitle: 'ATS Compatibility Check',
    atsDescription: 'See how well your resume fits applicant tracking systems',
    atsIntro: 'The check scores keywords, structure, and clarity, then suggests what to improve.',
    atsRun: 'Run ATS Check',
    atsRunning: 'Analyzing...',
    atsScore: 'ATS score out of 100',
    atsCategories: 'Category breakdown',
    atsSuggestions: 'Suggestions',
    atsAgain: 'Run Again',
    jobButton: 'Job Match',
    jobTitle: 'Job Match Analysis',
    jobDescription: 'Paste a job description to see how well your resume matches',
    jobPlaceholder: 'Paste the full job description here...',
    jobRun: 'Analyze Match',
    jobRunning: 'Analyzing...',
    jobScore: 'Match score',
    jobMissing: 'Missing keywords',
    jobSuggestions: 'Suggestions',
    jobAgain: 'Analyze Another Job',
    jobEmpty: 'Paste a job description first',
    translateButton: 'Translate',
    translateTitle: 'Translate Resume',
    translateDescription: 'Translate the resume text into another language',
    translateTarget: 'Target language',
    translateNote:
      'Name, title, summary, experience, education, and skills are translated. Company and institution names stay as they are.',
    translateRun: 'Translate to {language}',
    translateRunning: 'Translating...',
    translateDone: 'Resume translated to {language}',
    categories: {
      keywords: 'Keywords',
      formatting: 'Formatting',
      sections: 'Sections',
      experience: 'Experience',
      education: 'Education',
      summary: 'Summary',
      skills: 'Skills'
    },
    priority: {
      high: 'High',
      medium: 'Medium',
      low: 'Low'
    },
    actions: {
      add: 'Add',
      modify: 'Edit',
      emphasize: 'Emphasize'
    },
    languages: {
      Persian: 'Persian',
      English: 'English',
      Indonesian: 'Indonesian',
      Japanese: 'Japanese',
      Korean: 'Korean',
      'Chinese (Simplified)': 'Chinese (Simplified)',
      Spanish: 'Spanish',
      German: 'German',
      French: 'French',
      Arabic: 'Arabic',
      Portuguese: 'Portuguese',
      Hindi: 'Hindi'
    },
    errors: {
      keyRequired: 'An API key is required. Add it in Settings.',
      parse: 'The AI response could not be read. Please try again.',
      empty: 'The AI returned an empty response. Please try again.',
      enhance: 'Could not enhance the text',
      ats: 'ATS check failed',
      match: 'Job match analysis failed',
      translate: 'Translation failed'
    }
  },
  validation: {
    fullName: 'Full name is required',
    email: 'Invalid email address',
    url: 'Invalid URL',
    company: 'Company name is required',
    position: 'Position is required',
    startDate: 'Start date is required',
    institution: 'Institution is required',
    degree: 'Degree is required',
    skill: 'Skill name is required',
    title: 'Resume title is required'
  }
} as const

type SameShape<T> = {
  [K in keyof T]: T[K] extends string ? string : SameShape<T[K]>
}

export type Dictionary = SameShape<typeof en>
