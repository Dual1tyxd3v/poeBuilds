import { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { MdDeleteForever } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';

type ContainerProps = {
  $isactive: boolean;
};

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  ${(props) => (props.$isactive ? 'clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%) !important;' : '')}
`;

const Button = styled.button`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 0 0.5rem;
`;

const Span = styled.span`
  background-color: var(--color-text--primary);
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  display: block;
`;

type MenuProps = {
  $isactive: boolean;
};

const Menu = styled.div<MenuProps>`
  width: 100px;

  background-color: var(--color-text--primary);
  transition: clip-path 0.2s ease;
`;

const MenuButton = styled.div`
  background-color: #000;
  font-size: 1.2rem;
  padding: 0.15rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 0.1rem;
  }

  &:hover {
    background-color: var(--color-bg--hover);
  }
`;

export default function Controls() {
  const [isActive, setIsActive] = useState(false);

  function onClickHandler(e: MouseEvent) {
    e.stopPropagation();
  }
  return (
    <Container $isactive={isActive} onClick={() => setIsActive((prev) => !prev)} data-id="controls">
      <Menu $isactive={isActive}>
        <MenuButton onClick={onClickHandler}>
          <MdEdit size="1.5rem" />
          Edit
        </MenuButton>
        <MenuButton onClick={onClickHandler}>
          <MdDeleteForever size="1.5rem" />
          Delete
        </MenuButton>
      </Menu>
      <Button type="button" title="Menu">
        <Span></Span>
        <Span></Span>
        <Span></Span>
      </Button>
    </Container>
  );
}
