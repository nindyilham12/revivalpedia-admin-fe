import { SystemStyleObject } from '@chakra-ui/theme-tools';

const baseStyle: SystemStyleObject = {
  fontWeight: 'regular',
  color: 'neutral.700',
};

const variants: SystemStyleObject = {
  'display-lg': {
    fontSize: '52',
    lineHeight: '110%',
    letterSpacing: '-0.02%',
  },
  'display-sm': {
    fontSize: '44',
    lineHeight: '140%',
    letterSpacing: '0',
  },
  'heading-1': {
    fontSize: '52',
    lineHeight: '48',
    letterSpacing: '-2%',
  },
  'heading-2': {
    fontSize: '36',
    lineHeight: '44',
    letterSpacing: '-2%',
  },
  'heading-3': {
    fontSize: '32',
    lineHeight: '40',
    letterSpacing: '-2%',
  },
  'heading-4': {
    fontSize: '28',
    lineHeight: '36',
    letterSpacing: '-2%',
  },
  'heading-5': {
    fontSize: '24',
    lineHeight: '32',
    letterSpacing: '-2%',
  },
  'heading-6': {
    fontSize: '20',
    lineHeight: '28',
    letterSpacing: '-2%',
  },
  'body-xl': {
    fontSize: '18',
    lineHeight: '28',
  },
  'body-lg': {
    fontSize: '16',
    lineHeight: '24',
  },
  'body-md': {
    fontSize: '14',
    lineHeight: '20',
  },
  'body-sm': {
    fontSize: '12',
    lineHeight: '20',
  },
  'body-xs': {
    fontSize: '10',
    lineHeight: '12',
  },
  'overline-lg': {
    fontSize: '14',
    fontWeight: 'semibold',
    textTransform: 'uppercase',
  },
  'overline-md': {
    fontSize: '12',
    fontWeight: 'semibold',
    textTransform: 'uppercase',
  },
  'overline-sm': {
    fontSize: '10',
    fontWeight: 'semibold',
    textTransform: 'uppercase',
  },
};

const defaultProps = {
  variant: 'body-md',
};

export default {
  baseStyle,
  variants,
  defaultProps,
} as const;
