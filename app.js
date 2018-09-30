const express = require('express')
const app = express()
const port = process.env.PORT || 3000

module.paths.push(__dirname + '/api')
module.paths.push(__dirname + '/lib')
 
// serve index.html at root, route all other URLs to static content under 'web'
app.get('/', (req, res) => res.sendFile(__dirname + '/web/index.html'))
app.use('/web', express.static('web'))
app.use('/app', express.static('web/app'))
app.use('/lib', express.static('web/lib'))
app.use('/css', express.static('web/css'))
app.use('/img', express.static('web/img'))

const auth = require('auth')
app.get('/api/auth', auth.callback)

app.get('/api/hello', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))