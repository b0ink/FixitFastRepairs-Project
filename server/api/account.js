const express = require('express')
const router = express.Router()
const connection = require('./db')

const mailer = require('../mailer')

const Joi = require('joi')

const bcrypt = require('bcrypt')
const saltRounds = 10

const authTokenLength = 32

const crypto = require('crypto')

router.post('/createaccount', async (req, res) => {
    console.log('received')
    const { data } = req.body

    const schema = Joi.object({
        fullname: Joi.string().max(100),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

        confirmpassword: Joi.ref('password')
    })

    if (data.password !== data.confirmpassword) {
        console.log('password no match')
        return res.status(400).json({ error: 'Passwords do not match.' })
    }

    const { error, value } = schema.validate(data)
    if (error) {
        console.log(error)
        return res.status(400).json({ error: error.details[0].message })
    }

    // * Find accounts with existing emails
    const [dupRows, dupFields] = await connection.promise().execute({
        sql: 'SELECT * FROM `users` WHERE email = ? LIMIT 1',
        values: [data.email]
    })

    // * if dupeRows[0].email == process.env.MAIL_EMAILSENDER
    if (dupRows.length > 0) {
        if (dupRows[0].active == 0) {
            //TODO: Resend activation here?
        }
        console.log('dupe emails')

        return res.status(400).json({ error: 'An account with this email already exists' })
    }

    const emailAuthToken = crypto.randomBytes(authTokenLength / 2).toString('hex')

    const hash = bcrypt.hashSync(data.password, saltRounds)

    if (!hash) {
        console.log('bad hash')

        return res.status(400).json({ error: 'An error occcured. Please try again.' })
    }

    // * Insert new user
    const [result, errors] = await connection.promise().execute({
        sql: 'INSERT INTO `users` (email, password, fullname, verifytoken) VALUES (?,?,?,?)',
        values: [data.email, hash, data.fullname, emailAuthToken]
    })

    if (errors) {
        console.log('ERRORS', errors)
        return res.status(400).json({ error: 'sql error2' })
    }

    // * If failed to insert
    if (!result || result.affectedRows == 0) {
        console.log('bad insert')
        return res.status(400).json({ error: 'Error occurred' })
    }

    const info = mailer.sendVerificationEmail(data.email, emailAuthToken)

    return res.status(200).json({ success: 'Your account has been created. An email has been sent to you to confirm your email' })
})

//TODO:
// Comparing passwords:
// bcrypt.compareSync(myPlaintextPassword, hash); // true

//TODO: .put verify email
router.post('/verifyemail', async (req, res) => {
    const { data } = req.body
    if (!data.authtoken || data.authtoken.length != authTokenLength) {
        console.log(data, data.authtoken.length, authTokenLength)
        return res.status(400).json({ error: 'Invalid token' })
    }

    // * Find accounts with existing emails
    const [rows, fields] = await connection.promise().execute({
        sql: 'SELECT * FROM `users` WHERE verifytoken = ? AND active = 0 AND verifytoken IS NOT NULL',
        values: [data.authtoken]
    })

    //TODO: allow for a test sign up using my email, skip the row insert, but send an authentication email
    // * if dupeRows[0].email == process.env.MAIL_EMAILSENDER
    if (rows.length == 0) {
        return res.status(400).json({ error: 'Invalid token' })
    }

    const accountID = rows[0].id
    // * Update new user
    const [result, errors] = await connection.promise().execute({
        sql: 'UPDATE `users` SET verifytoken=NULL, active=1, is_admin=1 WHERE id = ?',
        values: [accountID]
    })

    if (errors) {
        console.log('ERRORS', errors)
        return res.status(400).json({ error: 'sql error2' })
    }

    // * If failed to insert
    if (!result || result.affectedRows == 0) {
        console.log('bad insert')
        return res.status(400).json({ error: 'Error occurred' })
    }

    return res.status(200).json({ success: 'Your account has been verified!' })
})

router.get('/check-auth', async (req, res) => {
    console.log('/check-auth:')
    console.log('checking for', JSON.stringify(req.session), `if !req.session.user == ${!req.session.user ? 'TRUE' : 'FALSE'}`)

    if (!req.session.user) {
        res.status(200).json({ authLevel: 0, userData: null })
        return
    }
    const authLevel = req.session.user.authLevel
    res.status(200).json({ authLevel, userData: req.session.user })
})

// Login user to initialise a session
router.post('/loginuser', async (req, res) => {
    const { data } = req.body
    // * Find accounts with existing emails
    const [rows, fields] = await connection.promise().execute({
        sql: 'SELECT * FROM `users` WHERE email = ?',
        values: [data.email]
    })

    if (rows.length == 1) {
        const compare = await bcrypt.compareSync(data.password, rows[0].password)
        if (compare === true) {
            req.session.user = {
                accountid: rows[0].id,
                authLevel: rows[0]['is_admin'],
                fullname: rows[0].fullname
            }
            console.log('user now has session saved: ', req.session)
            return res.status(200).json({ success: 'Logged in!' })
        }
    }

    return res.status(400).json({ error: 'Invalid login' })
})

router.get('/logout', async (req, res) => {
    console.log('request logout')
    req.session.destroy((err) => {
        if (err) {
            console.error(err)
        }
        console.log('destroyed sessions')
        res.status(200).json()
    })
})

const validateUser = async (req, res, next) => {
    // check if cookie exists in database
    // if valid, return the user data
    // TODO: instead of true, return user data
    if (req.session.user) {
        next()
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
    return true
}


router.get('/user-data/:accountid', async (req, res) => {
    const accountid = req.params.accountid

    if (!req.session.user || !req.session.user.accountid) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    // Restrict calls from only associated user and admins
    if (req.session.user.accountid !== accountid && req.session.user.authLevel < 1) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const data = {
        accountid
    }

    const schema = Joi.object({
        accountid: Joi.number().required()
    })

    const { error, value } = schema.validate(data)
    if (error) {
        console.log(error)
        return res.status(400).json({ error: error.details[0].message })
    }

    const userSql = `
        SELECT u.id,u.email,u.fullname
        FROM users u WHERE u.id = ?
    `

    const ticketsSql = `SELECT t.id, t.created_at, t.price, t.repair_name, t.phone_serial, t.phone_pin, t.user_mobile, 
        t.address, t.address_apt, t.address_city, t.address_state, t.address_post,
        t.assigned_to, t.status, d.brand, d.displayName, d.phoneid
        FROM tickets t 
        INNER JOIN devices d ON t.phone_id = d.id WHERE t.account_id = ?
    `

    connection.query({ sql: userSql, values: [accountid] }, (error, results) => {
        if (error) {
            console.error(error)
            return res.status(400).json({ error })
        }
        if (!results || !results[0]) {
            return res.status(400).json({ error: 'bad sql' })
        }
        const userData = results[0]

        connection.query({ sql: ticketsSql, values: [accountid] }, (error, results) => {
            if (error) {
                console.error(error)
                return res.status(400).json({ error })
            }
            console.log(results)
            const ticketData = results
            res.status(200).json({ ticketData, userData })
        })
    })
})

module.exports = router
