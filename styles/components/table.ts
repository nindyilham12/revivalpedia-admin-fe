/**
 * Figma reference
 * https://www.figma.com/file/E8JaqpgUFHTjNVkELypgGG/Component-%2F-Badge-%2F-Indicator?node-id=1%3A2573
 *
 * Chakra reference
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/table.ts
 */

import { tableAnatomy as parts } from '@chakra-ui/anatomy';

import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';

const baseStyle: PartsStyleObject<typeof parts> = {
  table: {
    fontVariantNumeric: 'lining-nums tabular-nums',
    borderCollapse: 'collapse',
    width: 'full',
  },
  th: {
    fontFamily: 'heading',
    fontWeight: 'medium',
    textTransform: 'capitalize',
    letterSpacing: 'wider',
    textAlign: 'start',
  },
  td: {
    textAlign: 'start',
  },
};

const numericStyles: SystemStyleObject = {
  '&[data-is-numeric=true]': {
    textAlign: 'end',
  },
};

const variantSimple: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props;

  return {
    th: {
      bg: `${c}.100`,
      color: `${c}.700`,
      borderWidth: '1px',
      borderColor: `${c}.300`,
      ...numericStyles,
    },
    td: {
      borderWidth: '1px',
      borderColor: `${c}.300`,
      ...numericStyles,
    },
    tfoot: {
      tr: {
        '&:last-of-type': {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  };
};

const variants = {
  simple: variantSimple,
  unstyled: {},
};

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    th: {
      px: '24',
      py: '8',
      lineHeight: '20',
      fontSize: '12',
    },
    td: {
      px: '24',
      py: '10',
      fontSize: '12',
      lineHeight: '20',
    },
  },
  md: {
    th: {
      px: '16',
      py: '12',
      lineHeight: '20',
      fontSize: '12',
    },
    td: {
      px: '16',
      py: '26',
      lineHeight: '20',
    },
  },
};

const defaultProps = {
  variant: 'simple',
  size: 'md',
  colorScheme: 'neutral',
};

export default {
  parts: parts.keys,
  baseStyle,
  variants,
  sizes,
  defaultProps,
} as const;
