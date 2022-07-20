/**
 * Chakra reference
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/form-label.ts
 */

import type { SystemStyleObject } from '@chakra-ui/theme-tools';

const baseStyle: SystemStyleObject = {
  fontSize: '14px',
  mb: '4',
  fontWeight: 'regular',
  transitionProperty: 'common',
  transitionDuration: 'normal',
  color: 'neutral.700',
};

export default {
  baseStyle,
} as const;
