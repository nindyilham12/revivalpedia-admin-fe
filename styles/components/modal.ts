/**
 * Chakra reference
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/modal.ts
 */

import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';

const baseStyleOverlay: SystemStyleObject = {
  bg: 'blackAlpha.600',
  zIndex: 'modal',
};

const baseStyleDialog: SystemStyleObject = {
  borderRadius: '8',
};

const baseStyleHeader: SystemStyleObject = {
  px: '20',
  py: ['16', '20'],
  fontSize: '20',
  fontWeight: 'semibold',
};

const baseStyleCloseButton: SystemStyleObject = {
  position: 'absolute',
  top: '20',
  insetEnd: '28',
  _focus: {
    boxShadow: 'none',
    bg: 'white',
  },
  _hover: {
    bg: 'white',
  },
};

const baseStyleBody: SystemStyleObject = {
  px: '20',
  py: ['12', '16'],
  flex: 1,
};

const baseStyleFooter: SystemStyleObject = {
  px: ['16', '20'],
  py: ['10', '12'],
};

const baseStyle: PartsStyleFunction<typeof parts> = () => ({
  overlay: baseStyleOverlay,
  dialog: baseStyleDialog,
  header: baseStyleHeader,
  closeButton: baseStyleCloseButton,
  body: baseStyleBody,
  footer: baseStyleFooter,
});

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */
function getSize(value: string): PartsStyleObject<typeof parts> {
  if (value === 'full') {
    return {
      dialog: {
        maxW: '100vw',
        minH: '100vh',
        '@supports(min-height: -webkit-fill-available)': {
          minH: '-webkit-fill-available',
        },
        my: 0,
      },
    };
  }
  return {
    dialog: { maxW: value },
  };
}

const sizes = {
  xs: getSize('xs'),
  sm: getSize('sm'),
  md: getSize('md'),
  lg: getSize('lg'),
  xl: getSize('xl'),
  '2xl': getSize('2xl'),
  '3xl': getSize('3xl'),
  '4xl': getSize('4xl'),
  '5xl': getSize('5xl'),
  '6xl': getSize('6xl'),
  full: getSize('full'),
};

const defaultProps = {
  size: 'md',
};

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps,
} as const;
