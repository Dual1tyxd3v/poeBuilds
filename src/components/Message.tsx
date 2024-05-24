import styled from 'styled-components';
import { useAppDispatch } from '../store';
import { setMessage } from '../store/reducer';
import ButtonPrimary from '../ui/ButtonPrimary';

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

export default function Message({ msg }: MessageProps) {
  const dispatch = useAppDispatch();
  return (
    <Container>
      <Text>{msg}</Text>
      <ButtonPrimary onClick={() => dispatch(setMessage(''))}>
        <span>Ok</span>
      </ButtonPrimary>
    </Container>
  );
}
