module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/raid-posts",
        permanent: true,
      },
    ];
  },
};
