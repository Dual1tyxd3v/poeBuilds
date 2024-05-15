import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  color: var(--color-text--primary);
`;

export default function Build() {
  const { id } = useParams();

  if (!id) return null;
  return <Container>{id} build</Container>;
}
