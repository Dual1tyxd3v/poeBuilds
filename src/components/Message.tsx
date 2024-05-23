import styled from 'styled-components';
import { useAppDispatch } from '../store';
import { setMessage } from '../store/reducer';

type MessageProps = {
  msg: string;
};

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url(/images/login-bg.png) no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  text-align: center;
  padding: 2rem;
  z-index: 5;
  font-family: 'FontinCard';
`;

const Text = styled.p`
  font-size: 2rem;
  color: var(--color-text--primary);
  margin-bottom: 3rem;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;

  & span {
    display: block;
    color: var(--color-text--active);
    font-size: 1.6rem;
    font-weight: 600;
    padding: 0.5rem 1.5rem;
    background-color: #5c3e28;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  &:hover span {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px var(--color-bg--hover);
  }
`;

export default function Message({ msg }: MessageProps) {
  const dispatch = useAppDispatch();
  return (
    <Container>
      <Text>{msg}</Text>
      <Button onClick={() => dispatch(setMessage(''))}>
        <span>Ok</span>
      </Button>
    </Container>
  );
}
