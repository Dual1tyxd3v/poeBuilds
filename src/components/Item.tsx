import { Item as ItemType } from '../types';
import { MouseEvent } from 'react';
import Slot from '../ui/Slot';

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
    <Slot $isactive={isActive} $slot={slot} onMouseEnter={onMouseHandler} onMouseLeave={onMouseHandler}>
      <img src={img} alt={name.join(' ')} />
    </Slot>
  );
}
