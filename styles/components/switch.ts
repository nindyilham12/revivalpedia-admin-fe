/**
 * Chakra reference
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/switch.ts
 */

import { switchAnatomy as parts } from '@chakra-ui/anatomy';
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';
import { cssVar } from '@chakra-ui/theme-tools';

const $width = cssVar('switch-track-width');
const $height = cssVar('switch-track-height');

const $translateX = cssVar('switch-thumb-x');

const baseStyleTrack: SystemStyleObject = {
  borderRadius: 'full',
  p: '4',
  width: [$width.reference],
  height: [$height.reference],
  transitionProperty: 'common',
  transitionDuration: 'fast',
  bg: 'neutral.300',
  _focus: {
    boxShadow: 'none',
  },
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  _checked: {
    bg: 'primary.surface',
  },
};

const baseStyleThumb: SystemStyleObject = {
  bg: 'neutral.700',
  transitionProperty: 'transform',
  transitionDuration: 'normal',
  borderRadius: 'inherit',
  width: [$height.reference],
  height: [$height.reference],
  _checked: {
    transform: `translateX(${$translateX.reference})`,
    bg: 'primary.main',
  },
};

const baseStyle: PartsStyleFunction<typeof parts> = () => ({
  track: baseStyleTrack,
  thumb: baseStyleThumb,
});

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  md: {
    container: {
      [$width.variable]: '44px',
      [$height.variable]: '24px',
    },
  },
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
