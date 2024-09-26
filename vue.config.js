module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'axios/lib/adapters/http': false,
      },
    },
  },
};
