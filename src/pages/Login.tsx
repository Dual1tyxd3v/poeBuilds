import styled from 'styled-components';
import Button from '../ui/Button';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { login } from '../api';
import { useMyContext } from '../hooks/useMyContext';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../config';
import Loader from '../components/Loader';

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  padding: 4rem 7rem;
  background: url(/images/login-bg.png) center center no-repeat;
  background-size: 100% 100%;
  color: var(--color-text--primary);
  font-family: 'FontinCard';
`;

const Title = styled.h3`
  font-size: 3.5rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
  margin-bottom: 1.5rem;
  text-align: center;

  &::after {
    content: '';
    display: block;
    height: 12px;
    background: url(/images/title-border.png) center center no-repeat;
    background-size: contain;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-text--primary);
  font-size: 1.6rem;
  min-width: 40rem;
  padding: 0.5rem;
  background-color: #000;
  margin-bottom: 1rem;

  & label {
    cursor: text;
  }

  &:last-child {
    margin-bottom: 2rem;
  }

  &:has(input:focus) {
    outline: 1px solid var(--color-text--active);
  }
`;

const Input = styled.input`
  padding: 0.5rem 0;
  outline: none;
  border: none;
  background-color: transparent;
  color: inherit;
  font-size: inherit;
  font-family: 'Verdana';
`;

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { auth, changeAuthStatus } = useMyContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === 'auth') navigate(AppRoute.Main);
  }, [auth, navigate]);

  function onChangeHandler(e: ChangeEvent) {
    const input = e.target as HTMLInputElement;

    setFormData({ ...formData, [input.id]: input.value });
  }

  if (auth === 'unknown') return <Loader />;

  async function onSubmitHandler(e: FormEvent) {
    e.preventDefault();

    if (!formData.email || !formData.password) return;

    const { data } = await login(formData.email, formData.password);

    if (data?.user) changeAuthStatus(AuthStatus.Auth);
  }
  return (
    <Container>
      <Form onSubmit={onSubmitHandler}>
        <Title>Sign in</Title>
        <Field>
          <label htmlFor="email">Email</label>
          <Input type="text" id="email" value={formData.email} onChange={onChangeHandler} />
        </Field>
        <Field>
          <label htmlFor="password">Password</label>
          <Input type="password" id="password" value={formData.password} onChange={onChangeHandler} />
        </Field>
        <Button style={{ margin: '0 auto' }}>Sign in</Button>
      </Form>
    </Container>
  );
}
