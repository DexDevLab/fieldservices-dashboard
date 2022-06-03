import { useState } from "react";

const { Textarea, Flex, Text } = require("@chakra-ui/react");

export function InputTextBox({display, maxLength, placeholder, textValueFunction, textAreaSize}) {
    const [value, setValue] = useState('');
  
    let handleInputChange = (e) => {
      let inputValue = e.target.value
      setValue(inputValue)
    }

    let handleInputSubmit = (f) =>{
      let inputUpdate = f.target.value
      textValueFunction(inputUpdate)
    }
    return (
      <>
        <Flex direction={"column"} display={display}> 
        <Textarea
          maxLength={maxLength}
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputSubmit}
          placeholder={placeholder}
          fontSize={textAreaSize}
        />
        <Text textAlign={"right"} color="gray" fontSize={"1.1vh"} width="100%" mb='8px'>Escreva até mais <b>{ maxLength - value.length}</b> caracteres</Text>
        </Flex>
      </>
    )
  }