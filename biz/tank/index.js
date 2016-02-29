'use strict';
var events = require('events');

class Tank extends events {
  constructor() {
    super();
    this.direction = 0;
  }

  setDirection(direction) {
    this.direction = direction
  }
}

module.exports = Tank