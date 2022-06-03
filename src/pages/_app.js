import { Box, ChakraProvider, Flex, forwardRef, Spacer, useBreakpointValue } from "@chakra-ui/react";
import { BrandBG, PageWrapper, SidebarComponent, SidebarSizeWrapper } from "components";
import { StateMachineProvider } from "little-state-machine";
import { SessionProvider, useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ScreenSize from "utils/ScreenSize";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ChakraProvider>
      <StateMachineProvider>
        <SessionProvider session={session}>
          <ToastContainer />
          {/* <Box
        position="fixed"
        bottom="350px"
        right="-350px"
        zIndex="hide"
        opacity={".2"}
      >
      <BrandBG h="90vh" />
      </Box> */}
          <Component
          {...pageProps} />
        </SessionProvider>
      </StateMachineProvider>
    </ChakraProvider>
  );
}

// function Auth({ children }) {
//   const { data: session, status } = useSession({ required: true });

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   return children;
// }

export default MyApp;
