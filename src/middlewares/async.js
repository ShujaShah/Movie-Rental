//error handling to have try catch at single instance and use them in all the route handlers
module.exports = function asyncMiddleware(handler) {
    return async (req, res, next) => {
      try {
        await handler(req, res);
      } catch (ex) {
        next(ex);
      }
    };
  };
  