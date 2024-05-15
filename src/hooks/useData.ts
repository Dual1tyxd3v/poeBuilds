import { useEffect, useState } from 'react';
import { GetBuildsResponse } from '../types';

type ApiFn = () => Promise<GetBuildsResponse>;

export const useData = (apiFN: ApiFn) => {
  const [isLoading, setIsLoading] = useState(true);
  const [resp, setResp] = useState<GetBuildsResponse>({ data: [], error: null });

  useEffect(() => {
    async function getData() {
      const response = await apiFN();
      setResp(response);
      setIsLoading(false);
    }

    getData();
  }, []);

  return { isLoading, resp };
};
