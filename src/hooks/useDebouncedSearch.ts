import { useState, useRef, useCallback } from 'react';
import { debounce } from '../utils';

export const useDebouncedSearch = <T>(
  initialValue: T,
  delay: number = 2000,
  onSearch: (value: T) => void
) => {
  const [value, setValue] = useState<T>(initialValue);
  const previousValueRef = useRef<T>(initialValue);

  const debouncedSearch = useCallback(
    debounce((searchValue: T) => {
      onSearch(searchValue);
    }, delay),
    [delay, onSearch]
  );

  const handleValueChange = useCallback((newValue: T) => {
    // Verificar se houve mudanças reais nos valores
    const hasRealChanges = Object.keys(newValue).some(key => {
      const currentValue = (newValue as any)[key];
      const previousValue = (previousValueRef.current as any)[key];
      return currentValue !== previousValue;
    });
    
    if (hasRealChanges) {
      // Atualizar valores anteriores
      previousValueRef.current = { ...newValue };
      
      // Só disparar busca automática se houver mudanças nos campos de busca
      const hasSearchChanges = Object.keys(newValue).some(key => {
        const val = (newValue as any)[key];
        return val !== undefined && val !== '';
      });
      
      if (hasSearchChanges) {
        debouncedSearch(newValue);
      }
    }
  }, [debouncedSearch]);

  return {
    value,
    setValue,
    handleValueChange
  };
};
