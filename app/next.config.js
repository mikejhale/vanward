module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/certifications/list',
        permanent: true,
      },
    ];
  },
};
