import styled from 'styled-components';
import { Build } from '../types';
import { AppRoute, SORT_TAB } from '../config';
import { useEffect, useState } from 'react';
import { sortBuilds } from '../utils';
import { HiArrowsUpDown } from 'react-icons/hi2';
import { TiPlus } from 'react-icons/ti';
import NavTab from './NavTab';
import { useNavigate } from 'react-router-dom';
import Select from '../ui/Select';
import Option from '../ui/Option';
import { useSelector } from 'react-redux';
import { getAuthStatus } from '../store/selectors';

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

const Button = styled.button`
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
  const navigate = useNavigate();
  const auth = useSelector(getAuthStatus);

  useEffect(() => {
    setSortedBuilds(() => sortBuilds(builds, sort));
  }, [sort, builds]);

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
        <Button
          title="Reverse"
          aria-label="Reverse tabs"
          onClick={() => setSortedBuilds((prev) => [...prev].reverse())}
        >
          <HiArrowsUpDown size="2rem" />
        </Button>
        {auth === 'auth' && (
          <Button title="Add new" aria-label="Add new build" onClick={() => navigate(AppRoute.Add)}>
            <TiPlus size="2rem" />
          </Button>
        )}
      </SelectBlock>

      <ul>
        {sortedBuilds.map((build) => (
          <NavTab key={`build_${build.id}`} build={build} />
        ))}
      </ul>
    </Navigation>
  );
}
