const express = require('express')
const server = express()
const port = process.env.PORT || 3000

module.paths.push(__dirname + '/api')
module.paths.push(__dirname + '/lib')
 
// serve index.html at root, route all other URLs to static content under 'web'
server.get('/', (req, res) => res.sendFile(__dirname + '/web/index.html'))
server.use('/web', express.static('web'))
server.use('/app', express.static('web/app'))
server.use('/lib', express.static('web/lib'))
server.use('/css', express.static('web/css'))
server.use('/img', express.static('web/img'))

const auth = require('auth')
server.get('/api/auth', auth.callback)

server.get('/api/hello', (req, res) => res.send('Hello World!'))

server.listen(port, () => console.log(`Example app listening on port ${port}!`))