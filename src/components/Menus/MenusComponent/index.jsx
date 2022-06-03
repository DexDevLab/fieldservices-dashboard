import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  chakra,
  Text,
  Fade,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { MenuComponent } from "..";
import React from "react";
import { useRouter } from "next/router";

export function MenusComponent({ color, menuLabel, menuItems, ...pageProps }) {
  const router = useRouter();
  return (
    <>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              rightIcon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
              fontSize="md"
              fontWeight="bold"
              bgColor={color}
              isActive={isOpen}
              _focus={{
                outline: "none",
              }}
              _hover={{
                bgColor: color,
              }}
              _active={{
                bgColor: color,
              }}
            >
              {menuLabel}
            </MenuButton>

            {menuItems && (
              <>
                <MenuList borderWidth="0" bgColor={color}>
                  {React.Children.toArray(
                    menuItems.map((item, k) => (
                      <>
                        <MenuItem
                          fontSize="sm"
                          _focus={{
                            outline: "none",
                          }}
                          _hover={{
                            bgColor: color,
                            fontWeight: "bold",
                          }}
                          _active={{
                            bgColor: color,
                          }}
                          onClick={() => {
                            router.push(item.link);
                          }}
                        >
                          {item.label}
                        </MenuItem>
                      </>
                    ))
                  )}
                </MenuList>
              </>
            )}
          </>
        )}
      </Menu>
    </>
  );
}
