import { SORT_TAB } from './config';
import { Build } from './types';

export const sortBuilds = (builds: Build[], sortBy: SORT_TAB) => {
  const result = [...builds];

  switch (sortBy) {
    case 'name':
      return result.sort((a, b) => a.name.localeCompare(b.name));
    case 'damage':
      return result.sort((a, b) => a.damage - b.damage);
    case 'difficulty':
      return result.sort((a, b) => a.difficulty - b.difficulty);
    default:
      return result;
  }
};
