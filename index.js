var server = require('./server/server.js').endpoint
var http = require('http').Server(server)
var config = require('./config.js')
var io = require('./server/io.js').io.listen(http)

http.listen(3000, function() {
	console.log('listening on port 3000')
})

exports.http = http
