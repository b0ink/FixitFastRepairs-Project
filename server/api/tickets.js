const express = require('express')
const router = express.Router()
const connection = require('./db')

const Joi = require('joi')

router.post('/submitticket', async (req, res) => {
    const { data } = req.body

    const schema = Joi.object({
        phone_id: Joi.number().required(),
        repair_name: Joi.string().max(45).required(),
        phone_serial: Joi.string().min(1).max(45).required().label('Serial Number'),
        phone_pin: Joi.string().max(45).label('Pin Code').allow(null, ''),
        user_mobile: Joi.string()
            .min(8)
            .max(16)
            .pattern(/^[0-9+]+$/)
            .required()
            .label('Mobile Number'),
        address: Joi.string().min(1).max(128).required().label('Address Line 1'),
        address_apt: Joi.string().max(128).label('Address Suit/Apt').allow(null, ''),
        address_city: Joi.string().min(1).max(45).required().label('City/Suburb'),
        address_state: Joi.string().min(1).max(45).required().label('State'),
        address_post: Joi.number().max(9999).required().label('Postcode')
    })

    const { error, value } = schema.validate(data)
    if (error) {
        console.log(error)
        return res.status(400).json({ error: error.details[0].message })
    }

    if (!req.session.user || !req.session.user.accountid || req.session.user.accountid <= 0) {
        return res.status(400).json({ error: 'Please sign in before submitting a ticket.' })
    }

    const accountId = req.session.user.accountid

    // * Find any existing bookings to prevent spam
    const [dupRows, dupFields] = await connection.promise().execute({
        sql: 'SELECT * FROM `tickets` WHERE account_id = ? AND status = -1',
        values: [accountId]
    })

    if (dupRows.length > 0) {
        return res.status(400).json({ error: 'Please wait for your previous booking to be accepted before submitting another.' })
    }

    console.log(data)

    // * Validate phone ID
    const [rows, fields] = await connection.promise().execute({
        sql: 'SELECT * FROM `devices` WHERE id = ? LIMIT 1',
        values: [data.phone_id],
        row: true
    })

    const phone = rows[0]
    if (phone) {
        // * Record current price of selected repair
        const price = phone[data.repair_name]
        data['price'] = price

        // * Insert new ticket
        const [result, errors] = await connection.promise().execute({
            sql: 'INSERT INTO `tickets` (account_id, phone_id, price, repair_name, phone_serial, phone_pin, user_mobile, address, address_apt, address_city, address_state, address_post) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
            values: [
                accountId,
                data.phone_id,
                data.price,
                data.repair_name,
                data.phone_serial,
                data.phone_pin,
                data.user_mobile,
                data.address,
                data.address_apt,
                data.address_city,
                data.address_state,
                data.address_post
            ]
        })

        if (errors) {
            console.log('ERRORS', errors)
            return res.status(400).json({ error: 'sql error2' })
        }
        // * Confirm row was insertd
        if (result && result.affectedRows == 1) {
            return res.status(200).json({ success: 'good', ticket_id: result.insertId })
        }
    } else {
        return res.status(400).json({ error: 'Invalid phone was submitted. Please try again' })
    }

    return res.status(400).json({ error: 'Unknown' })
})

router.get('/get-tickets', async (req, res) => {
    if (!req.session.user || req.session.user.authLevel < 2) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    const sql = `
    SELECT t.id, t.created_at, t.price, t.repair_name, t.phone_serial, t.phone_pin, t.user_mobile, 
    t.address, t.address_apt, t.address_city, t.address_state, t.address_post,
    t.assigned_to, t.status,
    cust.email, cust.fullname AS cust_name, d.brand, d.displayName, d.phoneid,
    staff.fullname AS staff_assigned, staff.id AS staff_assigned_id
    FROM tickets t
    INNER JOIN users cust ON t.account_id = cust.id 
    INNER JOIN users staff ON t.assigned_to = staff.id 
    INNER JOIN devices d ON t.phone_id = d.id ORDER BY t.created_at DESC`

    connection.query(sql, (error, results) => {
        if (error) {
            console.error(error)
            return
        }
        const tickets = JSON.stringify(results)
        res.status(200).json(tickets)
    })
})

