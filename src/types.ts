export type BuildItem = {
  id: number;
  slot: string;
};

export type NewItemType = {
  name: string;
  type: string;
  level: number;
  implicit: string;
  rarity: string;
  explicit: string;
  description: string;
  slot: string;
  image: string;
  tradeUrl: string;
  source: string;
  difficulty: number;
};

export type Build = {
  name: string;
  pob: string;
  damage: number;
  difficulty: number;
  id: number;
  items: BuildItem[];
};

export type GetBuildsResponse = {
  data: Build[];
  error: string | null;
};

export type GetBuildDetailsResponse = {
  data: {
    build: Build[];
    items: Item[];
  } | null;
  error: string | null;
};

type ItemStats = {
  name: string[];
  text: string | null;
  level: number;
  explicit: string[];
  implicit: string;
};

export type Item = {
  id: number;
  img: string;
  slot: string;
  difficulty: number;
  tradeUrl: string;
  type: string;
  source: string;
  stats: ItemStats;
};

export type CreateItem = Omit<Item, 'id'>;
