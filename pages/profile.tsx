import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
  Image,
  Flex,
  VStack,
  Alert,
  AlertIcon,
  SlideFade,
  AlertDescription,
} from '@chakra-ui/react';
import Head from 'next/head';
import { PasswordInput } from '@/components';
import { useRef, useState } from 'react';
import { IUser, ProfileErrorState } from '@/typings';
import Joi from 'joi';
import {
  updateEmail,
  updateName,
  updateProfilePicture,
  updateUsername,
  updatePassword,
  validationPassword,
} from '@/lib/Http';
import { IconCheck, IconX } from '@tabler/icons';
import { useAuth } from '@/hooks';

const Profile = () => {
  const editField = {
    photo: 'Foto Profil',
  };

  //get data user
  const { user, signOut } = useAuth();

  //entity field user data
  const userData = (): IUser => {
    return {
      name: user?.name ?? '',
      username: user?.username ?? '',
      email: user?.email ?? '',
      profilePhotoUrl: user?.profilePhotoUrl,
      password: '',
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      role: 'admin' || 'manager',
      uid: '',
    };
  };

  //entity error
  const errorState = (): ProfileErrorState => {
    return {
      name: '',
      username: '',
      email: '',
      profilePhotoUrl: '',
      password: '',
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    };
  };

  const size = useBreakpointValue({ base: 'sm', lg: 'lg' });
  //close modal function
  const closeModal = () => {
    setShowModalConfirm(false);
    setShowModalEdit(false);
  };

  const [isDisable] = useState(false);

  //state show alert status
  const [showAlertStatus, setShowAlertStatus] = useState<boolean>(false);

  //state show alert status password
  const [showAlertStatusPassword, setShowAlertStatusPassword] = useState<boolean>(false);

  //state show alert status photo
  const [showAlertStatusPhoto, setShowAlertStatusPhoto] = useState<boolean>(false);

  //state show modal validation password
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);

  //state show modal edit password
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);

  //state update proses
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  //for check updateStatus
  const [updateStatus, setUpdateStatus] = useState<{ success: boolean }>();

  //state
  const [formState, setFormState] = useState<IUser>(userData);
  const [errors, setErrors] = useState<ProfileErrorState>(errorState);

  //image
  const [imageFile, setImageFile] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string>();
  const imageInputRef = useRef<HTMLInputElement>(null);

  //schema validation main index
  const schema = Joi.object({
    name: Joi.any().required(),
    username: Joi.string().required(),
    email: Joi.string().required().email({ tlds: false }).messages({
      'string.email': 'Email salah, example: youremail@email.com',
      'string.empty': ' ',
    }),
    password: Joi.string().min(8).required().messages({
      'string.empty': 'Kata sandi baru tidak boleh kosong',
      'string.min': 'Kata sandi harus minimal 8 karakter',
    }),
  });

  //schema validation edit password
  const schemaPassword = Joi.object({
    oldPassword: Joi.string().required().messages({
      'string.empty': 'Kata sandi saat ini tidak boleh kosong',
    }),
    newPassword: Joi.string().min(8).required().messages({
      'string.empty': 'Kata sandi baru tidak boleh kosong',
      'string.min': 'Kata sandi harus minimal 8 karakter',
    }),
    confirmNewPassword: Joi.string().required().equal(Joi.ref('newPassword')).messages({
      'string.empty': 'Kata sandi tidak boleh kosong',
      'any.only': 'Kata sandi tidak cocok',
    }),
  });

  //handle image select
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length < 1) return;

    const file = e.target.files[0];

    if (file && /image\/\w+$/.test(file.type)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // handle remove image preview
  const removeImagePreview = () => {
    setImageFile(undefined);
    setImagePreview(undefined);
    imageInputRef.current!.value = '';
  };

  //handle submit
  const handleSubmit = async (type: keyof typeof editField) => {
    let updateSuccess = false;

    //show modal and validation password for submit data email

    if (formState.username !== user?.username) {
      //username
      const { successUsername } = await updateUsername(formState.username!);
      updateSuccess = successUsername ?? false;
    } else if (formState.name !== user?.name) {
      //name
      const { successName } = await updateName(formState.name!);
      updateSuccess = successName ?? false;
    } else if (type === 'photo') {
      //photo profile
      const { successPhoto } = await updateProfilePicture(imageFile!);
      updateSuccess = successPhoto ?? false;
    } else return;

    if (updateSuccess) {
      const updatedUser: IUser = { ...user! };
      updatedUser.name = formState.name!;
      updatedUser.username = formState.username!;
      if (type === 'photo') {
        updatedUser.profilePhotoUrl = imagePreview!;
      }
      setFormState(updatedUser);
    }
    setUpdateStatus({ success: updateSuccess });

    setTimeout(() => {
      if (type === 'photo') {
        setShowAlertStatusPhoto(true);
      } else {
        setShowAlertStatus(true);
      }
      setIsUpdate(false);
    }, 400);
  };

  //handle submit password
  const handleSubmitPassword = async () => {
    setIsUpdate(true);
    let updateSuccess = false;

    const { successPassword } = await updatePassword(
      formState.oldPassword!,
      formState.newPassword!,
      formState.confirmNewPassword!,
    );
    updateSuccess = successPassword ?? false;

    if (updateSuccess) {
      const updatedUser: IUser = { ...user! };
      updatedUser.newPassword = formState.newPassword!;
      setFormState(updatedUser);
    }
    setUpdateStatus({ success: updateSuccess });
    closeModal();
    setShowAlertStatusPassword(true);

    setTimeout(() => {
      if (updateSuccess) {
        signOut();
      } else return;
      setIsUpdate(false);
    }, 400);
  };

  //handle submit validation password
  const handleValidationPassword = async () => {
    setIsUpdate(true);
    let updateSuccessValidation = false;
    let updateSuccess = false;

    const { error, successValidation } = await validationPassword(formState.password!);
    updateSuccessValidation = successValidation ?? false;

    // success
    if (updateSuccessValidation) {
      // email
      const { successEmail } = await updateEmail(formState.email!);
      updateSuccess = successEmail ?? false;
    } else {
      window.alert(error);
      setErrors(error);
    }

    if (updateSuccess) {
      const updatedUser: IUser = { ...user! };
      updatedUser.email = formState.email!;
      setFormState(updatedUser);
    }

    setUpdateStatus({ success: updateSuccess });
    closeModal();
    setShowAlertStatus(true);

    setTimeout(() => {
      //if success update redirect signOut
      if (updateSuccess) {
        signOut();
      } else return;
      setIsUpdate(false);
    }, 400);
  };

  //validate property
  const validateProperty = (name: string, value: string) => {
    const propertyToValidate = { [name]: value };

    const schemaOfProperty = Joi.object({ [name]: schema.extract(name) });

    const { error } = schemaOfProperty.validate(propertyToValidate);
    return error ? error.details[0].message : null;
  };

  //handle change
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const errorData = { ...errors };
    const errorMessage = validateProperty(name, value);
    if (errorMessage) {
      errorData[name as keyof typeof errorData] = errorMessage;
    } else {
      delete errorData[name as keyof typeof errorData];
    }
    const profileData = { ...formState };
    profileData[name as keyof typeof profileData] = value;
    setFormState(profileData);
    setErrors(errorData);
  };

  //validate property edit password
  const validatePropertyPassword = (name: string, value: string) => {
    if (name === 'confirmNewPassword') {
      const propertyToValidate = { newPassword: formState.newPassword, [name]: value };
      const schemaOfProperty = Joi.object({
        [name]: schemaPassword.extract(name),
        newPassword: schemaPassword.extract('newPassword'),
      });
      const { error } = schemaOfProperty.validate(propertyToValidate);
      return error ? error.details[0].message : null;
    } else {
      const propertyToValidate = { [name]: value };
      const schemaOfProperty = Joi.object({ [name]: schemaPassword.extract(name) });

      const { error } = schemaOfProperty.validate(propertyToValidate);
      return error ? error.details[0].message : null;
    }
  };

  //handle change edit password
  const handleChangePassword = (e: any) => {
    const { name, value } = e.target;
    const errorData = { ...errors };
    const errorMessage = validatePropertyPassword(name, value);
    if (errorMessage) {
      errorData[name as keyof typeof errorData] = errorMessage;
    } else {
      delete errorData[name as keyof typeof errorData];
    }
    const profileData = { ...formState };
    profileData[name as keyof typeof profileData] = value;
    setFormState(profileData);
    setErrors(errorData);
  };

  return (
    <>
      <Head>
        <title>RevivaLPedia | Profile</title>
      </Head>

      <Box borderWidth="1px" borderColor="neutral.300" shadow="sm" borderRadius="8px">
        <Text
          px="20"
          py="16"
          variant="body-xl"
          fontWeight="semibold"
          align="left"
          verticalAlign="center"
          color="neutral.900"
        >
          Profil Anda
        </Text>

        <Divider />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (formState.email !== user?.email) {
              setShowModalConfirm(true);
            } else {
              handleSubmit('photo');
            }
          }}
          noValidate
        >
          <Box px="20" py="16">
            <Box>
              <Input display="none" type="file" ref={imageInputRef} onChange={handleImageSelect} />

              <Flex gap="24">
                <Box>
                  <Image
                    maxW={{ base: '72px', md: '148px' }}
                    h={{ base: '72px', md: '148px' }}
                    mt={{ base: '16', lg: 0 }}
                    borderRadius="full"
                    src={
                      imagePreview ? imagePreview : user?.profilePhotoUrl || '/default-avatar.png'
                    }
                    alt="Profile Picture"
                  />
                </Box>

                <VStack spacing="16">
                  <Flex gap="8" mt={{ base: '32', lg: '50' }} mr="auto">
                    <Button size={size} onClick={() => imageInputRef.current?.click()}>
                      Unggah foto baru
                    </Button>

                    <Button size={size} onClick={removeImagePreview} variant="outlined">
                      Hapus
                    </Button>
                  </Flex>
                  <Box>
                    <Text variant="body-sm" fontWeight="medium">
                      Pastikan gambar transparan format .PNG Max size of 3MB
                    </Text>
                  </Box>
                </VStack>
              </Flex>
            </Box>

            <FormControl isRequired mt="24" h="max-content">
              <FormLabel fontWeight="medium">Username</FormLabel>
              <Input
                type="text"
                size={size}
                name="username"
                value={formState.username}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired mt="24" h="max-content">
              <FormLabel fontWeight="medium">Nama Lengkap</FormLabel>
              <Input
                type="text"
                name="name"
                size={size}
                value={formState.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired mt="24" h="max-content">
              <FormLabel fontWeight="medium">Email</FormLabel>
              <Input
                type="text"
                size={size}
                name="email"
                value={formState.email}
                onChange={handleChange}
                isInvalid={Boolean(errors.email)}
              />
              {errors.email && (
                <Text color="primary.main" fontSize="14" mt="4">
                  {errors.email}
                </Text>
              )}
            </FormControl>
          </Box>
          <Divider />
          <HStack spacing="16" px="20" py="16" justifyContent="flex-end">
            <Button onClick={() => setShowModalEdit(true)} variant="outlined">
              Ubah kata sandi
            </Button>
            <Button
              type="submit"
              variant={isDisable === true ? 'outlined' : 'primary'}
              disabled={
                Boolean(errors.email) ||
                Boolean(errors.name) ||
                Boolean(errors.username) ||
                (Boolean(formState.name === user?.name) &&
                  Boolean(formState.username === user?.username) &&
                  Boolean(formState.email === user?.email) &&
                  Boolean(!imageFile))
              }
            >
              Simpan perubahan
            </Button>
          </HStack>
        </form>

        {/* Modal konfirmasi password */}
        <Modal closeOnOverlayClick={false} isOpen={showModalConfirm} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Ubah email Anda</ModalHeader>
            <Divider />
            <ModalCloseButton />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleValidationPassword();
              }}
              noValidate
            >
              <ModalBody>
                <FormControl mb="12">
                  <FormLabel>Password</FormLabel>
                  <PasswordInput
                    name="password"
                    autoComplete="current-password"
                    size={size}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.password)}
                  />
                  {errors.password && (
                    <Text color="primary.main" fontSize="14" mt="4">
                      {errors.password}
                    </Text>
                  )}
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button w="full" variant="primary" type="submit">
                  Selesai
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Box>

      {/* Modal edit password */}
      <Modal closeOnOverlayClick={false} isOpen={showModalEdit} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ubah kata sandi Anda</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitPassword();
            }}
            noValidate
          >
            <ModalBody>
              <Input hidden type="text" autoComplete="username"></Input>
              <FormControl mb="12">
                <FormLabel>Kata sandi saat ini</FormLabel>
                <PasswordInput
                  // autoComplete="current-password"
                  name="oldPassword"
                  size={size}
                  onChange={handleChangePassword}
                  isInvalid={Boolean(errors.oldPassword)}
                />
                {errors.oldPassword && (
                  <Text color="primary.main" fontSize="14" mt="4">
                    {errors.oldPassword}
                  </Text>
                )}
              </FormControl>
              <FormControl mb="12">
                <FormLabel>Kata sandi baru</FormLabel>
                <PasswordInput
                  autoComplete="current-password"
                  name="newPassword"
                  size={size}
                  onChange={handleChangePassword}
                  isInvalid={Boolean(errors.newPassword)}
                  placeholder="minimal 8 karakter"
                />
                {errors.newPassword && (
                  <Text color="primary.main" fontSize="14" mt="4">
                    {errors.newPassword}
                  </Text>
                )}
              </FormControl>
              <FormControl mb="12">
                <FormLabel>Konfirmasi kata sandi</FormLabel>
                <PasswordInput
                  // autoComplete="current-password"
                  name="confirmNewPassword"
                  size={size}
                  onChange={handleChangePassword}
                  isInvalid={Boolean(errors.confirmNewPassword)}
                />
                {errors.confirmNewPassword && (
                  <Text color="primary.main" fontSize="14" mt="4">
                    {errors.confirmNewPassword}
                  </Text>
                )}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                isDisabled={isUpdate}
                isLoading={isUpdate}
                w="full"
                variant="primary"
              >
                Simpan
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* ALERT EDIT STATUS */}
      {updateStatus && (
        <Box position="fixed" bottom="48" left="50%" transform="translateX(-50%)" zIndex={2}>
          <SlideFade in={showAlertStatus}>
            <Alert bg={updateStatus.success ? 'neutral.900' : 'error.main'} w="max-content">
              <AlertIcon>{updateStatus.success ? <IconCheck /> : <IconX />}</AlertIcon>
              <AlertDescription>
                {updateStatus.success
                  ? 'Akun anda telah diperbaharui'
                  : 'Akun anda gagal diperbaharui'}
              </AlertDescription>
            </Alert>
          </SlideFade>
        </Box>
      )}

      {/* ALERT EDIT PASSWORD STATUS */}
      {updateStatus && (
        <Box position="fixed" bottom="48" left="50%" transform="translateX(-50%)" zIndex={2}>
          <SlideFade in={showAlertStatusPassword}>
            <Alert bg={updateStatus.success ? 'neutral.900' : 'error.main'} w="max-content">
              <AlertIcon>{updateStatus.success ? <IconCheck /> : <IconX />}</AlertIcon>
              <AlertDescription>
                {updateStatus.success
                  ? 'Kata sandi anda telah diperbaharui'
                  : 'Kata sandi anda gagal diperbaharui'}
              </AlertDescription>
            </Alert>
          </SlideFade>
        </Box>
      )}

      {/* ALERT EDIT IMAGE STATUS */}
      {updateStatus && (
        <Box position="fixed" bottom="48" left="50%" transform="translateX(-50%)" zIndex={2}>
          <SlideFade in={showAlertStatusPhoto}>
            <Alert bg={updateStatus.success ? 'neutral.900' : 'error.main'} w="max-content">
              <AlertIcon>{updateStatus.success ? <IconCheck /> : <IconX />}</AlertIcon>
              <AlertDescription>
                {updateStatus.success
                  ? 'Akun anda telah diperbaharui'
                  : 'Pastikan foto transparan format .PNG dan Max size of 3MB'}
              </AlertDescription>
            </Alert>
          </SlideFade>
        </Box>
      )}
    </>
  );
};

Profile.title = 'Profile';
export default Profile;
