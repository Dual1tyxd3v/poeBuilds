import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex: 1;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Spinner = styled.div`
  width: 10rem;
  aspect-ratio: 1;
  display: grid;
  color: var(--color-text--primary);
  background: radial-gradient(farthest-side, currentColor calc(100% - 12px), #0000 calc(100% - 10px) 0);
  mask: radial-gradient(farthest-side, #0000 calc(100% - 26px), #000 calc(100% - 24px));
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 26px), #000 calc(100% - 24px));
  border-radius: 50%;
  animation: l19 2s infinite linear;

  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    background: linear-gradient(currentColor 0 0) center, linear-gradient(currentColor 0 0) center;
    background-size: 100% 10px, 10px 100%;
    background-repeat: no-repeat;
  }

  &::after {
    transform: rotate(45deg);
  }
`;

export default function Loader() {
  return (
    <Container>
      <Spinner></Spinner>
    </Container>
  );
}
