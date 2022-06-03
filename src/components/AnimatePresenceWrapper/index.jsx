import { Box, Center } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Component } from "react";
import { pageDefaults, transitions, variants } from "styles/transitions";


export function AnimatePresenceWrapper({ children, isLoaded, router, noBox, customVariant, customTransition }) {
  return (
    <>
      {!isLoaded ? (
        <></>
      ) : (
        <AnimatePresence>
          <motion.div
            //key={router.route}
            initial="pageInitial"
            animate="pageAnimate"
            exit="pageExit"
            variants={pageDefaults}
          >
            {
              noBox ? (<>{children}</>) : (<><Center>{children}</Center></>)
            }
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
