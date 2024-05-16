import styled from 'styled-components';

const Button = styled.button`
  background: url(/images/button.png) center center no-repeat;
  background-size: 100% 100%;
  display: block;
  padding: 3rem 7rem;
  font-size: 2rem;
  color: #000;
  font-family: 'FontinCard';
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  filter: brightness(0.8);
  transition: filter 0.2s ease, text-shadow 0.2s ease;
  cursor: pointer;
  border: none;

  &:hover {
    filter: brightness(1);
    text-shadow: 2px 4px 8px var(--color-text--active);
  }

`;

export default Button;
