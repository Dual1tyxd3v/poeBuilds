import { CURRENT_LEAGUE, SORT_TAB } from './config';
import { Build, BuildItem, Item, NewItemType, TemplateItems } from './types';

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

export const getImageById = (id: number, items: Item[]) => {
  return items.find((item) => item.id === id)?.img;
};

export const getTotalDifficulty = (items: Item[], idList: number[]) => {
  return idList.reduce((a, b) => {
    const currentItem = items.find((item) => item.id === b);
    return a + (currentItem?.difficulty || 0);
  }, 0);
};

export const hasAllItems = (templateItems: BuildItem[]) => {
  for (let i = 0; i < templateItems.length; i++) {
    if (templateItems[i].id === 0 && templateItems[i].slot !== 'weapon1') return false;
  }
  return true;
};

export const isItemInTemplate = (id: number, template: TemplateItems) => {
  const templateArray = Object.entries(template);
  for (let i = 0; i < templateArray.length; i++) {
    const [key, value] = templateArray[i];
    if (value === id) {
      return key;
    }
  }
  return false;
};
