<div align="center">

# ✨ Varaq

### Bilingual resume builder — Persian by default, English when you need it

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Varaq** is an open-source resume builder with a Persian (fa-IR) interface, full RTL layout, and an English mode you can switch to at any time. Live preview, three templates, PDF and DOCX export, and optional writing help all run in the browser.

[🚀 Live Demo](https://auto-resume-eight.vercel.app) · [📖 Documentation](#usage) · [🐛 Report Bug](../../issues) · [💡 Request Feature](../../issues)

</div>

---

## 🎯 Why Varaq?

- 🔒 **Private by default** — Resumes stay in your browser. An API key, if you add one, is stored locally and sent only to the provider you choose.
- 🇮🇷 **Persian first** — The interface defaults to Persian and lays out correctly right-to-left. English is one setting away.
- 🎨 **Three templates** — Modern, Professional, and Minimalist, each usable for Persian or English resume content.
- 📄 **Export** — Download the live preview as PDF or the resume data as DOCX.
- 📱 **Responsive** — The editor works on desktop and stacks cleanly on smaller screens.
- 🆓 **MIT licensed** — Free to use, change, and share.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 📝 Editor
- Personal info, summary, experience, education, and skills
- Validation and auto-save in the browser
- Several resumes: create, duplicate, and delete
- Voice input where the browser supports it

</td>
<td width="50%">

### 🌐 Language
- Interface language: Persian or English, saved in settings
- Resume language is separate, so a Persian UI can edit an English resume
- Vazirmatn for Persian, Inter and other typefaces for English
- Email, phone, and URL fields stay left-to-right

</td>
</tr>
<tr>
<td width="50%">

### 🎨 Preview and export
- Modern, Professional, and Minimalist templates
- Live preview, zoom, font family, and font size
- A4 PDF export
- DOCX export

</td>
<td width="50%">

### ✍️ Writing help (optional)
- Improve a summary or a bullet
- ATS compatibility check
- Match a resume against a job description
- Translate resume text
- Bring your own OpenAI or Gemini key

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | Next.js 16, React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 4, Radix UI, Lucide Icons |
| **State** | Zustand, React Hook Form, Zod |
| **Animation** | Motion |
| **Writing help** | OpenAI and Google Gemini REST APIs |
| **Storage** | LocalForage, browser localStorage |
| **Export** | html2canvas, jsPDF, docx |
| **Tooling** | ESLint, Prettier, Husky |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **pnpm** ([Install](https://pnpm.io/installation))

### Installation

```bash
git clone https://github.com/holymaiden/auto-resume.git
cd auto-resume
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Optional: writing help

1. Open **Settings** from the header.
2. Choose **OpenAI** or **Google Gemini**.
3. Paste an API key. It stays in this browser.
4. Use the writing actions in the editor.

The builder works without a key. Those actions stay unavailable until a key is saved.

To check a key from the terminal without printing it:

```bash
# PowerShell
$env:GEMINI_API_KEY = "your-key"
pnpm verify:ai
Remove-Item Env:GEMINI_API_KEY
```

`OPENAI_API_KEY` works the same way. Do not commit either value.

---

## 📁 Project Structure

```
auto-resume/
├── src/
│   ├── app/                         # App Router: dashboard and editor
│   ├── components/
│   │   ├── ai/                      # Enhance, ATS, job match, translate
│   │   ├── editor/                  # Form, preview, templates, export
│   │   ├── layout/                  # Header and providers
│   │   ├── settings/                # Language, provider, API key
│   │   └── ui/                      # Shared controls
│   ├── hooks/
│   ├── lib/
│   │   ├── ai/                      # Provider client and prompts
│   │   └── i18n/                    # Persian and English dictionaries
│   ├── schemas/
│   ├── stores/
│   └── types/
├── scripts/verify-ai.mts
├── package.json
└── tsconfig.json
```

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Production build |
| `pnpm start` | Run the production server |
| `pnpm lint` | ESLint |
| `pnpm format` | Format with Prettier |
| `pnpm format:check` | Check formatting |
| `pnpm test` | Dictionary and locale checks |
| `pnpm verify:ai` | One live provider request, if a key is set in the shell |

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature/my-change`)
3. Commit your changes
4. Push and open a pull request

Ideas that are still open: more templates, offline install as a PWA, and broader automated tests.

---

## 📄 License

MIT — see [LICENSE](LICENSE).

---

## ⭐ Show Your Support

If Varaq is useful, a star on GitHub helps other people find it.

<div align="center">

**Built with ❤️ by [holymaiden](https://github.com/holymaiden)**

[⬆ Back to Top](#-varaq)

</div>
