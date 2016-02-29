'use strict';
var events = require('events');

class TanksSet extends events {
  constructor() {
    super();
    this._tanks = {};
  }

  set(uid, tank) {
    this._tanks[uid] = tank; 
  }

  get(uid) {
    return this._tanks[uid];
  }

  getAll() {
    return this._tanks;
  }

  remove(uid) {
    delete this._tanks[uid];
  }

}

module.exports = new TanksSet()