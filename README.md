# 📝 NoteStaker - Modern Note-Taking Web Application

A clean, modern, and feature-rich note-taking application built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

![NoteStaker Preview](https://via.placeholder.com/800x400/1f2937/ffffff?text=NoteStaker+Preview)

## ✨ Features

### Core Functionality
- ✅ **Create, Edit, Delete Notes** - Full CRUD operations for your notes
- ✅ **Rich Text Editor** - Clean and intuitive note editing experience
- ✅ **Search & Filter** - Quickly find notes by title, content, or tags
- ✅ **Tagging System** - Organize your notes with custom tags
- ✅ **Pin Important Notes** - Keep your most important notes at the top
- ✅ **Duplicate Notes** - Quickly create copies of existing notes

### User Experience
- 🌙 **Dark Mode Toggle** - Switch between light, dark, and system themes
- 💾 **Auto-save** - Your changes are automatically saved as you type
- ⌨️ **Keyboard Shortcuts** - Efficient navigation and actions
- 📱 **Responsive Design** - Perfect on mobile, tablet, and desktop
- 🎨 **Note Colors** - Color-code your notes for better organization
- 📤 **Export Notes** - Export individual notes or all notes as .txt or .md files

### Technical Features
- 🔒 **Local Storage** - All data is stored locally in your browser
- 🚀 **Offline-first** - Works without an internet connection
- ♿ **Accessible** - Built with accessibility in mind
- 🎭 **Smooth Animations** - Polished user experience with Framer Motion

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 with TypeScript
- **Styling:** Tailwind CSS with Architect's Daughter font
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Package Manager:** npm
- **Code Quality:** ESLint + TypeScript

## 📋 Prerequisites

- **Node.js** version 20.19+ or 22.12+ (due to Vite 7 requirements)
- **npm** 8+ or **yarn** 1.22+
- Modern web browser with ES2022 support

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Akshaldany/notestaker.git
   cd notestaker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + N` | Create new note |
| `Ctrl + S` | Save current note |
| `Ctrl + F` | Focus search |
| `Ctrl + Enter` | Save note in editor |
| `Esc` | Close editor/cancel |
| `Ctrl + Shift + T` | Toggle theme |

## 🏗️ Project Structure

```
notestaker/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── NoteCard.tsx  # Individual note display
│   │   ├── NoteEditor.tsx # Note editing interface
│   │   ├── SearchBar.tsx # Search functionality
│   │   ├── TagFilter.tsx # Tag filtering
│   │   └── ThemeToggle.tsx # Theme switcher
│   ├── context/          # React context providers
│   │   ├── NotesContext.tsx # Notes state management
│   │   └── ThemeContext.tsx # Theme state management
│   ├── hooks/            # Custom React hooks
│   │   ├── useAutosave.ts
│   │   ├── useKeyboardShortcuts.ts
│   │   └── useLocalStorage.ts
│   ├── pages/            # Page components
│   │   └── Dashboard.tsx # Main application page
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   ├── constants.ts  # App constants
│   │   └── index.ts     # Utility functions
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # App entry point
│   └── index.css        # Global styles
├── tailwind.config.js    # Tailwind configuration
├── components.json       # shadcn/ui configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## 🎨 Design System

- **Typography:** Architects Daughter font for a friendly, handwritten feel
- **Colors:** Carefully crafted color palette with dark mode support
- **Components:** Consistent shadcn/ui components throughout
- **Spacing:** Tailwind's systematic spacing scale
- **Animations:** Subtle and smooth transitions using Framer Motion

## 🐛 Troubleshooting

### Common Issues

1. **Node.js Version Error**
   - Ensure you're using Node.js 20.19+ or 22.12+
   - Use `node --version` to check your version
   - Consider using `nvm` to manage Node.js versions

2. **Build Errors**
   - Clear cache: `rm -rf node_modules package-lock.json && npm install`
   - Check for TypeScript errors: `npm run build`

3. **Data Not Persisting**
   - Check if localStorage is enabled in your browser
   - Clear browser data and try again
   - Ensure you're not in private/incognito mode

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful UI components
- **Tailwind CSS** for the utility-first CSS framework
- **Radix UI** for the accessible component primitives
- **Lucide** for the clean and consistent icons
- **Framer Motion** for the smooth animations

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**