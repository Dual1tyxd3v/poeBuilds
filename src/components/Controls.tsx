import { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { MdDeleteForever } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

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
  background-color: var(--color-text--primary);
  transition: clip-path 0.2s ease;
`;

const MenuButton = styled.button`
  background-color: #000;
  font-size: 1.2rem;
  width: 100%;
  border: none;
  cursor: pointer;
  padding: 0.15rem 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: var(--color-text--primary);

  &:not(:last-child) {
    margin-bottom: 0.1rem;
  }

  &:hover {
    background-color: var(--color-bg--hover);
  }
`;

type ControlsProps = {
  deleteAction: () => void;
  route: string;
};

export default function Controls({ deleteAction, route }: ControlsProps) {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  function onClickHandler(e: MouseEvent) {
    e.stopPropagation();
    const { id } = (e.target as HTMLButtonElement).dataset;
    if (id === 'delete') {
      deleteAction();
    }
    if (id === 'edit') {
      navigate(route);
    }
  }

  function onContainerClickHandler(e: MouseEvent) {
    e.stopPropagation();
    setIsActive((prev) => !prev);
  }
  return (
    <Container $isactive={isActive} onClick={onContainerClickHandler} data-id="controls">
      <Menu $isactive={isActive}>
        <MenuButton title="Edit" type="button" data-id="edit" onClick={onClickHandler}>
          <MdEdit size="1.5rem" />
          Edit
        </MenuButton>
        <MenuButton title="Delete" type="button" data-id="delete" onClick={onClickHandler}>
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
