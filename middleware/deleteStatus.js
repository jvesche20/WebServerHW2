// eslint-disable-next-line import/no-unresolved
const StatusCodes = require('http-status-codes');

module.exports = (request, response, next) => {
  if (request.method === 'DELETE') {
    response.sendStatus(StatusCodes.METHOD_NOT_ALLOWED);
  } else {
    next();
  }
};
