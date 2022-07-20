/**
 * Figma reference
 * https://www.figma.com/file/WVmb1lpPLuNqK2QyswXqyR/Component-%2F-Button?node-id=2%3A477
 *
 * Chakra reference
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/button.ts
 */

import type { SystemStyleObject } from '@chakra-ui/theme-tools';
import variants from './variants';

const baseStyle: SystemStyleObject = {
  borderRadius: '8',
  fontWeight: 'semibold',
  transitionProperty: 'common',
  transitionDuration: 'normal',
  _focus: {
    boxShadow: 'none',
    outlineOffset: '0',
    outlineWidth: '3px',
  },
  _disabled: {
    cursor: 'not-allowed',
  },
  _hover: {
    _disabled: {
      bg: 'initial',
    },
  },
};

const sizes: Record<string, SystemStyleObject> = {
  lg: {
    px: '24',
    py: '12',
    fontSize: '16',
    lineHeight: '24',
  },
  md: {
    px: '16',
    py: '12',
    fontSize: '14',
    lineHeight: '20',
  },
  sm: {
    px: '12',
    py: '10',
    fontSize: '12',
    lineHeight: '20',
  },
};

const defaultProps = {
  variant: 'primary',
  size: 'md',
};

export default {
  baseStyle,
  variants,
  sizes,
  defaultProps,
} as const;
