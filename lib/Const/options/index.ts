export interface IOption {
  label: string;
  value: string;
}

export const STATUS_OPTIONS: IOption[] = [
  { label: 'Semua', value: '' },
  { label: 'Aktif', value: 'active' },
  { label: 'Tidak Aktif', value: 'inactive' },
];

export const ROLE_OPTIONS: IOption[] = [
  { label: 'Semua', value: '' },
  { label: 'Analis', value: 'analist' },
  { label: 'Host', value: 'host' },
  { label: 'Shoutcaster', value: 'shoutcaser' },
];
