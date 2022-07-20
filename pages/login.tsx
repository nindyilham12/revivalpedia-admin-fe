import { ReactNode, useEffect, useRef } from 'react';
import { GuestLayout } from '@/components';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Link,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useLogin } from '@/hooks';
import { useRouter } from 'next/router';
import { PasswordInput } from '@/components/molecules';
import { IconLoader } from '@tabler/icons';
import { LoginErrorState } from '@/typings';
import { INVALID_EMAIL_ERROR, SPIN_KEYFRAMES } from '@/lib/Const';

const Login = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const enableAutoFocus = useBreakpointValue({ base: false, xl: true });

  const onFail = (errors: Partial<LoginErrorState>) => {
    if (!enableAutoFocus) return;

    if (errors.email) {
      emailRef.current?.focus();
    } else {
      passwordRef.current?.focus();
    }
  };

  const onSuccess = () => router.push('/dashboard');
  const { state, submit, update } = useLogin(onFail, onSuccess);
  const { errors, isLoading } = state;
  const inputSize = useBreakpointValue({ base: 'sm', lg: 'lg' });
  const buttonSize = useBreakpointValue({ base: 'md', lg: 'lg' });

  useEffect(() => {
    if (enableAutoFocus) {
      emailRef.current?.focus();
    }
  }, [enableAutoFocus]);

  return (
    <>
      <Head>
        <title>RevivaLPedia | Login</title>
      </Head>

      <Stack
        p={{ base: '24', sm: '40' }}
        bg="surface.white"
        h="max-content"
        w="508px"
        maxW="100%"
        shadow="small"
        borderRadius="4"
      >
        <NextLink href="/" passHref>
          <Link display="block" pos="relative" w="128px" h="38px" mb="48">
            <Image src="/logo.png" alt="logo" layout="fill" objectFit="cover" />
          </Link>
        </NextLink>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          noValidate
        >
          <Heading size="6" as="h6" fontWeight="semibold" mb="24">
            Masuk ke{' '}
            <Text as="span" color="primary.main" fontSize="inherit" fontWeight="inherit">
              RevivaLPedia
            </Text>
          </Heading>

          <FormControl mb="16" h="max-content">
            <FormLabel>Email</FormLabel>
            <Input
              autoComplete="email"
              ref={emailRef}
              type="email"
              size={inputSize}
              onBlur={({ target }) => update('email', target.value)}
              onChange={({ target }) => update('email', target.value)}
              isInvalid={errors.email !== null}
            />
            {errors.email && (
              <Text color="primary.main" fontSize="14" mt="4">
                {errors.email}
                {errors.email === INVALID_EMAIL_ERROR ? `: ${state.fields.email}` : ''}
              </Text>
            )}
          </FormControl>

          <FormControl mb="12">
            <FormLabel>Password</FormLabel>
            <PasswordInput
              autoComplete="current-password"
              ref={passwordRef}
              size={inputSize}
              onBlur={({ target }) => update('password', target.value)}
              onChange={({ target }) => update('password', target.value)}
              isInvalid={errors.password !== null}
            />
            {(errors.result || errors.password) && (
              <Text color="primary.main" fontSize="14" mt="4">
                {errors.result || errors.password}
              </Text>
            )}
          </FormControl>

          {/* <Stack isInline justifyContent="flex-end" mb="24">
            <NextLink href="/lupa-password" passHref>
              <Link fontSize="14" color="primary.main">
                Lupa password?
              </Link>
            </NextLink>
          </Stack> */}

          <Button
            mt="24"
            size={buttonSize}
            w="full"
            type="submit"
            disabled={isLoading}
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
            Masuk
          </Button>
        </form>
      </Stack>
    </>
  );
};

Login.getLayout = (page: ReactNode) => {
  return <GuestLayout>{page}</GuestLayout>;
};

export default Login;
