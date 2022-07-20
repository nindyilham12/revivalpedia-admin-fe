import { Box, useRadio, UseRadioProps, useStyleConfig } from '@chakra-ui/react';
import React, { FC } from 'react';

type RadioCardProps = {
  radioProps: UseRadioProps;
  children?: React.ReactNode;
};

export const RadioCard: FC<RadioCardProps> = ({ radioProps, children }) => {
  const styles = useStyleConfig('RadioCard', {});
  const { getInputProps, getCheckboxProps } = useRadio(radioProps);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box {...checkbox} __css={styles}>
        {children}
      </Box>
    </Box>
  );
};
