import { NavLink } from 'react-router-dom';
import { AppRoute } from '../config';
import { Build } from '../types';
import styled from 'styled-components';
import Controls from './Controls';
import { useCallback } from 'react';
import { useAppDispatch } from '../store';
import { deleteBuildAction, getBuildsAction } from '../store/async-actions';

type NavTabProps = {
  build: Build;
};

const A = styled(NavLink)`
  display: block;
  color: var(--color-text--primary);
  text-align: center;
  font-family: 'Fontin';
  padding: 0.5rem 0;
  transition: background-color 0.2s ease;

  &.active {
    background-color: var(--color-bg--active);
  }
`;

const Li = styled.li`
  position: relative;
  & div[data-id='controls'] {
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
    transition: clip-path 0.3s ease;
  }

  &:hover {
    background-color: var(--color-bg--hover);

    & div[data-id='controls'] {
      clip-path: polygon(calc(100% - 15px) 0, 100% 0, 100% 100%, calc(100% - 15px) 100%);
    }
  }
`;

const Title = styled.p`
  font-size: 2rem;
  text-transform: capitalize;
`;

const Description = styled.p`
  font-size: 1.4rem;
`;

const Value = styled.span`
  color: var(--color-text--mods);
`;

export default function NavTab({ build }: NavTabProps) {
  const dispatch = useAppDispatch();
  const { id, name, difficulty, damage } = build;

  const onDeleteAction = useCallback(async () => {
    const { payload } = await dispatch(deleteBuildAction(id));
    const { isSuccess } = payload as { isSuccess: boolean; error: string };

    isSuccess && dispatch(getBuildsAction());
  }, [id, dispatch]);

  return (
    <Li>
      <A to={`${AppRoute.Main}build/${id}`}>
        <Title>{name}</Title>
        <Description>
          Damage: <Value>{damage}</Value> Difficulty: <Value>{difficulty}</Value>
        </Description>
      </A>
      <Controls route={`test`} deleteAction={onDeleteAction} />
    </Li>
  );
}
