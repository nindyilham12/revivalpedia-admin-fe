import { ComponentSingleStyleConfig } from '@chakra-ui/react';

const RadioCard: ComponentSingleStyleConfig = {
  baseStyle: {
    bg: 'white',
    borderRadius: 'full',
    borderWidth: '1px',
    boxShadow: 'small',
    color: 'neutral.900',
    cursor: 'pointer',
    fontWeight: 'medium',
    fontSize: ['12', '14'],
    lineHeight: '20',
    px: ['12', '16'],
    py: ['10', '12'],
    transitionProperty: 'common',
    transitionDuration: 'normal',
    userSelect: 'none',
    _checked: {
      borderColor: 'primary.main',
      bg: 'primary.surface',
      color: 'primary.main',
      fontWeight: 'semibold',
      _hover: {
        borderColor: 'primary.main',
        bg: 'primary.surface',
        color: 'primary.main',
      },
    },
    _hover: {
      borderColor: 'primary.main',
      color: 'primary.main',
    },
  },
  defaultProps: {},
  sizes: {},
  variants: {},
};

export default RadioCard;
