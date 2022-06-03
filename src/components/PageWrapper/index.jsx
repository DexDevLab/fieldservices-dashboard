import { Flex } from "@chakra-ui/react";
import { Validate } from "components/Session";
import { SidebarSizeWrapper } from "components/Sidebar";

export function PageWrapper({
  level,
  warn,
  direction,
  height,
  sidebarHeight,
  padding,
  marginLeft,
  marginTop,
  width,
  children,
}) {
  return (
    <>
      <Flex
        flexDirection={direction}
        height={height ? height : ["100vh", "100vh", "85vh", "85vh", "80vh"]}
        //p={padding? (padding) : ("6")}
        //ml={marginLeft ? (marginLeft) : (["1vw", "1vw", "2vw", "2vw", "10vw"])}
        //width={width ? (width) : (["90vw", "60vw", "50vw", "40vw", "22vw"])}
        //mt={marginTop ? (marginTop) : (["15vh", "18vh", "18vh", "15vh", "20vh"])}
      >
        <SidebarSizeWrapper value={sidebarHeight}>
          <Validate level={level} warn={warn}>
            <Flex
              flexDirection={direction}
              p={padding ? padding : "6"}
              height={
                height ? height : ["100vh", "100vh", "85vh", "85vh", "80vh"]
              }
              ml={
                marginLeft ? marginLeft : ["1vw", "1vw", "2vw", "2vw", "10vw"]
              }
              width={width ? width : ["90vw", "60vw", "50vw", "40vw", "22vw"]}
              mt={
                marginTop ? marginTop : ["15vh", "18vh", "18vh", "15vh", "20vh"]
              }
            >
              {children}
            </Flex>
          </Validate>
        </SidebarSizeWrapper>
      </Flex>
    </>
  );
}
