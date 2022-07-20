/**
 * Figma reference
 * https://www.figma.com/file/qpFs7eT9XmnSKv4m8WcZ4r/Foundations-%2F-Typography?node-id=5%3A377
 *
 * Chakra reference
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/heading.ts
 */

import { SystemStyleObject } from '@chakra-ui/theme-tools';

const baseStyle: SystemStyleObject = {
  fontFamily: 'heading',
  fontWeight: 'medium',
  letterSpacing: '-2%',
};

const sizes: Record<string, SystemStyleObject> = {
  1: {
    fontSize: '40',
    lineHeight: '48',
  },
  2: {
    fontSize: '36',
    lineHeight: '44',
  },
  3: {
    fontSize: '32',
    lineHeight: '40',
  },
  4: {
    fontSize: '28',
    lineHeight: '36',
  },
  5: {
    fontsize: '24',
    lineHeight: '32',
  },
  6: {
    fontSize: '20',
    lineHeight: '28',
  },
};

const defaultProps = {
  size: '1',
};

export default {
  baseStyle,
  sizes,
  defaultProps,
} as const;
