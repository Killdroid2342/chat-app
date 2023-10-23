function routes(app, { urlencodedParser }) {
  app.use('/user', urlencodedParser, require('./user'));
  app.use('/auth', urlencodedParser, require('./auth'));
  app.use('/message', urlencodedParser, require('./message'));
}
module.exports = routes;
