import { Fade, IconButton, IconButtonProps } from '@chakra-ui/react';
import { IconArrowBigUpLine } from '@tabler/icons';
import React, { useState, useEffect, FC } from 'react';

export const ScrollToTop: FC<Omit<IconButtonProps, 'aria-label'>> = (props) => {
  const [showTopBtn, setShowTopBtn] = useState<boolean>(false);

  useEffect(() => {
    const handleScrollTop = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else setShowTopBtn(false);
    };

    window.addEventListener('scroll', handleScrollTop);

    return () => window.removeEventListener('scroll', handleScrollTop);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Fade in={showTopBtn}>
      <IconButton
        pos="fixed"
        right="32px"
        zIndex="docked"
        p="12"
        w="48px"
        h="48px"
        onClick={goToTop}
        fontSize="24"
        icon={<IconArrowBigUpLine />}
        variant="outlined"
        isRound
        {...props}
        aria-label="Back to top"
      />
    </Fade>
  );
};
