import "react-toastify/dist/ReactToastify.min.css";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { logger } from "utils/logger";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        user: {
          label: "username",
          type: "text",
          placeholder: "Nome de Usuário",
        },
        password: { label: "password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials, req) {
        //logger("i", credentials);
        if (credentials.user === "admin"){
            credentials.level = process.env.ADMIN_LEVEL;
        }
        const res = await fetch("http://localhost:3000/api/services/loginService", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        if (res.ok && user) {
          logger("i", "AUTH OK");
          return user;
        }
        logger("ERROR", "AUTH NOK");
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    signIn: ({user, credentials}) =>{
      // logger("i", "CALLBACK SIGNIN" - JSON.stringify(user));
      // logger("i", "CALLBACK SIGNIN" - JSON.stringify(credentials));
      return true;
    },
    jwt: ({token, user}) => {
      //console.log ("CALLBACK JWT: USER - JSON.stringify(user));
      //console.log("CALLBACK JWT: TOKEN - JSON.stringify(token));
      if (user){
        token.user = user.user;
        token.level = user.level;
        //console.log("CALLBACK JWT: TOKEN - JSON.stringify(token));
      }
      return token;
    },
    session: ({session, token}) => {
      //console.log("CALLBACK SESSION: SESSION - JSON.stringify(session));
      //console.log("CALLBACK SESSION: TOKEN - JSON.stringify(token));
      if (token){
        session.user = token.user;
        session.level = token.level;
        //console.log("CALLBACK SESSION: SESSION - JSON.stringify(session));
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  session:{
    maxAge: 60*30
  },
});
