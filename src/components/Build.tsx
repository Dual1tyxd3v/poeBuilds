import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getBuildDetails } from '../api';
import Loader from './Loader';
import { useEffect, useState } from 'react';
import { Build as BuildType } from '../types';
import BuildHeader from './BuildHeader';

const Container = styled.div`
  flex: 1;
  color: var(--color-text--primary);
`;

export default function Build() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [build, setBuild] = useState<null | BuildType>(null);

  useEffect(() => {
    async function getData(id: number) {
      setIsLoading(true);
      const resp = await getBuildDetails(id);
      setIsLoading(false);
      if (!resp.data) return;

      setBuild(resp.data.build[0]);
    }

    if (!id) return;

    getData(+id);
  }, [id]);

  if (isLoading) return <Loader />;

  if (!build) return null;

  const { name, pob } = build;
  return (
    <Container>
      <BuildHeader name={name} pob={pob} />
    </Container>
  );
}
