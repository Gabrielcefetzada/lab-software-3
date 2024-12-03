import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Dashboard', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'users', title: 'Usuários', href: paths.dashboard.users, icon: 'users' },
  { key: 'rewards', title: 'Vantagens', href: paths.dashboard.rewards, icon: 'medal' },
  { key: 'transaction', title: 'Transferência', href: paths.dashboard.transactions, icon: 'arrows-left-right' },
  // { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
