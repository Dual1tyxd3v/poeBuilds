export type BuildItem = {
  id: number;
  slot: string;
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
  name: string;
  img: string;
  difficulty: number;
  tradeUrl: string;
  type: 'unique' | 'rare';
  source: string;
  stats: ItemStats;
};