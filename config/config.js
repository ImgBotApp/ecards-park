const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'lovro'
    },
    port: process.env.PORT || 5000,
    db: 'mongodb://localhost/lovro-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'lovro'
    },
    port: process.env.PORT || 5000,
    db: 'mongodb://localhost/lovro-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'lovro'
    },
    port: process.env.PORT || 5000,
    db: 'mongodb://localhost/lovro-production'
  }
};

module.exports = config[env];
