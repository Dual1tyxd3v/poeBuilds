type BuildItem = {
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

type ItemStats = {
  name: string[];
  text: string;
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
  type: string;
  source: string;
  stats: ItemStats;
};
