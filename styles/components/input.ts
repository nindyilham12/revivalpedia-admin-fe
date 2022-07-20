/**
 * Chakra reference
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/input.ts
 */

import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import { SystemStyleObject } from '@chakra-ui/react';
import type { PartsStyleObject } from '@chakra-ui/theme-tools';

const baseStyle: PartsStyleObject<typeof parts> = {
  field: {
    width: '100%',
    minWidth: 0,
    position: 'relative',
    appearance: 'none',
    transitionProperty: 'common',
    transitionDuration: 'normal',
  },
  element: {
    h: 'full',
    mx: '10',
  },
};

const variantOutline: PartsStyleObject<typeof parts> = {
  field: {
    border: '1px solid',
    bg: 'surface.white',
    borderColor: 'neutral.300',
    color: 'neutral.900',
    _placeholder: {
      color: 'neutral.500',
      fontSize: '14',
      lineHeight: '20',
      fontWeight: 'medium',
    },
    _hover: {
      borderColor: 'inherit',
    },
    _focus: {
      outlineColor: 'primary.border',
      outlineWidth: '3px',
      outlineOffset: '0',
      borderColor: 'inherit',
      _invalid: {
        borderColor: 'error.main',
      },
    },
    _disabled: {
      bg: 'neutral.100',
      border: 'none',
      opacity: 1,
    },
    _invalid: {
      borderColor: 'error.main',
      _focus: {
        borderColor: 'inherit',
      },
    },
  },
};

const size: Record<string, SystemStyleObject> = {
  lg: {
    fontSize: '16',
    height: 'max-content',
    px: '16',
    py: '14',
    borderRadius: '8',
    lineHeight: '20',
  },
  md: {
    fontSize: '16',
    height: 'max-content',
    px: '16',
    py: '12',
    borderRadius: '8',
    lineHeight: '20',
  },
  sm: {
    fontSize: '16',
    height: 'max-content',
    px: '16',
    py: '10',
    borderRadius: '8',
    lineHeight: '20',
  },
  xs: {
    fontSize: '16',
    height: 'max-content',
    px: '16',
    py: '8',
    borderRadius: '8',
    lineHeight: '20',
  },
};

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  lg: {
    field: size.lg,
    addon: size.lg,
    element: {
      fontSize: '24',
    },
  },
  md: {
    field: size.md,
    addon: size.md,
    element: {
      fontSize: '24',
    },
  },
  sm: {
    field: size.sm,
    addon: size.sm,
    element: {
      fontSize: '20',
    },
  },
  xs: {
    field: size.xs,
    addon: size.xs,
    element: {
      fontSize: '18',
    },
  },
};

const variants: Record<string, PartsStyleObject<typeof parts>> = {
  outline: variantOutline,
};

const defaultProps = {
  size: 'md',
  variant: 'outline',
};

export default {
  baseStyle,
  defaultProps,
  sizes,
  variants,
} as const;
