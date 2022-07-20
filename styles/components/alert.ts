/**
 * Chakra reference
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/alert.ts
 */

import { alertAnatomy as parts } from '@chakra-ui/anatomy';
import type { PartsStyleObject } from '@chakra-ui/theme-tools';

const baseStyle: PartsStyleObject<typeof parts> = {
  container: {
    px: '16',
    py: '12',
    borderRadius: '8',
  },
  title: {
    fontWeight: 'medium',
    lineHeight: '20',
    marginEnd: '16',
    color: 'white',
  },
  icon: {
    flexShrink: 0,
    marginEnd: '16',
    w: '20',
    h: '20',
  },
};

const variantSubtle: PartsStyleObject<typeof parts> = {
  container: { bg: 'neutral.900', color: 'white' },
  icon: { color: 'white' },
  spinner: {
    color: 'white',
  },
};

const variants = {
  subtle: variantSubtle,
};

const defaultProps = {
  variant: 'subtle',
};

export default {
  parts: parts.keys,
  baseStyle,
  variants,
  defaultProps,
} as const;
