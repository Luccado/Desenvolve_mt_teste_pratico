import { useQuery } from '@tanstack/react-query';

const checkApiStatus = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/pessoas/aberto/estatistico', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(5000)
    });
    return response.ok;
  } catch (error) {
    console.warn('⚠️ Erro ao verificar status da API:', error);
    return false;
  }
};

export const useApiStatus = () => {
  return useQuery({
    queryKey: ['api-status'],
    queryFn: checkApiStatus,
    refetchInterval: 30000, // Re-verificar a cada 30 segundos
    refetchIntervalInBackground: true,
    retry: 1,
    staleTime: 10000, // Considera os dados "frescos" por 10 segundos
  });
};
