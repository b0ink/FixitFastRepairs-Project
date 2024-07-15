const express = require('express')
const app = express()
const port = 3001

const session = require('express-session')

const phoneRoutes = require('./api/phone')
const bookingRoutes = require('./api/tickets')
const accountRoutes = require('./api/account')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const cors = require('cors')
app.use(
    cors({
        origin: 'https://domain.com',
        credentials: true // enable set cookie
    })
)

app.use(
    session({
        secret: 'abc123',
        resave: false,
        saveUninitialized: false
    })
)

app.use('/api', phoneRoutes)
app.use('/api', bookingRoutes)
app.use('/api', accountRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})