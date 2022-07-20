import { ComponentMultiStyleConfig } from '@chakra-ui/react';
import { StyleFunctionProps } from '@chakra-ui/theme-tools';

const Card: ComponentMultiStyleConfig = {
  parts: ['actionButton', 'base', 'header', 'body', 'footer'],
  baseStyle: (props: StyleFunctionProps) => {
    const { isOpen } = props;

    return {
      actionButton: {
        alignItems: 'center',
        bg: isOpen ? 'primary.surface' : 'initial',
        color: isOpen ? 'primary.main' : 'neutral.900',
        display: 'flex',
        h: '24',
        m: '4',
        rounded: 'full',
        transitionProperty: 'colors',
        transitionDuration: 'normal',
        w: '24',
        _focus: {
          bg: 'primary.surface',
          color: 'primary.main',
          outline: 'none',
        },
        _hover: {
          bg: 'primary.surface',
          color: 'primary.main',
        },
      },
      base: {
        bg: 'surface.white',
        borderColor: 'neutral.300',
        borderRadius: '8',
        borderWidth: '2px',
        h: 'full',
        p: '16',
        transitionProperty: 'border',
        transitionDuration: 'normal',
        _focusWithin: {
          borderColor: 'primary.border',
        },
      },
      header: {
        mb: '20',
        w: 'full',
      },
      body: {
        mb: '12',
        w: 'full',
      },
      footer: {
        w: 'full',
      },
    };
  },
  sizes: {},
  variants: {},
  defaultProps: {},
};

export default Card;
