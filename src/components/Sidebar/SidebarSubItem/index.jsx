import { Flex, Heading, IconButton } from "@chakra-ui/react";
import "animate.css";
import React from "react";

export function SidebarSubItem({
  icon,
  name,
  parentName,
  subItemLevel,
  parentLength,
  subItemIndex,
  showSubItems,
  userLevel,
  clickEvent,
}) {
  if (userLevel >= subItemLevel) {
    return (
      <Flex
        width={"100%"}
        borderBottomRadius={parentLength - 1 === subItemIndex && 8}
        backgroundColor={parentName === showSubItems && "blue.700"}
        className={
          parentName === showSubItems
            ? "animate__animated animate__fadeIn"
            : "animate__animated animate__fadeOut"
        }
        direction={"row"}
        onClick={clickEvent}
        cursor="pointer"
      >
        <IconButton
          color={parentName === showSubItems ? "white" : "black"}
          backgroundColor="unset"
          icon={icon}
          fontSize="md"
          m="0"
          mt="0"
          mb="0"
          _focus={{ textDecor: "none" }}
          _hover={{ textDecor: "none" }}
          _active={{ backgroundColor: "none" }}
        />
        <Heading
          fontSize={"xs"}
          m="0"
          mt="0"
          mb="0"
          alignSelf={"center"}
          _hover={{ fontWeight: "bold" }}
          fontWeight={parentName === showSubItems && "regular"}
          color={parentName === showSubItems && "white"}
        >
          {name}
        </Heading>
      </Flex>
    );
  } else {
    return <></>;
  }
}
