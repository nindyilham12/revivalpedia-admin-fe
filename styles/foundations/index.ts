/**
 * Chakra reference
 * https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme/src/foundations
 */

import radii from './radius';
import colors from './colors';
import space from './spacing';
import shadows from './shadows';
import sizes from './sizes';
import typography from './typography';

export default {
  colors,
  radii,
  shadows,
  sizes,
  space,
  ...typography,
} as const;
