import { User } from '@supabase/supabase-js';
import { AuthStatus } from './config';

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

export type LoginResponseType = {
  user: null | User;
  error: string;
};

export type TemplateItems = {
  weapon1: number;
  weapon2: number;
  ring1: number;
  ring2: number;
  helmet: number;
  amulet: number;
  body: number;
  gloves: number;
  belt: number;
  boots: number;
};

export type InitState = {
  items: Item[];
  builds: Build[];
  isLoading: boolean;
  message: string;
  authStatus: AuthStatus;
  build: null | Build;
};

export type NewBuild = Omit<Build, 'id'>;

export type GetBuildsResponse = {
  data: Build[];
  error: string | null;
};

export type NewBuildFormData = Omit<NewBuild, 'items'>;

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

export type MousePosition = {
  x: number;
  y: number;
};

export type ParseData = {
  name: string[];
  level: number;
  implicit: string;
  explicit: string[];
  text: string;
  image: string;
  source: string;
};

export type ParseResponse = {
  data: null | ParseData;
  error: string;
};
