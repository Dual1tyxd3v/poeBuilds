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

