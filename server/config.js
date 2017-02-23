const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://xz:15151515@localhost:27017/mern-starter',
  port: process.env.PORT || 8000,
  jwtSecret: 'a secret phrase for script!!',
};

export default config;
