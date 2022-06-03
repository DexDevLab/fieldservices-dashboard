import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";

export function SelectComponentQuantity({
  visibility,
  idx,
  count,
  color,
  setFunctionState,
  setCount,
  options,
  optionCriteria,
  optionCriteriaValue,
  optionLabel,
  optionValue,
  selectorDefaultValue,
  selectorMax,
  selectorMin,
}) {
  const [selected, selectedSet] = useState("Selecione...");
  const [label, labelSet] = useState("Selecione...");
  const [val, setVal] = useState("0");

  useEffect(() =>{
    
    if (selected !== "Selecione..."){
      labelSet(selected);
      setFunctionState(idx, selected, val);
    }
    
  },[idx, selected, setFunctionState, val])

  const transferValue = (v) => {
    setVal(v);
    setFunctionState(idx, selected, v);
  };

  const transferSelected = (option) => {
    selectedSet(option);
    setFunctionState(idx, selected, val);
    setVal("0");
  }

  return (
    <Flex
      direction="row"
      visibility={visibility}
      //width="15vw"
      //alignItems="center"
      justifyContent={"space-between"}
      //gap={3}
    >
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          fontSize="sm"
          mb="3"
          //mr="5"
          color={color}
          width="60%"
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
          {label}
        </MenuButton>
        {options && (
          <>
            <MenuList width={"fit-content"}>
              {React.Children.toArray(
                options.map(
                  (option, k) =>
                    option[optionCriteria] === optionCriteriaValue && (
                      <>
                        <MenuItem
                          fontSize="sm"
                          _focus={{
                            outline: "none",
                          }}
                          _hover={{
                            fontWeight: "bold",
                          }}
                          onClick={() => {transferSelected(option[optionValue])}}
                        >
                          {option[optionLabel]}
                        </MenuItem>
                      </>
                    )
                )
              )}
            </MenuList>
          </>
        )}
      </Menu>
      <Flex justifyContent={"space-between"} width={"30%"}>
        <Flex
          width="70%"
          mb={3}
          //ml={20}
        >
          {selected !== "Selecione..." && (
            <NumberInput
              value={val}
              onChange={transferValue}
              defaultValue={selectorDefaultValue}
              min={selectorMin}
              max={selectorMax}
            >
              <NumberInputField/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          )}
        </Flex>
        <Flex
          direction={"column"}
          justifyContent={"center"}
          alignItems="center"
          mb={3}
        >
          {idx - 1 === 0 ? (
            selected !== "Selecione..." &&
            count === 0 &&
            val !== "0" && (
              <>
                <IoMdAddCircle
                  color="green"
                  size="1.2vw"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                />
              </>
            )
          ) : (
            <>
              {selected !== "Selecione..." && val !== "0" && (
                <>
                  <IoMdAddCircle
                    color="green"
                    size="1.2vw"
                    onClick={() => {
                      setCount(count + 1);
                    }}
                  />
                </>
              )}
              <IoMdRemoveCircle
                color="red"
                size="1.2vw"
                onClick={() => {
                  setCount(count - 1);
                }}
              />
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
