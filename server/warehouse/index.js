var rooms         = require('./room_manager.js')


var initRoom = function(roomID, url, cb) {
  rooms.newRoom(roomID, url, function(room) {
    cb(room)  
  }) 
}

var joinRoom = function(roomID, sock, cb) {
  rooms.addUser(roomID, sock.id, function(room) {
    cb(room)
  })
}

var leaveRoom = function(roomID, userID, cb) {
  rooms.removeUser(roomID, userID, function() {
    cb()
  })
}

var getRoom = function(roomID, cb) {
  rooms.getRoom(roomID, function(res) {
    cb(res)
  })
}


var userDisconnect = function(user_socket, cb) {
  //this.leaveRoom(roomID, userID, cb)
  console.log('dont do anything.. yet')
}

var updateState = function(roomID, state, cb) {
  rooms.getRoom(roomID, function(res){
    if(res['state'] != state) {
      var opts = {'state': state}
      rooms.updateRoom(roomID, opts, function() {
        cb(true) 
      }) 
    } else cb(false)
  })
}

var startConsensus = function(socket, roomID, cb) {
  rooms.getRoom(roomID, function(res) {
    socket.consensus = {}
    socket.consensus['nr_res'] = res['users'].length
    socket.consensus['times'] = []
    cb()
  })
}

var consensus = function(socket, roomID,  res, cb) {
  if(socket.consensus['nr_res']-- == 1) {
    var time = Math.max.apply(Math, socket.consensus['times']);
    rooms.getRoom(roomID, function(res_room) {
      var res = {'state':res_room.state, 'time':time}
      cb(res)    
    })
  } else cb()
}

exports.initRoom        = initRoom
exports.getRoom         = getRoom
exports.joinRoom        = joinRoom
exports.leveRoom        = leaveRoom
exports.userDisconnect  = userDisconnect
exports.updateState     = updateState
//exports.currentState  = currentState
exports.startConsensus  = startConsensus
