import type { SystemStyleObject } from '@chakra-ui/theme-tools';

const variantPrimary: SystemStyleObject = {
  bg: 'primary.main',
  color: 'surface.white',
  h: 'max-content',
  _focus: {
    outlineColor: 'primary.border',
  },
  _hover: {
    bg: 'primary.hover',
    shadow: 'sm',
  },
  _active: {
    bg: 'primary.pressed',
    outline: 'none',
    shadow: 'inner',
  },
  _disabled: {
    bg: 'neutral.100',
    color: 'neutral.500',
    border: '1px',
  },
};

const variantSecondary: SystemStyleObject = {
  bg: 'surface.white',
  color: 'primary.main',
  outlineWidth: '1px',
  outlineColor: 'primary.main',
  outlineOffset: 0,
  h: 'max-content',
  _focus: {
    outlineColor: 'primary.border',
    _disabled: {
      outlineWidth: 'initial',
    },
  },
  _hover: {
    bg: 'primary.surface',
    shadow: 'sm',
  },
  _active: {
    bg: 'primary.border',
    shadow: 'inner',
    outlineWidth: '1px',
    outlineColor: 'primary.main',
    _disabled: {
      outlineColor: 'neutral.300',
      outlineWidth: '1px',
    },
  },
  _disabled: {
    bg: 'neutral.100',
    color: 'neutral.500',
    outlineColor: 'neutral.300',
    shadow: 'sm',
  },
};

const variantSuccess: SystemStyleObject = {
  bg: 'success.main',
  color: 'surface.white',
  h: 'max-content',
  _focus: {
    outlineColor: 'success.surface',
  },
  _hover: {
    bg: 'success.pressed',
    shadow: 'sm',
  },
  _active: {
    bg: 'success.pressed',
    outline: 'none',
    shadow: 'inner',
  },
  _disabled: {
    bg: 'neutral.100',
    color: 'neutral.500',
    border: '1px',
  },
};

const variantError: SystemStyleObject = {
  bg: 'error.main',
  color: 'surface.white',
  h: 'max-content',
  _focus: {
    outlineColor: 'error.surface',
  },
  _hover: {
    bg: 'error.pressed',
    shadow: 'sm',
  },
  _active: {
    bg: 'error.pressed',
    outline: 'none',
    shadow: 'inner',
  },
  _disabled: {
    bg: 'neutral.100',
    color: 'neutral.500',
    border: '1px',
  },
};

const variantOutlined: SystemStyleObject = {
  bg: 'surface.white',
  color: 'neutral.900',
  borderWidth: '1px',
  borderColor: 'neutral.300',
  h: 'max-content',
  _focus: {
    outlineWidth: '3px',
    outlineColor: 'neutral.300',
    _disabled: {
      outlineWidth: 'initial',
    },
  },
  _hover: {
    shadow: 'sm',
  },
  _active: {
    shadow: 'inner',
    _disabled: {
      borderColor: 'neutral.300',
      borderWidth: '1px',
    },
  },
  _disabled: {
    bg: 'neutral.100',
    color: 'neutral.500',
    borderColor: 'neutral.300',
  },
};

const variantText: SystemStyleObject = {
  bg: 'transparent',
  color: 'primary.main',
  outlineOffset: 0,
  h: 'max-content',
  _focus: {
    outlineColor: 'primary.border',
    _disabled: {
      outlineWidth: 'initial',
    },
  },
  _hover: {
    bg: 'primary.surface',
    shadow: 'sm',
  },
  _active: {
    bg: 'primary.surface',
    shadow: 'inner',
    outline: 'none',
    _disabled: {
      outlineColor: 'neutral.300',
      outlineWidth: '1px',
    },
  },
  _disabled: {
    color: 'neutral.500',
  },
};

export default {
  primary: variantPrimary,
  secondary: variantSecondary,
  success: variantSuccess,
  error: variantError,
  outlined: variantOutlined,
  text: variantText,
} as const;
