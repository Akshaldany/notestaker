import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNotes } from '@/context/NotesContext';
import { debounce } from '@/utils';

export const SearchBar: React.FC = () => {
  const { searchFilters, setSearchFilters } = useNotes();
  const [localQuery, setLocalQuery] = useState(searchFilters.query);

  // Debounced search function
  const debouncedSearch = React.useMemo(
    () => debounce((query: string) => {
      setSearchFilters({ query });
    }, 300),
    [setSearchFilters]
  );

  useEffect(() => {
    debouncedSearch(localQuery);
  }, [localQuery, debouncedSearch]);

  const handleClear = () => {
    setLocalQuery('');
    setSearchFilters({ query: '' });
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search notes..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="pl-9 pr-9"
      />
      {localQuery && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};