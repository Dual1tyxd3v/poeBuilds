import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppRoute } from '../config';
import Button from '../ui/Button';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 3rem;
  font-family: 'FontinBold';
  color: var(--color-text--primary);
  margin-bottom: 3rem;
`;

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Page not found</Title>
      <Button onClick={() => navigate(AppRoute.Main)}>Back to main</Button>
    </Container>
  );
}
