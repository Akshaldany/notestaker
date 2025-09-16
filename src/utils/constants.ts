export const APP_NAME = 'NoteStaker';
export const APP_VERSION = '1.0.0';

// Storage keys
export const STORAGE_KEYS = {
  NOTES: 'notestaker_notes',
  SETTINGS: 'notestaker_settings',
  THEME: 'notestaker_theme',
} as const;

// Default settings
export const DEFAULT_SETTINGS = {
  autoSave: true,
  autoSaveInterval: 5000, // 5 seconds
  defaultSortBy: 'updatedAt' as const,
  defaultSortOrder: 'desc' as const,
  showPreview: true,
  enableKeyboardShortcuts: true,
};

// Note colors
export const NOTE_COLORS = {
  default: '#f8fafc',
  yellow: '#fef3c7',
  green: '#d1fae5',
  blue: '#dbeafe',
  pink: '#fce7f3',
  purple: '#e9d5ff',
} as const;

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  NEW_NOTE: 'ctrl+n',
  SAVE_NOTE: 'ctrl+s',
  DELETE_NOTE: 'ctrl+d',
  SEARCH: 'ctrl+f',
  TOGGLE_THEME: 'ctrl+shift+t',
  TOGGLE_SIDEBAR: 'ctrl+b',
} as const;

// UI Constants
export const SIDEBAR_WIDTH = 320;
export const NOTE_CARD_MIN_HEIGHT = 120;
export const SEARCH_DEBOUNCE_DELAY = 300;
export const AUTOSAVE_DEBOUNCE_DELAY = 1000;

// Validation limits
export const VALIDATION_LIMITS = {
  TITLE_MAX_LENGTH: 100,
  CONTENT_MAX_LENGTH: 50000,
  TAG_MAX_LENGTH: 30,
  MAX_TAGS_PER_NOTE: 10,
} as const;

// File export
export const EXPORT_FORMATS = ['txt', 'md'] as const;

// Animation durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  MEDIUM: 300,
  SLOW: 500,
} as const;