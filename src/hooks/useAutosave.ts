import { useEffect, useRef, useCallback } from 'react';
import { debounce } from '../utils';

interface UseAutosaveOptions {
  delay?: number;
  enabled?: boolean;
}

export function useAutosave<T>(
  data: T,
  saveFunction: (data: T) => void,
  options: UseAutosaveOptions = {}
) {
  const { delay = 1000, enabled = true } = options;
  const savedDataRef = useRef<T>(data);
  const saveTimeoutRef = useRef<number | undefined>(undefined);

  const debouncedSave = useCallback(
    debounce((dataToSave: T) => {
      if (enabled && JSON.stringify(dataToSave) !== JSON.stringify(savedDataRef.current)) {
        saveFunction(dataToSave);
        savedDataRef.current = dataToSave;
      }
    }, delay),
    [saveFunction, delay, enabled]
  );

  useEffect(() => {
    if (enabled) {
      debouncedSave(data);
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [data, debouncedSave, enabled]);

  const forceSave = useCallback(() => {
    if (JSON.stringify(data) !== JSON.stringify(savedDataRef.current)) {
      saveFunction(data);
      savedDataRef.current = data;
    }
  }, [data, saveFunction]);

  return { forceSave };
}