var _ = require('underscore')


var rooms = {}

var newRoom = function(roomID, url,  cb) {
  var state = 'new'
  this.rooms[roomID] = {'users':[roomID],'currURL':url,'state':state}
  cb(this.rooms[roomID])
}

var getRoom = function(roomID, cb) {
  cb(this.rooms[roomID])
}

var updateRoom = function(roomID, opts, cb) {
  var context = this
  _.keys(opts).forEach(function(k) {
    context.rooms[roomID][k] = opts[k]
  })
  cb()
}

var addUser = function(roomID, user, cb) {
  this.rooms[roomID]['users'].push(user)
  cb(this.rooms[roomID])
}

var removeUser = function(roomID, user, cb) {
  var i = this.rooms[roomID]['users'].indexOf(user)
  if(i > -1) { 
    this.rooms[roomID]['users'].splice(i, 1)
    if(this.rooms[roomID]['users'].length == 0) {
      delete rooms[roomID]
    }
  }
  cb(this.rooms[roomID])
}

exports.rooms       = rooms
exports.newRoom     = newRoom
exports.getRoom     = getRoom
exports.updateRoom  = updateRoom
exports.addUser     = addUser
exports.removeUser  = removeUser
