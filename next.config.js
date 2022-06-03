// module.exports = {
//   reactStrictMode: true,
// }
module.exports = (phase) => {
  return {
    async redirects() {
      return [
        {
          source: "/",
          destination: "/auth/signin",
          permanent: true,
        },
      ];
    },
    reactStrictMode: false
  };
};
