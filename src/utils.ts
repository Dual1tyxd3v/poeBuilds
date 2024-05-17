import { CURRENT_LEAGUE, SORT_TAB } from './config';
import { Build, NewItemType } from './types';

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

export const createNewItem = (formData: NewItemType) => {
  const { name, type, level, implicit, rarity, explicit, description, slot, image, tradeUrl, source, difficulty } =
    formData;
  return {
    img: image,
    slot,
    difficulty,
    tradeUrl: tradeUrl.replace(CURRENT_LEAGUE, '%LEAGUE%'),
    type: rarity,
    source,
    stats: {
      name: [name, type],
      text: description || null,
      level,
      explicit: explicit.split('\n'),
      implicit,
    },
  };
};
