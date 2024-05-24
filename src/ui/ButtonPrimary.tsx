import { styled } from 'styled-components';

const ButtonPrimary = styled.button`
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

export default ButtonPrimary;
