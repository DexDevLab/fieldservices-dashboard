/**
 * Especificações das transições.
 */

 export const pageDefaults = {
    pageInitial: {
      opacity: 0,
    },
    pageAnimate: {
     opacity: 1,
    //  transition: {
    //   delay: .3
    // }
    },
    pageExit: {
      backgroundColor: "brand1.50",
      opacity: 0,
    }
  };

  export const sideBar = {
    hidden: {
      scale: .8,
      opacity: 0
  },
  visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: .4
      }
  }
}

 