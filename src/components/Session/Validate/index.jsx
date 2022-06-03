import { useProps, Stat, StatLabel, Flex, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Children, Component, Fragment, useState } from "react";
import React from "react";
import GetSessionUser from "../GetSessionUser";
import { logger } from "utils/logger";

export function Validate({ changeSidebarHeight, fontSize, fontWeight, color, showSessionUser, children, level, warn, ...pageProps }) {
  const { data: session, status } = useSession();
  logger("i", "Status da sessão: " + session);

  if (status === "loading") {
    return (<>Skeleton here...</>)
  }
  else if (level === 0){
    return (<>{children}</>)
  }
  else if (session && session.level >= level) {
      const username = session.user;
      return (username,
        <Component changeSidebarHeight={changeSidebarHeight}>
        {
          showSessionUser && (

            <Text fontSize={fontSize} fontWeight={fontWeight} color={color}>
          <GetSessionUser username={username}/>
        </Text>
          )
        }
        {children}
        </Component>
      )
  } 
  else if (warn) {
    return <>page 401 Unauthorized</>;
  } else {
    return <>page 400 bad request</>;
  }
}