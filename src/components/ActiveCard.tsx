import styled from 'styled-components';
import { Item, MousePosition } from '../types';
import { ACTIVE_CARD_OFFSET } from '../config';
import { useEffect, useState } from 'react';
import PreviewItem from './PreviewItem';

type ActiveCardProps = {
  item: Item;
};

type WrapperProps = {
  $position: MousePosition;
};

const Wrapper = styled.div.attrs<WrapperProps>((props) => {
  return {
    style:
      !props.$position.x || !props.$position.y
        ? {
            display: 'none',
          }
        : {
            top: `${props.$position.y}px`,
            left: `${props.$position.x + ACTIVE_CARD_OFFSET}px`,
          },
  };
})`
  position: fixed;
  width: 40px;
  height: 50px;
  background-color: #fff;
`;

export default function ActiveCard({ item }: ActiveCardProps) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  useEffect(() => {
    const getMousePosition = (e: MouseEventInit) => {
      const { clientX: x, clientY: y } = e;

      if (!x || !y) return;

      setMousePosition({ x, y });
    };

    document.addEventListener('mousemove', getMousePosition);

    return () => document.removeEventListener('mousemove', getMousePosition);
  }, []);

  return (
    <Wrapper $position={mousePosition}>
      <PreviewItem needInfo={false} item={item} />
    </Wrapper>
  );
}
