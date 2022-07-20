import { SPIN_KEYFRAMES } from '@/lib/Const';
import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertIcon,
  Button,
  SlideFade,
  Text,
  Box,
  Icon,
} from '@chakra-ui/react';
import { IconCheck, IconLoader, IconX } from '@tabler/icons';
import { FC, useRef } from 'react';

interface DeleteEntityDialogProps {
  failMessage: string;
  isLoading: boolean;
  isSuccess: boolean;
  modalDescription: string;
  modalTitle: string;
  shouldShowAlert: boolean;
  showDialog: boolean;
  successMessage: string;
  onCancel: () => void;
  onCloseModal: () => void;
  onConfirm: () => void;
}

export const DeleteEntityDialog: FC<DeleteEntityDialogProps> = ({
  failMessage,
  isLoading,
  isSuccess,
  modalDescription,
  modalTitle,
  shouldShowAlert,
  showDialog,
  successMessage,
  onCancel,
  onCloseModal,
  onConfirm,
}) => {
  const cancelRef = useRef(null);

  return (
    <>
      <AlertDialog
        isOpen={showDialog}
        leastDestructiveRef={cancelRef}
        onClose={onCloseModal}
        isCentered
        motionPreset="slideInBottom"
        autoFocus={false}
      >
        <AlertDialogOverlay>
          <AlertDialogContent p="20" pb="16" m="24">
            <AlertDialogHeader>
              <Text fontWeight="bold" variant="body-xl" textAlign="center" color="neutral.900">
                {modalTitle}
              </Text>
            </AlertDialogHeader>

            <AlertDialogBody>{modalDescription}</AlertDialogBody>

            <AlertDialogFooter flexDir="column" gap="8">
              <Button
                onClick={onConfirm}
                w="full"
                isLoading={isLoading}
                spinner={
                  <Icon
                    as={IconLoader}
                    h="24"
                    w="24"
                    animation={`${SPIN_KEYFRAMES} infinite 2s linear`}
                  />
                }
              >
                Hapus
              </Button>
              <Button
                ref={cancelRef}
                variant="secondary"
                w="full"
                onClick={onCancel}
                disabled={isLoading}
              >
                Batalkan
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Box position="fixed" bottom="48" left="50%" transform="translateX(-50%)" zIndex={2}>
        <SlideFade in={shouldShowAlert}>
          <Alert bg={isSuccess ? 'neutral.900' : 'error.main'} w="max-content">
            <AlertIcon>{isSuccess ? <IconCheck /> : <IconX />}</AlertIcon>
            <AlertDescription>{isSuccess ? successMessage : failMessage}</AlertDescription>
          </Alert>
        </SlideFade>
      </Box>
    </>
  );
};
