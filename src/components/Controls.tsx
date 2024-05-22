import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Button = styled.button`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 0 0.5rem;
`;

const Span = styled.span`
  background-color: var(--color-text--primary);
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  display: block;
`;

export default function Controls() {
  return (
    <Container>
      <Button title="Menu">
        <Span></Span>
        <Span></Span>
        <Span></Span>
      </Button>
    </Container>
  );
}
