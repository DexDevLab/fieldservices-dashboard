import { Flex } from "@chakra-ui/react"
import { Children, useEffect, useState } from "react"
import { SidebarComponent } from "../SidebarComponent";

export function SidebarSizeWrapper({
    children,
    value
  }){
    const [sidebarHeight, setSidebarHeight] = useState();

    useEffect(()=>{
        setSidebarHeight(value)
      },[setSidebarHeight, value])
    return (<Flex>
        <SidebarComponent height={sidebarHeight} />
        {children}
    </Flex>
    )
  }


