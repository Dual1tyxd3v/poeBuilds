import styled from 'styled-components';
import { Build } from '../types';
import { SORT_TAB } from '../config';
import { useEffect, useState } from 'react';
import { sortBuilds } from '../utils';
import { HiArrowsUpDown } from 'react-icons/hi2';
import NavTab from './NavTab';

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
  margin-bottom: 1rem;

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

const BtnReverseSort = styled.button`
  border: none;
  background-color: transparent;
  color: var(--color-text--primary);
  cursor: pointer;

  &:hover {
    color: var(--color-text--active);

    & svg {
      stroke-width: 1;
    }
  }
`;

export default function Nav({ builds }: NavProps) {
  const [sort, setSort] = useState(SORT_TAB.Name);
  const [sortedBuilds, setSortedBuilds] = useState(sortBuilds(builds, sort));

  useEffect(() => {
    setSortedBuilds((prev) => sortBuilds(prev, sort));
  }, [sort]);

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
        <BtnReverseSort onClick={() => setSortedBuilds((prev) => [...prev].reverse())}>
          <HiArrowsUpDown size={'2rem'} />
        </BtnReverseSort>
      </SelectBlock>

      <ul>
        {sortedBuilds.map((build) => (
          <NavTab key={`build_${build.id}`} build={build} />
        ))}
      </ul>
    </Navigation>
  );
}
