import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppRoute } from '../config';

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

const MyLink = styled(Link)`
  background: url(/images/button.png) center center no-repeat;
  background-size: contain;
  display: block;
  font-size: 2rem;
  color: #000;
  font-family: 'FontinCard';
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  filter: brightness(0.8);
  transition: filter 0.2s ease, text-shadow 0.2s ease;

  &:hover {
    filter: brightness(1);
    text-shadow: 2px 4px 8px var(--color-text--active);
  }

  & span {
    display: block;
    padding: 5rem 10rem;
  }
`;

export default function NotFound() {
  return (
    <Container>
      <Title>Page not found</Title>
      <MyLink to={AppRoute.Main}>
        <span>Back to main</span>
      </MyLink>
    </Container>
  );
}
