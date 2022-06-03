import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
  chakra,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stats,
  Stack,
} from "@chakra-ui/react";
import { Menus } from "components/Menus";
import { MenuFormularios } from "components/Menus";
import { MenuGerenciar } from "components/Menus";
import { Validate } from "components/Session";
import { Component } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import {
  getCsrfToken,
  useSession,
  signIn,
  signOut,
  getSession,
} from "next-auth/react";
import { MenusComponent } from "components/Menus/MenusComponent";

const CFaUserAlt = chakra(FaUserAlt);
const usernameIcon = <CFaUserAlt />;

export function Navbar() {
  const quiosqueMenuItems = [
    {
      label: "Termo de Responsabilidade",
      link: "/formularios/tdr",
    },
    {
      label: "Checklist de Pré-Formatação",
      link: "/formularios/pre",
    },
    {
      label: "Checklist de Pós-Formatação",
      link: "/formularios/pos",
    },
  ];

  const cadastroMenuItems = [
    {
      label: "Acessos",
      link: "/cadastro/acessos",
    },
    {
      label: "Técnicos",
      link: "/cadastro/tecnicos",
    },
    {
      label: "Localidades",
      link: "/cadastro/localidades",
    },
    {
      label: "Equipamentos",
      link: "/cadastros/equipamentos",
    },
  ];

  return (
    <>
      <Flex
        bg="blue.600"
        p="2"
        gap="5"
        width="auto"
        justifyContent="space-evenly"
      >
        <Flex width="100%">
          <Heading size="md" mt="1">
            <Link href="/">Field Services Dashboard</Link>
          </Heading>
        </Flex>
        <Flex width="100%" justifyContent="center">
          <MenusComponent
            color="blue.600"
            menuLabel="Quiosque"
            menuItems={quiosqueMenuItems}
          />
          <Validate level="2">
            <MenusComponent
              color="blue.600"
              menuLabel="Cadastro"
              menuItems={cadastroMenuItems}
            />
          </Validate>
        </Flex>
        <Flex width="100%" flexDir="row-reverse">
          <Validate level="1">
            <ButtonGroup gap="2">
              <Box>
                <Heading size="sm">
                  <Menu>
                    <MenuButton as={Button} fontSize="md" fontWeight="bold">
                      <Flex gap="5" alignItems="center">
                        {usernameIcon}
                        <Heading
                          as={Validate}
                          level="1"
                          showSessionUser="true"
                        ></Heading>
                      </Flex>
                    </MenuButton>
                    <MenuList
                      minWidth="10rem"
                      width="auto"
                      borderWidth="0"
                      bgColor="blue.600"
                    >
                      <MenuItem
                        fontSize="sm"
                        onClick={() => {
                          signOut();
                        }}
                        _focus={{
                          outline: "none",
                        }}
                        _hover={{
                          bgColor: "blue.600",
                          fontWeight: "bold",
                        }}
                        _active={{
                          bgColor: "blue.600",
                        }}
                      >
                        Sair
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Heading>
              </Box>
            </ButtonGroup>
          </Validate>
        </Flex>
      </Flex>
    </>
  );
}
