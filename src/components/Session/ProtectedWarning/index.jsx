import { useSession } from "next-auth/react";
import { logger } from "utils/logger";

export function ProtectedWarning({ children, level, warn, ...pageProps }) {
  const { data: session, status } = useSession();
  logger("i", session);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (session && session.level >= level) {
    return children;
  } else if (warn) {
    return <>b</>;
  } else {
    return <></>;
  }
}
