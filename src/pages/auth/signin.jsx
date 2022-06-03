import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AnimatePresenceWrapper,
  ButtonComponent,
  PageWrapper,
} from "components";
import {
  getCsrfToken,
  getSession,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import { useRouter } from "next/router";
import { yupSchemas } from "pages/schemas/yupSchemas";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { logger } from "utils/logger";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const usernameIcon = <CFaUserAlt color="gray.300" />;
const passwordIcon = <CFaLock color="gray.300" />;

export default function Signin() {
  const ref = useRef();
  const [sbHeight, setSbHeight] = useState();
  const hgt = ref.current ? ref.current.offsetHeight + 1 : "100vh";

  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const { isOpen: isLoaded, onOpen: onLoad, onClose } = useDisclosure();
  const schema = yupSchemas("signin");

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  logger("i", session);
  const { error } = useRouter().query;
  useEffect(() => {
    setSbHeight(hgt);
    if (error) {
      toast.error(
        <>
          <b>Falha na autenticação</b> <br /> Nome de usuário ou senha
          incorretos.
        </>,
        {
          toastId: 0,
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        }
      );
      onLoad();
    } else {
      setTimeout(onLoad, process.env.MAIN_TRANSITION_TIMEOUT);
    }
  }, [error, hgt, onLoad]);


  if (session) {
    return (
      <AnimatePresenceWrapper isLoaded={isLoaded} noBox>
        <PageWrapper
          level={0}
          warn={true}
          direction={"column"}
          sidebarHeight={sbHeight}
        >
          <Box minWidth="fit-content">
            <Stack spacing="10">
              <Box w="100%" mt="0" color="blue.600">
                <VStack spacing="5" mt="0">
                  <Avatar bg="blue.600" />
                  <Heading color="blue.600">Olá, {session.user} !</Heading>
                </VStack>
              </Box>
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <ButtonComponent
                  colorScheme="blue"
                  type="submit"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sair
                </ButtonComponent>
              </Flex>
            </Stack>
          </Box>
        </PageWrapper>
      </AnimatePresenceWrapper>
    );
  } else {
    return (
      <AnimatePresenceWrapper isLoaded={isLoaded} noBox>
        <PageWrapper
          level={0}
          warn={true}
          direction={"column"}
          sidebarHeight={sbHeight}
        >
          {/* <Flex
            flexDirection="column"
            justifyContent={"center"}
            gap="2"
            alignItems="center"
            //pt={"20vh"}
            //width="100%"
            height={"100vh"}
            ref={ref}
            //ml="0"
            //p="0"
          > */}
            <Flex
              flexDirection="column"
              gap="2"
              alignItems="center"
              //pt={"20vh"}
              width="100%"
              //height={"100%"}
            >
              <Avatar bg="blue.600" />
              <Heading color="blue.600">Login</Heading>
              <Heading textAlign={"center"} size="sm" color="blue.600">
                Faça o login para gerenciar a plataforma
              </Heading>
            </Flex>
            <Flex
              flexDirection="column"
              gap="2"
              pt={"5"}
              alignItems="center"
              width="100%"
            >
              <form
                onSubmit={handleSubmit((data) => {
                  data.callbackUrl = `${window.location.origin}/`;
                  signIn("credentials", data);
                })}
              >
                <Stack spacing={4}>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        {usernameIcon}
                      </InputLeftElement>
                      <Input
                        variant="filled"
                        type="text"
                        placeholder="Nome de usuário"
                        name="user"
                        {...register("user")}
                      />
                    </InputGroup>
                    {errors.user && (
                      <Tag variant="subtle" colorScheme="blackAlpha">
                        <TagLeftIcon as={InfoOutlineIcon} />
                        <TagLabel color="red">{errors.user?.message}</TagLabel>
                      </Tag>
                    )}
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.300">
                        {passwordIcon}
                      </InputLeftElement>
                      <Input
                        variant="filled"
                        type={showPassword ? "text" : "password"}
                        placeholder="Senha"
                        name="password"
                        {...register("password")}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Ocultar" : "Exibir"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && (
                      <Tag colorScheme="blackAlpha">
                        <TagLeftIcon as={InfoOutlineIcon} />
                        <TagLabel color="red">
                          {errors.password?.message}
                        </TagLabel>
                      </Tag>
                    )}
                  </FormControl>
                  <Flex justifyContent="center" alignItems="center">
                    <ButtonComponent colorScheme="blue" type="submit">
                      Entrar
                    </ButtonComponent>
                  </Flex>
                </Stack>
              </form>
            </Flex>
          {/* </Flex> */}
        </PageWrapper>
      </AnimatePresenceWrapper>
    );
  }
}

export async function getServerSideProps(context) {
  if (getSession(context)) {
    const session = await getSession(context);
    return {
      props: {
        session,
        csrfToken: await getCsrfToken(context),
      },
    };
  } else {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    };
  }
}
