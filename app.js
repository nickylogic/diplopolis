const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

module.paths.push(__dirname + '/api')
module.paths.push(__dirname + '/lib')

// serve index.html at base URL, with CORS enabled for Okta signon
var corsOptions = {
    origin: 'https://dev-577009.oktapreview.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.options('/', cors(corsOptions))
app.get('/', cors(corsOptions), (req, res) => res.sendFile(__dirname + '/web/index.html'))

// serve index.html at root, route all other URLs to static content under 'web'
app.use('/web', express.static('web'))
app.use('/js', express.static('web/js'))
app.use('/css', express.static('web/css'))
app.use('/img', express.static('web/img'))

const auth = require('auth')
app.get('/api/auth', auth.callback)

app.get('/api/hello', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))