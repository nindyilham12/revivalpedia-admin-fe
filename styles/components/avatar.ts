/**
 * Figma reference
 * https://www.figma.com/file/XYq4drkNjf457gq25FWhGj/Foundations-%2F-Assets?node-id=1%3A1316
 * Chakra reference
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/avatar.ts
 */

import { avatarAnatomy as parts } from '@chakra-ui/anatomy';
import type { PartsStyleObject } from '@chakra-ui/theme-tools';
import themeSizes from '../foundations/sizes';
import { SystemStyleObject } from '@chakra-ui/react';

const baseStyleBadge: SystemStyleObject = {
  transform: 'translate(25%, 25%)',
  borderRadius: 'full',
  border: '2px solid',
  borderColor: 'white',
};

const baseStyle: PartsStyleObject<typeof parts> = {
  badge: baseStyleBadge,
};

function getSize(size: keyof typeof themeSizes | '100%'): PartsStyleObject<typeof parts> {
  const themeSize = size !== '100%' ? themeSizes[size] : undefined;
  return {
    container: {
      width: size,
      height: size,
      fontSize: `calc(${themeSize ?? size} / 2.5)`,
    },
    excessLabel: {
      width: size,
      height: size,
    },
    label: {
      fontSize: { base: '12', lg: '16' },
      lineHeight: size !== '100%' ? themeSize ?? size : undefined,
    },
  };
}

const sizes = {
  16: getSize(16),
  20: getSize(20),
  24: getSize(24),
  32: getSize(32),
  40: getSize(40),
  48: getSize(48),
  56: getSize(56),
  72: getSize(72),
  100: getSize(100),
  148: getSize(148),
};

const defaultProps = {
  size: '72',
};

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps,
} as const;
