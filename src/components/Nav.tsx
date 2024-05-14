import styled from 'styled-components';
import { Build } from '../types';
import { AppRoute, SORT_TAB } from '../config';
import { useState } from 'react';
import { sortBuilds } from '../utils';
import { NavLink } from 'react-router-dom';

type NavProps = {
  builds: Build[];
};

const Navigation = styled.nav`
  height: 100%;
  width: 30rem;
  border-right: 2px solid var(--color-border);
  overflow: auto;
`;

const SelectBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
  padding-bottom: calc(1rem + 2px);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 2px;
    background-color: var(--color-divider);
  }
`;

const SelectLabel = styled.p`
  font-size: 1.6rem;
  color: var(--color-text--primary);
`;

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

const Option = styled.option`
  background-color: var(--color-bg);
`;

export default function Nav({ builds }: NavProps) {
  const [sort, setSort] = useState(SORT_TAB.Name);
  const [sortedBuilds] = useState(sortBuilds(builds, sort));
  console.log(builds);
  return (
    <Navigation>
      <SelectBlock>
        <SelectLabel>Sort by</SelectLabel>
        <Select value={sort} onChange={(e) => setSort(e.target.value as SORT_TAB)}>
          {Object.values(SORT_TAB).map((sort, i) => (
            <Option key={`sort${i}_${sort}`} value={sort}>
              {sort}
            </Option>
          ))}
        </Select>
      </SelectBlock>

      <ul>
        {sortedBuilds.map(({ id, name }) => (
          <li key={`build_${id}`}>
            <NavLink to={`${AppRoute.Main}${id}`}>{name}</NavLink>
          </li>
        ))}
      </ul>
    </Navigation>
  );
}
