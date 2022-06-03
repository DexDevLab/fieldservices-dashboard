import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useRouter } from "next/router";
import { getCsrfToken, useSession, signIn, signOut, getSession } from "next-auth/react";
import { useEffect } from "react";
import { SidebarComponent } from "components";
import { FiMenu } from 'react-icons/fi'

export default function Home() {
  const { data: session } = useSession();
  if (session){
    return <>Logged in </>
  }
  else{
    return (
      <>Not Logged in</>
    ) 
  }
}


export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
      csrfToken: await getCsrfToken(context),
    },
  };
}
