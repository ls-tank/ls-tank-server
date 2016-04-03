exports.getData = function(s) {
  var _data = s.handshake.query;

  return {
    uid: _data.uid,
    head: +_data.head,
    body: +_data.body,
    wheel: +_data.wheel
  }
};