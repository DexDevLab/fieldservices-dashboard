import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React, { useState } from "react";

export function SelectComponent({disabled, color, labelState, setFunctionState, options, optionCriteria, optionCriteriaValue, optionLabel, optionValue, registerFunction}) {

  return (
    <>
      <Menu
      >
        <MenuButton disabled={disabled}
          as={Button}
          rightIcon={<ChevronDownIcon />}
          fontSize="sm"
          mb="3"
          color={color}
          width="100%"
          textAlign="left"
          fontWeight="normal"
          _focus={{
            outline: "none",
          }}
          _hover={{
            bgColor: "none",
          }}
          _active={{
            bgColor: "none",
          }}
        >
          {labelState}
        </MenuButton>
        {options && (
          <>
            <MenuList width="fit-content">
              {React.Children.toArray(
                options.map((option, k) => (
                    option[optionCriteria] === optionCriteriaValue && (
                    <>
                        <MenuItem
                    fontSize="sm"
                    width={"100%"}
                    _focus={{
                      outline: "none",
                    }}
                    _hover={{
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      setFunctionState(option[optionValue])
                    }}
                  {...registerFunction}
                  >
                    {option[optionLabel]}
                  </MenuItem>
                    </>
                    ) 
                )
                )
              )}
            </MenuList>
          </>
        )}
      </Menu>
    </>
  );
}
