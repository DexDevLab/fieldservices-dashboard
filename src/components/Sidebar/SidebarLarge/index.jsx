import {
  Button,
  Flex,
  Heading,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import "animate.css";
import { BrandIcon } from "components/Logo";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export function SidebarLarge({ height, userLevel, userName, expanded, router, children }) {

  return (
    expanded > 0 && (
      <>
        <Flex
          //minHeight={"100vh"}
          height={height}
          position={"absolute"}
          p="0"
          m="0"
          ml="12"
          background="blue.600"
          shadow="10px 0 5px -2px rgba(0, 0, 0, 0.30)"
          w={"160px"}
          className={
            expanded === 1
              ? "animate__animated animate__slideInLeft"
              : "animate__animated animate__slideOutLeft"
          }
          flexDir="column"
          justifyContent="space-between"
        >
          <Flex pt="4" flexDir="column" w="100%" alignItems="center" as="nav">
            <Flex justifyContent="center" alignItems="center" pb="4">
              <Flex h={"8"} justifyContent="center">
                <BrandIcon />
              </Flex>
            </Flex>
            <Flex justifyContent="center" alignItems="center" pb="4">
              <Text
                textAlign="center"
                fontSize="md"
                fontWeight={"bold"}
                color="white"
              >
                Field Services Dashboard
              </Text>
            </Flex>
            {children}
          </Flex>
          <Flex
            p="3%"
            flexDir="column"
            w="100%"
            alignItems={"center"}
            pb="0"
            pl="0"
          >
            <Popover closeOnBlur={true} placement="left">
              <PopoverTrigger>
                <Flex
                  flexDir="column"
                  mb={3.5}
                  mt={5}
                  w="100%"
                  align="center"
                  onClick={
                    userLevel == 0
                      ? () => {
                          router.push("/auth/signin");
                        }
                      : () => {
                          router.push("");
                        }
                  }
                  _hover={{ cursor: "pointer" }}
                >
                  {userLevel >= 2 ? (
                    <>
                      <Heading width="90%" fontSize={"15px"} pb={"3"}>
                        {userName}
                      </Heading>
                      <Heading
                        width="90%"
                        color={"white"}
                        fontWeight="normal"
                        fontSize={"xs"}
                      >
                        Administrador
                      </Heading>
                    </>
                  ) : userLevel == 0 ? (
                    <>
                      <Heading width="90%" color="white" fontSize={"lg"}>
                        Login
                      </Heading>
                    </>
                  ) : (
                    <>
                      <Heading width="90%" fontSize={"15px"} pb={"3"}>
                        {userName}
                      </Heading>
                      <Heading
                        width="90%"
                        color={"white"}
                        fontWeight="normal"
                        fontSize={"xs"}
                      >
                        Usuário
                      </Heading>
                    </>
                  )}
                </Flex>
              </PopoverTrigger>
              <PopoverContent w={"fit-content"} border="none">
                <Button
                  backgroundColor="blue.600"
                  boxShadow="none"
                  _hover={{
                    cursor: "pointer",
                    backgroundColor: "blue.700",
                    color: "white",
                    boxShadow: "none",
                  }}
                  _focus={{ outlineWidth: "0", boxShadow: "none" }}
                  onClick={() => {
                    signOut();
                    router.push("/auth/signin");
                  }}
                >
                  Sair
                </Button>
              </PopoverContent>
            </Popover>
          </Flex>
        </Flex>
      </>
    )
  );
}
