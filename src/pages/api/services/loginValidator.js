import { useSession } from "next-auth/react";

export function GetLoggedUser() {
  const { data: session, status } = useSession();
  if (session && status !== "loading") {
    return session.user;
  }
}

export function GetLoggedLevel() {
  const { data: session, status } = useSession();
  if (session && status !== "loading") {
    return session.level;
  }
  else return 0;
}
