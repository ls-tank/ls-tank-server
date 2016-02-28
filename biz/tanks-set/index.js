'use strict';
var events = require('events');

class TanksSet extends events {
  constructor() {
    super();
    this._tanks = [];
  }

  add(tank) {
    this._tanks.push(tank);
  }

  remove(tank) {
    // todo
  }

}

module.exports = new TanksSet()