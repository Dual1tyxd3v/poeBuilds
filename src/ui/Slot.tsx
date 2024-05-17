import styled from 'styled-components';

type SlotProps = {
  $slot: string;
  $isactive: boolean;
};

const Slot = styled.div<SlotProps>`
  border-radius: 5px;
  box-shadow: inset 0 0 12px #0009;
  grid-area: ${(props) => props.$slot};
  background-color: ${(props) => (props.$isactive ? 'var(--color-bg--active)' : 'var(--color-slot)')};
  padding: 0.5rem;
`;

export default Slot;
