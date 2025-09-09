import { useQuery, useMutation } from '@tanstack/react-query';
import { getPessoa, postInformacao } from './people';
import { formatDateForAPI } from '../utils';
import { InfoPayload } from '../types/people';

export const usePersonDetails = (id: string | undefined) => {
  const query = useQuery({
    queryKey: ['pessoa', id],
    queryFn: () => getPessoa(Number(id)),
    enabled: !!id,
  });

  return query;
};

export const usePersonInfoMutation = () => {
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return postInformacao({
        ocoId: data.ocoId,
        informacao: data.informacao,
        descricao: data.descricao,
        data: formatDateForAPI(data.data),
        files: data.files,
        latitude: data.coords?.lat,
        longitude: data.coords?.lng,
      });
    },
  });

  return mutation;
};
