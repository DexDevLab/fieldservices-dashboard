import { Flex, Heading, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import { SidebarSubItem } from "../SidebarSubItem";

export function SidebarItem({
  isLarge,
  icon,
  name,
  itemLevel,
  showSubItems,
  userLevel,
  expanded,
  clickEvent,
  children
}) {

  if (userLevel >= itemLevel) {
    if (isLarge) {
      return (
        <Flex
          flexDir="column"
          pb="1"
          pt="1"
          alignItems={"flex-start"}
          width={"90%"}
        >
          <Flex
            width="100%"
            backgroundColor={name === showSubItems && "blue.800"}
            borderRadius={8}
            borderBottomRadius={expanded === 1 && "0"}
            direction={"row"}
            alignItems={"flex-start"}
            onClick={
              clickEvent
            }
            _hover={name === showSubItems ? {backgroundColor: "blue.800", color: "white", borderBottomRadius: "0"} : { backgroundColor: "blue.800", color: "white", borderBottomRadius: "8" } }
            cursor={"pointer"}
            userSelect="none"
          >
            <IconButton
              cursor={expanded !== 2 && "auto"}
              color={name === showSubItems ? "white" : "black"}
              backgroundColor="unset"
              icon={icon}
              fontSize="lg"
              m="0"
              _focus={{ textDecor: "none" }}
              _hover={{ textDecor: "none" }}
              _active={{ backgroundColor: "none" }}
            />
            <Heading
              fontSize={"sm"}
              m="0"
              mt="0"
              mb="0"
              alignSelf={"center"}
              fontWeight={name === showSubItems && "bold"}
              color={name === showSubItems && "white"}
            >
              {name}
            </Heading>
          </Flex>
          {children}
        </Flex>
      );
    } else {
      return (
        <>
          <Flex
            flexDir="column"
            w="100%"
            pb="1"
            pt="1.5"
            alignItems={"center"}
            justifyContent="center"
          >
            <Link
              pr={"10"}
              borderRadius={8}
              w={"100%"}
              _hover={
                expanded !== 1 && {
                  textDecor: "none",
                  fontWeight: "bold",
                  backgroundColor: "blue.700",
                }
              }
            >
              <Flex alignItems="center">
                <IconButton
                  cursor={expanded !== 2 && "auto"}
                  color={"black"}
                  backgroundColor="unset"
                  icon={expanded !== 1 && icon}
                  fontSize="lg"
                  _focus={{ textDecor: "none" }}
                  _hover={{ textDecor: "none" }}
                  _active={{ backgroundColor: "none" }}
                  onClick={
                    clickEvent
                  }
                />
              </Flex>
            </Link>
          </Flex>
        </>
      );
    }
  } else {
    return <></>;
  }
}
