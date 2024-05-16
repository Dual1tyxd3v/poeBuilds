import styled from 'styled-components';
import { Item as ItemType } from '../types';
import { MouseEvent } from 'react';

type SlotProps = {
  slot: string;
  isActive: boolean;
};

const Slot = styled.div<SlotProps>`
  border-radius: 5px;
  box-shadow: inset 0 0 12px #0009;
  grid-area: ${(props) => props.slot};
  background-color: ${(props) => (props.isActive ? 'var(--color-bg--active)' : 'rgb(15, 23, 42)')};
  padding: 0.5rem;
`;

type ItemProps = {
  slot: string;
  item: ItemType;
  setActive: (v: null | ItemType) => void;
  isActive: boolean;
};

export default function Item({ slot, item, setActive, isActive }: ItemProps) {
  const { img, name } = item;

  function onMouseHandler(e: MouseEvent) {
    setActive(e.type === 'mouseenter' ? item : null);
  }
  return (
    <Slot isActive={isActive} slot={slot} onMouseEnter={onMouseHandler} onMouseLeave={onMouseHandler}>
      <img src={img} alt={name} />
    </Slot>
  );
}
