const usersRouter = require('./users');
const tweetsRouter = require('./tweets');

const baseApiUrl = '/api/v1';

module.exports = (app) =>{
  app.use(`${baseApiUrl}/users`, usersRouter);
  app.use(`${baseApiUrl}/tweets`, tweetsRouter);
}
