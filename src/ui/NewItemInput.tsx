import styled from 'styled-components';

const Input = styled.input`
  outline: none;
  background-color: var(--color-slot);
  border: none;
  width: 100%;
  font-size: 1.4rem;
  padding: 0.2rem;
  color: var(--color-text--primary);
  text-align: center;

  &:placeholder-shown {
    color: var(--color-text--default);
  }

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  &:focus {
    background-color: var(--color-bg--active);
    color: #fff;
  }
`;

export default Input;
