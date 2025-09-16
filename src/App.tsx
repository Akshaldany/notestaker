import React from 'react';
import { NotesProvider } from './context/NotesContext';
import { ThemeProvider } from './context/ThemeContext';
import { Dashboard } from './pages/Dashboard';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import type { KeyboardShortcut } from './types';

function App() {
  // Global keyboard shortcuts
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'n',
      ctrlKey: true,
      action: () => {
        // This will be handled by the Dashboard component
        const event = new CustomEvent('newNote');
        window.dispatchEvent(event);
      },
      description: 'Create new note'
    },
    {
      key: 'f',
      ctrlKey: true,
      action: () => {
        // Focus search input
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      },
      description: 'Focus search'
    }
  ];

  useKeyboardShortcuts(shortcuts);

  return (
    <ThemeProvider>
      <NotesProvider>
        <Dashboard />
      </NotesProvider>
    </ThemeProvider>
  );
}

export default App;