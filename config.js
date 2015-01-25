var server  = require('./server/server.js').endpoint,
express     = require('./server/server.js').express,
hbs         = require('hbs')

//static
server.use('/static', express.static(__dirname + '/public'))

//handlebars config
server.set('view engine', 'hbs')
server.set('views', __dirname + '/server/views')
hbs.registerPartials(__dirname + '/server/views/partials')
