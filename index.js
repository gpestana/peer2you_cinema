var server = require('./server/server.js').endpoint
var http = require('http').Server(server)
var config = require('./config.js')
var io = require('./server/io.js').io.listen(http)

var opt = process.argv[2];
var addr = 'localhost';

if(opt == '-prod') {
  addr = '178.79.165.86';
}

http.listen(3000, function() {
	console.log('listening on http://'+addr+':3000')
})

exports.http = http
