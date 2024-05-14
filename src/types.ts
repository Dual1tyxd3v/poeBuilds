type BuildItem = {
  id: number;
  slot: string;
};

export type Build = {
  name: string;
  pob: string;
  damage: number;
  difficulty: number;
  di: number;
  items: BuildItem[];
};

export type GetBuildsResponse = {
  data: Build[];
  error: string | null;
};
