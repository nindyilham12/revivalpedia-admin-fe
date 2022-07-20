import { checkboxAnatomy as parts } from '@chakra-ui/anatomy';
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';

const baseStyleControl: SystemStyleObject = {
  w: '100%',
  transitionProperty: 'box-shadow',
  transitionDuration: 'normal',
  color: 'surface.white',

  _checked: {
    bg: 'info.main',
    borderColor: 'info.main',
    color: 'surface.white',
    rounded: '3',

    _disabled: {
      borderColor: 'neutral.300',
      bg: 'neutral.100',
      color: 'surface.white',
    },
  },

  _indeterminate: {
    bg: 'info.main',
    color: 'surface.white',
    border: 'none',
  },

  _disabled: {
    bg: 'neutral.100',
    borderColor: 'neutral.300',
  },

  _focus: {
    boxShadow: 'none',
  },

  _invalid: {
    borderColor: 'surface.white',
  },
};

const baseStyleContainer: SystemStyleObject = {
  _disabled: { cursor: 'not-allowed' },
};

const baseStyleLabel: SystemStyleObject = {
  userSelect: 'none',
  _disabled: { opacity: 0.4 },
};

const baseStyleIcon: SystemStyleObject = {
  transitionProperty: 'transform',
  transitionDuration: 'normal',
};

const baseStyle: PartsStyleFunction<typeof parts> = () => ({
  icon: baseStyleIcon,
  container: baseStyleContainer,
  control: baseStyleControl,
  label: baseStyleLabel,
});

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    control: { h: 16, w: 16 },
    label: { fontSize: '12' },
    icon: { fontSize: '12' },
  },
  md: {
    control: { w: 18, h: 18 },
    label: { fontSize: '14' },
    icon: { fontSize: '14' },
  },
  lg: {
    control: { w: 24, h: 24 },
    label: { fontSize: '20' },
    icon: { fontSize: '20' },
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
