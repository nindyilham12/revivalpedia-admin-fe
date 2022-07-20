export default {
  '*::-webkit-scrollbar': {
    w: '8',
  },
  '*::-webkit-scrollbar-track': {
    bg: 'neutral.100',
  },
  '*::-webkit-scrollbar-thumb': {
    bg: 'neutral.300',
    rounded: 'full',
  },
  '*::-webkit-scrollbar-thumb:hover': {
    bg: 'neutral.500',
  },
} as const;
