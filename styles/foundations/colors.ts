/**
 * Figma reference
 * https://www.figma.com/file/8A7Zneg8etcf6FZocC1Qy1/Foundations-%2F-Colors?node-id=1%3A870
 *
 * Chakra reference
 * https://chakra-ui.com/docs/styled-system/theming/theme#colors
 */

export default {
  primary: {
    main: '#E21D2A',
    pressed: '#5A0006',
    hover: '#7C0008',
    border: '#FFBCC0',
    surface: '#FFEAEB',
  },
  neutral: {
    100: '#F7FAFC',
    300: '#E2E8F0',
    500: '#A0AEC0',
    700: '#4A5568',
    900: '#1A202C',
  },
  surface: {
    black: '#17171B',
    white: '#FFFFFF',
  },
  success: {
    main: '#30A174',
    pressed: '#064F32',
    surface: '#D2EBE2',
  },
  warning: {
    main: '#FFB52E',
    pressed: '#D68B00',
    surface: '#FFE6B7',
  },
  error: {
    main: '#FF0000',
    pressed: '#AD0000',
    surface: '#FFE5E5',
  },
  info: {
    main: '#2364D5',
    pressed: '#124AA9',
    surface: '#E8EFFB',
  },
  violet: {
    main: '#5E3AB2',
    surface: '#F9F5FF',
  },
  indigo: {
    main: '#3538CD',
    surface: '#EEF4FF',
  },
} as const;
