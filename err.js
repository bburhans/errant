const util = require('util');

class Err extends Error {
  constructor (message, data, inner, ...args) {
    super(message, data, inner, ...args);
    Error.captureStackTrace(this, Err);

    if (data) {
      if (data instanceof Error && inner == null) {
        inner = data;
      }
      else {
        this.data = this.data ? this.data : data;
      }
    }

    if (inner) {
      this.inner = this.inner ? this.inner : inner;
    }
    this.date = this.date ? this.date : new Date();
    this.name = "Error";
    this.stack = `${this.stack ? this.stack : this.name + ": " + this.message}${this.data ? "\nData: " + util.inspect(this.data) : ""}${this.inner ? "\n" + (this.inner.stack ? this.inner.stack : this.inner.name + ": " + this.inner.message) : ""}`;
  }
}

module.exports = Err;
