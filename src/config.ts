export const CURRENT_LEAGUE = 'Necropolis';

export enum AppRoute {
  Main = '/',
  Add = '/add',
  Edit = '/edit',
  Login = '/login',
}

export enum AuthStatus {
  Auth = 'auth',
  NoAuth = 'noauth',
  Unknown = 'unknown',
}

export const SLOTS = ['weapon', 'helmet', 'body', 'amulet', 'ring', 'gloves', 'boots', 'belt', 'cluster'].sort((a, b) =>
  a.localeCompare(b)
);

export enum SORT_TAB {
  Name = 'name',
  Damage = 'damage',
  Difficulty = 'difficulty',
}
