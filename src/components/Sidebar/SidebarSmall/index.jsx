import {
  Avatar,
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import "animate.css";
import { signOut } from "next-auth/react";
import React from "react";
import { FiMenu } from "react-icons/fi";
import ScreenSize from "utils/ScreenSize";

export function SidebarSmall({
  userName,
  userLevel,
  expanded,
  expandedFunction,
  router,
  children,
  height
}) {
  return (
    <Flex
      zIndex={9999}
      height={height}
      position={"absolute"}
      background="blue.600"
      shadow={expanded < 2 ? "unset" : "dark-lg"}
      w="50px"
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="2.5"
        pt="2.5"
        flexDir="column"
        w="100%"
        alignItems="center"
        as="nav"
      >
        <Flex justifyContent="center" alignItems="center" pt="0" pb="4">
          <IconButton
            background="none"
            color="black"
            _hover={{ background: "blue.700", outline: "0" }}
            _focus={{ background: "none", outline: "0" }}
            _active={{ backgroundColor: "unset" }}
            icon={<FiMenu />}
            onClick={expandedFunction}
          />
        </Flex>
        <Flex justifyContent="center" alignItems="center" pb="14" />
        <Flex
          p="0"
          pt="1.5"
          flexDir="column"
          w="100%"
          alignItems="center"
          as="nav"
        >
          {children}
        </Flex>
      </Flex>
      <Flex
        p="3%"
        flexDir="column"
        w="100%"
        alignItems={"center"}
        //mb={4}
        pb="0"
        pr="0"
      >
        {(userLevel == 0) | (expanded == 1) ? (
          <Avatar
            name={userName}
            mb={userLevel > 0 ? "5" : "2"}
            size="sm"
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              router.push("/auth/signin");
            }}
          />
        ) : (
          <Popover closeOnBlur={true} placement="left">
            <PopoverTrigger>
              <Avatar
                name={userName}
                mr={"0.5"}
                mb={"5"}
                size={"sm"}
                _hover={{
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                }}
                _focus={{ outlineWidth: "0", boxShadow: "none" }}
                outlineWidth={"0"}
                boxShadow="none"
              />
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
        )}
      </Flex>
    </Flex>
  );
}
