import styled from 'styled-components';
import { Item as ItemType } from '../types';
import { MouseEvent } from 'react';

type SlotProps = {
  slot: string;
  $isactive: boolean;
};

const Slot = styled.div<SlotProps>`
  border-radius: 5px;
  box-shadow: inset 0 0 12px #0009;
  grid-area: ${(props) => props.slot};
  background-color: ${(props) => (props.$isactive ? 'var(--color-bg--active)' : 'var(--color-slot)')};
  padding: 0.5rem;
`;

type ItemProps = {
  slot: string;
  item: ItemType;
  setActive: (v: null | ItemType) => void;
  isActive: boolean;
};

export default function Item({ slot, item, setActive, isActive }: ItemProps) {
  const {
    img,
    stats: { name },
  } = item;

  function onMouseHandler(e: MouseEvent) {
    setActive(e.type === 'mouseenter' ? item : null);
  }
  return (
    <Slot $isactive={isActive} slot={slot} onMouseEnter={onMouseHandler} onMouseLeave={onMouseHandler}>
      <img src={img} alt={name.join(' ')} />
    </Slot>
  );
}
