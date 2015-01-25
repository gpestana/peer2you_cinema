var test  = require('tape'),
_         = require('underscore'),
rooms     = require('../server/warehouse/room_manager.js')

var roomID_1 = 'room1'
var roomID_2 = 'room2'
var roomID_3 = 'room3'
var url_1 = 'google.com'
var url_2 = 'youtube.com'
var user_1 = 'user1'
var user_2 = 'user2'

test('add remove rooms', function(t) {
  rooms.newRoom(roomID_1, url_1, function() {
    rooms.addUser(roomID_1, user_1, function() {
      rooms.getRoom(roomID_1, function(res) {
        if(res) {
          t.equal(res['users'][0], roomID_1, 'creator user added')
          t.equal(res['users'][1], user_1, 'user_1 added')
          t.equal(res['currURL'], url_1, 'url added')
          rooms.removeUser(roomID_1, roomID_1, function(res) {
            if(!res) t.fail('room is not empty and should not be deleted')
            else {
              rooms.removeUser(roomID_1, user_1, function(res) {
                if(res) t.fail('room is empty now. should be deleted')
                else t.pass('add and remove users ok')
              })
            } 
          })        
        } 
      })
    })
  })  
  t.end()
})

test('update room', function(t) {
  rooms.newRoom(roomID_2, url_1, function() {
    var opts = {'currURL': url_2}
    var randOPT = ['rand1', 'rand2', 'rand3']
    var opts2 = {'randomOPT': randOPT}

    rooms.updateRoom(roomID_2, opts, function() {
      rooms.getRoom(roomID_2, function(res){
         t.equal(res['currURL'], url_2, 'currURL changed')
      })
    })
    rooms.updateRoom(roomID_2, opts2, function() {
      rooms.getRoom(roomID_2, function(res) {
        t.equal(res['randomOPT'], randOPT, 'random opts ok')
      })
    })
  })
  t.end()
})

