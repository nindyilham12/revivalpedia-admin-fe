/**
 * Chakra reference
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/tabs.ts
 */

import { tabsAnatomy as parts } from '@chakra-ui/anatomy';
import type {
  PartsStyleFunction,
  PartsStyleInterpolation,
  PartsStyleObject,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';

const baseStyleTabpanel: SystemStyleObject = {
  py: '24',
  px: '16',
};

const baseStyleTablist: SystemStyleObject = {
  overflow: ['auto', 'visible'],
};

const baseStyle: PartsStyleFunction<typeof parts> = () => ({
  tablist: baseStyleTablist,
  tabpanel: baseStyleTabpanel,
});

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    tab: {
      fontSize: '12',
      py: '10',
      px: '20',
    },
  },
  md: {
    tab: {
      fontSize: '14',
      py: '12',
      px: '24',
    },
  },
};

const variantLine: PartsStyleFunction<typeof parts> = () => {
  return {
    tablist: {
      borderBottom: '1.5px solid',
    },
    tab: {
      borderBottom: '1.5px solid',
      marginBottom: '-1px',
      _selected: {
        color: 'primary.main',
        borderColor: 'currentColor',
        boxShadow: 'none',
      },
      _active: {
        bg: 'white',
      },
      _disabled: {
        _active: { bg: 'none' },
      },
    },
  };
};

const variantSolidRounded: PartsStyleFunction<typeof parts> = () => {
  return {
    tab: {
      borderRadius: 'full',
      fontWeight: 'semibold',
      color: 'neutral.900',
      _selected: {
        color: 'primary.main',
        bg: 'primary.surface',
      },
    },
  };
};

const variantUnstyled: PartsStyleObject<typeof parts> = {};

const variants: Record<string, PartsStyleInterpolation<typeof parts>> = {
  line: variantLine,
  'solid-rounded': variantSolidRounded,
  unstyled: variantUnstyled,
};

const defaultProps = {
  size: 'md',
  variant: 'line',
};

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  variants,
  defaultProps,
} as const;
