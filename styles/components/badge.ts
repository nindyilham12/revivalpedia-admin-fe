/**
 * Figma reference
 * https://www.figma.com/file/E8JaqpgUFHTjNVkELypgGG/Component-%2F-Badge-%2F-Indicator?node-id=1%3A2573
 *
 * Chakra reference
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/badge.ts
 */

import type { SystemStyleFunction, SystemStyleObject } from '@chakra-ui/theme-tools';

const baseStyle: SystemStyleObject = {
  px: '8',
  py: '2',
  textTransform: 'capitalize',
  borderRadius: '16',
  fontWeight: 'medium',
};

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  if (c === 'neutral') {
    return {
      bg: 'neutral.100',
      color: 'neutral.700',
    };
  }

  return {
    bg: `${c}.surface`,
    color: `${c}.main`,
  };
};

const sizes: Record<string, SystemStyleObject> = {
  sm: {
    fontSize: '10',
    lineHeight: '12',
  },
  md: {
    fontSize: '12',
    lineHeight: '20',
  },
};

const variants = {
  solid: variantSolid,
};

const defaultProps = {
  variant: 'solid',
  colorScheme: 'success',
  size: 'md',
};

export default {
  baseStyle,
  sizes,
  variants,
  defaultProps,
} as const;
