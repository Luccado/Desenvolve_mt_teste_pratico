import { useSearchParams } from 'react-router-dom';

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const getParam = (key: string) => searchParams.get(key);
  const setParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };
  const removeParam = (key: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    setSearchParams(newParams);
  };
  
  return { getParam, setParam, removeParam, searchParams };
}

