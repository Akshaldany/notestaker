export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isPinned?: boolean;
  color?: string;
}

export interface NoteFormData {
  title: string;
  content: string;
  tags: string[];
  color?: string;
}

export interface SearchFilters {
  query: string;
  tags: string[];
  sortBy: 'createdAt' | 'updatedAt' | 'title';
  sortOrder: 'asc' | 'desc';
}

export interface NotesContextType {
  notes: Note[];
  selectedNote: Note | null;
  searchFilters: SearchFilters;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addNote: (noteData: NoteFormData) => Promise<void>;
  updateNote: (id: string, noteData: Partial<NoteFormData>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  selectNote: (note: Note | null) => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  togglePinNote: (id: string) => Promise<void>;
  duplicateNote: (id: string) => Promise<void>;
  exportNote: (id: string, format: 'txt' | 'md') => void;
  exportAllNotes: (format: 'txt' | 'md') => void;
}

export interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: () => void;
  description: string;
}

export interface AppSettings {
  autoSave: boolean;
  autoSaveInterval: number; // in milliseconds
  defaultSortBy: 'createdAt' | 'updatedAt' | 'title';
  defaultSortOrder: 'asc' | 'desc';
  showPreview: boolean;
  enableKeyboardShortcuts: boolean;
}

// Utility types
export type NoteSortKey = keyof Pick<Note, 'createdAt' | 'updatedAt' | 'title'>;
export type SortOrder = 'asc' | 'desc';
export type ExportFormat = 'txt' | 'md';
export type NoteColor = 'default' | 'yellow' | 'green' | 'blue' | 'pink' | 'purple';