//TODO: merge get-ticket and get-tickets in the same function, if /:ticketid provided use the WHERE clause
router.post('/get-ticket', async (req, res) => {
    // let isAdmin = false
    // if (req.session.user && req.session.user.authLevel >= 2) {
    //     isAdmin = true
    // }

    if (!req.session.user || req.session.user.authLevel < 2) {
        // if ((!req.session.user || req.session.user.authLevel < 1) && !isAdmin) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const { data } = req.body

    const schema = Joi.object({
        ticketid: Joi.number().required()
    })

    const { error, value } = schema.validate(data)
    if (error) {
        console.log(error)
        return res.status(400).json({ error: error.details[0].message })
    }

    let sql = `
        SELECT t.id, t.created_at, t.price, t.repair_name, t.phone_serial, t.phone_pin, t.user_mobile, 
        t.address, t.address_apt, t.address_city, t.address_state, t.address_post,
        t.assigned_to, t.status,
        cust.email, cust.fullname AS cust_name, d.brand, d.displayName, d.phoneid,
        staff.fullname AS staff_assigned, staff.id AS staff_assigned_id
        FROM tickets t 
        LEFT JOIN users cust ON t.account_id = cust.id 
        LEFT JOIN users staff ON t.assigned_to = staff.id 
        LEFT JOIN devices d ON t.phone_id = d.id 
    `

    if (data.ticketid > 0) {
        sql += '  WHERE t.id = ?'
        console.log('attached ticket id', data.ticketid)
    }
    sql += ' ORDER BY t.created_at DESC'

    const notesSQL = `SELECT tn.*, staff.fullname FROM ticket_notes tn INNER JOIN users staff ON tn.staff_id = staff.id  WHERE tn.deleted != 1`

    //* Fetch ticket data
    connection.query(
        {
            sql: sql,
            values: [data.ticketid]
            // row: true
        },
        (error, result) => {
            if (error) {
                console.error(error)
                return res.status(500).json({ error: 'Internal Server Error' })
            }
            // console.log(result)

            if (result && result[0]) {
                let ticketData = result

                //* Fetch notes for ticket
                connection.query(
                    {
                        sql: notesSQL

                        // values: [data.ticketid > 0 ? data.ticketid : null]
                    },
                    (error, result) => {
                        if (error) {
                            console.error(error)
                            return res.status(500).json({ error: 'Internal Server Error' })
                        }

                        let ticketNotes = []
                        // console.log('api:', result[0]);
                        if (result && result[0]) {
                            ticketNotes = result
                            // ticketData['notes'] = ticketNotes
                        }

                        let tickets = []
                        for (let i = 0; i < ticketData.length; i++) {
                            let notes = []
                            for (const note of ticketNotes) {
                                if (note.ticket_id == ticketData[i].id) {
                                    notes.push(note)
                                }
                            }

                            ticketData[i]['notes'] = notes
                        }

                        // console.log(ticketData)

                        if (data.ticketid > 0) {
                            res.status(200).json(ticketData[0])
                        } else {
                            res.status(200).json(ticketData)
                        }
                    }
                )

                //   res.status(200).json(result[0]);
            } else {
                res.status(404).json({ error: 'Not Found' })
            }
        }
    )
})

// ------ GET TICKET FOR USER - NO ADMIN
router.post('/get-user-ticket', async (req, res) => {
    if (!req.session.user || req.session.user.authLevel < 1) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    console.log('yep ur good to look at ticket')

    const { data } = req.body

    const schema = Joi.object({
        ticketid: Joi.number().required()
    })

    const { error, value } = schema.validate(data)
    if (error) {
        console.log(error)
        return res.status(400).json({ error: error.details[0].message })
    }

    let sql = `
        SELECT t.id, t.created_at, t.price, t.repair_name, t.phone_serial, t.phone_pin, t.user_mobile, 
        t.address, t.address_apt, t.address_city, t.address_state, t.address_post, t.status,
        cust.email, cust.fullname AS cust_name, d.brand, d.displayName, d.phoneid
        FROM tickets t
        INNER JOIN users cust ON t.account_id = cust.id 
        INNER JOIN devices d ON t.phone_id = d.id
        WHERE t.account_id = ? AND t.id = ?
    `

    // if (data.ticketid > 0) {
    //     sql += ' ` WHERE t.id = ?'
    // }

    const notesSQL = `
        SELECT tn.id, tn.ticket_id, tn.comment, tn.status_change, tn.created_at FROM ticket_notes tn 
        WHERE tn.deleted = 0 AND tn.staff_only = 0 AND tn.ticket_id = ? 
     `

    //* Fetch ticket data
    connection.execute(
        {
            sql: sql,
            values: [req.session.user.accountid, data.ticketid],
            row: true
        },
        (error, result) => {
            if (error) {
                console.error(error)
                return res.status(500).json({ error: 'Internal Server Error' })
            }

            if (result && result[0]) {
                let ticketData = result

                //* Fetch notes for ticket
                connection.execute(
                    {
                        sql: notesSQL,
                        values: [data.ticketid]
                    },
                    (error, result) => {
                        if (error) {
                            console.error(error)
                            return res.status(500).json({ error: 'Internal Server Error' })
                        }

                        let ticketNotes = []
                        // console.log('api:', result[0]);
                        if (result && result[0]) {
                            ticketNotes = result
                            // ticketData['notes'] = ticketNotes
                        }

                        let tickets = []
                        for (let i = 0; i < ticketData.length; i++) {
                            let notes = []
                            for (const note of ticketNotes) {
                                if (note.ticket_id == ticketData[i].id) {
                                    notes.push(note)
                                }
                            }

                            ticketData[i]['notes'] = notes
                        }

                        if (data.ticketid > 0) {
                            res.status(200).json(ticketData[0])
                        } else {
                            res.status(200).json(ticketData)
                        }
                    }
                )

                //   res.status(200).json(result[0]);
            } else {
                res.status(404).json({ error: 'Not Found' })
            }
        }
    )
})

router.post('/toggle-note-visibility', async (req, res) => {
    if (!req.session.user || req.session.user.authLevel < 2 || !req.session.user.accountid) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    const { data } = req.body

    const schema = Joi.object({
        noteid: Joi.number().required()
    })
    const { error, value } = schema.validate(data)
    if (error) {
        console.log(error)
        return res.status(400).json({ error: error.details[0].message })
    }
    const [result, errors] = await connection.promise().execute({
        sql: 'UPDATE `ticket_notes` SET staff_only = 1 - staff_only WHERE id = ?',
        values: [data.noteid]
    })

    if (errors) {
        console.log('ERRORS', errors)
        return res.status(400).json({ error: 'sql error1' })
    }

    // * Confirm a row was updated
    if (result && result.affectedRows == 1) {
        return res.status(200).json({ success: 'Toggle note visibility' })
    }

    return res.status(400).json({ error: 'Error' })
})

router.post('/submit-ticket-comment', async (req, res) => {
    if (!req.session.user || req.session.user.authLevel < 2 || !req.session.user.accountid) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const { data } = req.body

    if ('makeVisibleToCustomer' in data) {
        if (data.makeVisibleToCustomer == 1) {
            data.makeVisibleToCustomer = true
        } else {
            data.makeVisibleToCustomer = false
        }
    }

    const staff_only = data.makeVisibleToCustomer ? 0 : 1

    const schema = Joi.object({
        ticketid: Joi.number().required(),
        comment: Joi.string().max(300),
        status: Joi.number().required(),
        staffAssign: Joi.number().required(),
        makeVisibleToCustomer: Joi.bool()
    })

    const { error, value } = schema.validate(data)
    if (error) {
        console.log(error)
        return res.status(400).json({ error: error.details[0].message })
    }

    //TODO: Validate ticket using ticketid
    // const [dupRows, dupFields] = await connection.promise().execute({
    //     sql: 'SELECT * FROM `tickets` WHERE account_id = ? AND status = -1',
    //     values: [accountId],
    // })

    // if (dupRows.length > 0) {
    //     return res.status(400).json({ error: 'Please wait for your previous booking to be accepted before submitting another.' });
    // }

    console.log(data)

    // const phone = rows[0];
    // if (ticket) {

    // * Insert new ticket note
    const [result, errors] = await connection.promise().execute({
        sql: 'INSERT INTO `ticket_notes` (ticket_id, staff_id, comment, staff_only, status_change) VALUES (?,?,?,?,?)',
        values: [data.ticketid, req.session.user.accountid, data.comment, staff_only, data.status]
    })

    if (errors) {
        console.log('ERRORS', errors)
        return res.status(400).json({ error: 'sql error1' })
    }
    // * Confirm row was insertd
    if (result && result.affectedRows == 1) {
        let sqlUpdateTicket = ''
        let valuesUpdateTicket = []
        if (data.status > 0) {
            sqlUpdateTicket += `status=?`
            valuesUpdateTicket.push(data.status)
        }

        if (data.staffAsign > 0) {
            if (valuesUpdateTicket.length > 0) {
                sqlUpdateTicket += ','
            }
            sqlUpdateTicket = 'assigned_to=? '
            valuesUpdateTicket.push(data.staffAsign)
        }

        if (valuesUpdateTicket.length > 0) {
            // * Update ticket with new status change and new staff assign
            const [result2, errors2] = await connection.promise().execute({
                sql: 'UPDATE `tickets` SET ' + sqlUpdateTicket + ' WHERE id = ?',
                values: [...valuesUpdateTicket, data.ticketid]
            })
            if (errors2) {
                console.log('ERRORS', errors2)
                return res.status(400).json({ error: 'sql error2' })
            }
        }

        return res.status(200).json({ success: 'good' })
    }

    return res.status(400).json({ error: 'Unknown' })
})

router.delete('/delete-ticket-note/:noteid/:ticketid', async (req, res) => {
    if (!req.session.user || req.session.user.authLevel < 2 || !req.session.user.accountid) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    if (!req.params.noteid || !req.params.ticketid) {
        return res.status(400).json({ error: 'Could not delete: Invalid ticket ID' })
    }

    const data = {
        noteid: req.params.noteid,
        ticketid: req.params.ticketid
    }

    const schema = Joi.object({
        noteid: Joi.number().required(),
        ticketid: Joi.number().required()
    })

    const { error, value } = schema.validate(data)
    if (error) {
        console.log(error)
        return res.status(400).json({ error: error.details[0].message })
    }

    // * Update ticket row
    const [result, errors] = await connection.promise().execute({
        // Use ticket_id to be 100% sure
        sql: 'UPDATE `ticket_notes` SET deleted=1 WHERE id = ? AND ticket_id = ?',
        values: [data.noteid, data.ticketid]
    })

    if (errors) {
        console.log('ERRORS', errors)
        return res.status(400).json({ error: 'sql error1' })
    }

    // * Confirm a row was updated
    if (result && result.affectedRows == 1) {
        return res.status(200).json({ success: 'Deleted note' })
    }
})

module.exports = router
