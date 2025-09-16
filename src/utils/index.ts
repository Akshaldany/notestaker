import type { Note, AppSettings, ExportFormat } from '../types';

const NOTES_STORAGE_KEY = 'notestaker_notes';
const SETTINGS_STORAGE_KEY = 'notestaker_settings';
const THEME_STORAGE_KEY = 'notestaker_theme';

// Local Storage Functions
export const storage = {
  // Notes
  getNotes: (): Note[] => {
    try {
      const stored = localStorage.getItem(NOTES_STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return parsed.map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
    } catch (error) {
      console.error('Error loading notes from storage:', error);
      return [];
    }
  },

  saveNotes: (notes: Note[]): void => {
    try {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes to storage:', error);
      throw new Error('Failed to save notes. Storage may be full.');
    }
  },

  // Settings
  getSettings: (): AppSettings => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!stored) {
        return {
          autoSave: true,
          autoSaveInterval: 5000,
          defaultSortBy: 'updatedAt',
          defaultSortOrder: 'desc',
          showPreview: true,
          enableKeyboardShortcuts: true,
        };
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error loading settings from storage:', error);
      return {
        autoSave: true,
        autoSaveInterval: 5000,
        defaultSortBy: 'updatedAt',
        defaultSortOrder: 'desc',
        showPreview: true,
        enableKeyboardShortcuts: true,
      };
    }
  },

  saveSettings: (settings: AppSettings): void => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings to storage:', error);
    }
  },

  // Theme
  getTheme: (): string => {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) || 'system';
    } catch (error) {
      return 'system';
    }
  },

  saveTheme: (theme: string): void => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.error('Error saving theme to storage:', error);
    }
  },
};

// Date formatting utilities
export const formatDate = {
  short: (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  },

  long: (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  },

  relative: (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return formatDate.short(date);
  },
};

// Search and filter utilities
export const searchNotes = (notes: Note[], query: string): Note[] => {
  if (!query.trim()) return notes;
  
  const lowercaseQuery = query.toLowerCase();
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(lowercaseQuery) ||
      note.content.toLowerCase().includes(lowercaseQuery) ||
      note.tags.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const filterNotesByTags = (notes: Note[], tags: string[]): Note[] => {
  if (tags.length === 0) return notes;
  
  return notes.filter((note) =>
    tags.every((tag) => note.tags.includes(tag))
  );
};

export const sortNotes = (
  notes: Note[],
  sortBy: keyof Note,
  order: 'asc' | 'desc'
): Note[] => {
  return [...notes].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    // Handle date objects
    if (aValue instanceof Date && bValue instanceof Date) {
      const aTime = aValue.getTime();
      const bTime = bValue.getTime();
      return order === 'asc' ? aTime - bTime : bTime - aTime;
    }

    // Handle strings
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const aLower = aValue.toLowerCase();
      const bLower = bValue.toLowerCase();
      if (order === 'asc') {
        return aLower < bLower ? -1 : aLower > bLower ? 1 : 0;
      } else {
        return aLower > bLower ? -1 : aLower < bLower ? 1 : 0;
      }
    }

    // Handle other types
    if (aValue !== undefined && bValue !== undefined) {
      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    }

    return 0;
  });
};

// Export utilities
export const exportNote = (note: Note, format: ExportFormat): void => {
  let content = '';
  let filename = '';

  if (format === 'md') {
    content = `# ${note.title}\n\n${note.content}\n\n---\n\n**Tags:** ${note.tags.join(', ')}\n**Created:** ${formatDate.long(note.createdAt)}\n**Updated:** ${formatDate.long(note.updatedAt)}`;
    filename = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
  } else {
    content = `${note.title}\n\n${note.content}\n\nTags: ${note.tags.join(', ')}\nCreated: ${formatDate.long(note.createdAt)}\nUpdated: ${formatDate.long(note.updatedAt)}`;
    filename = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
  }

  downloadFile(content, filename);
};

export const exportAllNotes = (notes: Note[], format: ExportFormat): void => {
  let content = '';
  let filename = '';

  if (format === 'md') {
    content = notes
      .map(
        (note) =>
          `# ${note.title}\n\n${note.content}\n\n**Tags:** ${note.tags.join(', ')}\n**Created:** ${formatDate.long(note.createdAt)}\n**Updated:** ${formatDate.long(note.updatedAt)}\n\n---\n\n`
      )
      .join('');
    filename = `all_notes_${formatDate.short(new Date()).replace(/[^a-z0-9]/gi, '_')}.md`;
  } else {
    content = notes
      .map(
        (note) =>
          `${note.title}\n\n${note.content}\n\nTags: ${note.tags.join(', ')}\nCreated: ${formatDate.long(note.createdAt)}\nUpdated: ${formatDate.long(note.updatedAt)}\n\n${'='.repeat(50)}\n\n`
      )
      .join('');
    filename = `all_notes_${formatDate.short(new Date()).replace(/[^a-z0-9]/gi, '_')}.txt`;
  }

  downloadFile(content, filename);
};

const downloadFile = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Validation utilities
export const validateNote = (title: string, content: string): string | null => {
  if (!title.trim()) {
    return 'Title is required';
  }
  if (title.length > 100) {
    return 'Title must be less than 100 characters';
  }
  if (content.length > 50000) {
    return 'Content must be less than 50,000 characters';
  }
  return null;
};

// Theme utilities
export const getSystemTheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const applyTheme = (theme: 'light' | 'dark' | 'system'): void => {
  const root = document.documentElement;
  
  if (theme === 'system') {
    const systemTheme = getSystemTheme();
    root.classList.toggle('dark', systemTheme === 'dark');
  } else {
    root.classList.toggle('dark', theme === 'dark');
  }
};

// Debounce utility for autosave
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};