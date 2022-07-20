import { ComponentStyleConfig } from '@chakra-ui/react';
import { StyleFunctionProps } from '@chakra-ui/theme-tools';

const ComboBox: ComponentStyleConfig = {
  parts: ['buttonStack', 'icon', 'checkboxItem', 'listBoxItem', 'menu', 'menuWrapper'],
  baseStyle: (props: StyleFunctionProps) => {
    const { isOpen } = props;

    return {
      buttonStack: {
        w: 'full',
        bg: 'surface.white',
        border: '1px',
        borderColor: 'neutral.300',
        rounded: '8',
        px: '16',
        py: '12',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      icon: {
        w: '24',
        h: '24',
        transitionProperty: 'transform',
        transitionDuration: 'normal',
        transform: `rotate(${isOpen ? '180' : '0'}deg)`,
      },
      checkBoxItem: {
        display: 'block',
        px: '16',
        py: '10',
        transitionProperty: 'colors',
        transitionDuration: 'normal',
        w: 'full',
        _hover: {
          bg: 'neutral.100',
        },
        _focus: {
          bg: 'neutral.100',
        },
      },
      listBoxItem: {
        alignItems: 'center',
        display: 'flex',
        h: 'full',
        px: '16',
        py: '10',
        transitionProperty: 'colors',
        transitionDuration: 'normal',
        w: 'full',
        _hover: {
          bg: 'neutral.100',
        },
        _focus: {
          bg: 'neutral.100',
        },
      },
      menu: {
        bg: 'surface.white',
        borderWidth: '1px',
        borderColor: 'neutral.300',
        rounded: '8',
        py: '8',
        mt: '8',
      },
      menuWrapper: {
        pos: 'absolute',
        zIndex: 10,
        w: 'full',
        left: '0',
        top: 'full',
      },
    };
  },
  sizes: {},
  variants: {},
  defaultProps: {},
};

export default ComboBox;
