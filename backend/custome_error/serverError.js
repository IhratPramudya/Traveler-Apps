const ClientError = require('./ClientError');

class ServerError extends ClientError {
  constructor(message, statusCode) {
    super(message, statusCode);
    this.name = 'ServerError';
  }
}

module.exports = ServerError;
