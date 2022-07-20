import React, { FC, ReactNode } from 'react';
import {
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
  Button,
  ButtonProps,
} from '@chakra-ui/react';

export interface CustomModalProps extends ButtonProps {
  showModalBtnTxt: string;
  modalHeader: string | ReactNode;
  modalBody: string | ReactNode;
  showBtnFooter: ReactNode;
  btnClose?: boolean;
  divider?: boolean;
  btnCancle?: boolean;
}

export const CustomModal: FC<CustomModalProps> = ({
  btnCancle,
  divider,
  btnClose,
  showBtnFooter,
  showModalBtnTxt,
  modalHeader,
  modalBody,
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} {...rest}>
        {showModalBtnTxt}
      </Button>
      <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <Divider display={divider ? 'block' : 'none'} mb="24" />
          <ModalCloseButton display={btnClose ? 'block' : 'none'} />
          <ModalBody>
            <VStack spacing="24" align={'stretch'}>
              {modalBody}
            </VStack>
            <VStack align={'stretch'} mt="32">
              {showBtnFooter}
              {btnCancle && (
                <Button variant="outlined" onClick={onClose}>
                  Batalkan
                </Button>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
