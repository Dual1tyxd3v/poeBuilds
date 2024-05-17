import styled from 'styled-components';

const Select = styled.select`
  background-color: transparent;
  color: var(--color-text--active);
  font-family: 'FontinBold';
  text-transform: capitalize;
  padding: 0.2rem;

  &:focus {
    outline: none;
  }
`;

export default Select;
