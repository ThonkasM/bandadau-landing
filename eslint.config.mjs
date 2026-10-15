import next from '@bandada/eslint-config/next';

export default [
  ...next,
  { ignores: ['out/**', '.next/**', 'coverage/**', 'docs/**'] },
];
