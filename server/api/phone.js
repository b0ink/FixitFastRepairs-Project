const express = require('express')
const router = express.Router()
const connection = require('./db')

const Joi = require('joi')

router.get('/getphones', async (req, res) => {
    connection.query('SELECT * FROM `devices`;', (error, results) => {
        if (error) {
            console.error(error)
            return
        }
        const productsData = JSON.stringify(results)
        res.status(200).json(productsData)
    })
})

router.get('/getphone/:phoneid', async (req, res) => {
    const phoneid = req.params.phoneid
    connection.query(
        {
            sql: 'SELECT * FROM `devices` WHERE phoneid = ? LIMIT 1;',
            values: [phoneid],
            row: true
        },
        (error, result) => {
            if (error) {
                console.error(error)
                return res.status(500).json({ error: 'Internal Server Error' })
            }

            // console.log('api:', result[0]);
            if (result && result[0]) {
                res.status(200).json(result[0])
            } else {
                res.status(404).json({ error: 'Not Found' })
            }
        }
    )
})

// UPDATE DEVICE
router.put('/update-device', async (req, res) => {
    // authenticate staff
    if (!req.session.user || req.session.user.authLevel < 2) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    console.log('received')
    const { data } = req.body
    console.log(data)
    const schema = Joi.object({
        screen: Joi.number().required(),
        battery: Joi.number().required(),
        frontcamera: Joi.number().required(),
        backcamera: Joi.number().required(),
        chargingport: Joi.number().required(),
        speaker: Joi.number().required(),
        housing: Joi.number().required(),
        homebutton: Joi.number().required(),
        id: Joi.number().min(0).required(),
        phoneid: Joi.string().required()
    })

    const { error, value } = schema.validate(data)
    if (error) {
        console.log(error)
        return res.status(400).json({ error: error.details[0].message })
    }

    // * Update device
    const [result, errors] = await connection.promise().execute({
        sql: 'UPDATE `devices` SET screen=?,battery=?,frontcamera=?,backcamera=?,chargingport=?,speaker=?,housing=?,homebutton=? WHERE id=? AND phoneid=?',
        values: [
            data.screen,
            data.battery,
            data.frontcamera,
            data.backcamera,
            data.chargingport,
            data.speaker,
            data.housing,
            data.homebutton,
            data.id,
            data.phoneid
        ]
    })

    if (errors) {
        console.log('ERRORS', errors)
        return res.status(400).json({ error: 'sql error2' })
    }

    // * Confirm row was insertd
    if (result && result.affectedRows == 1) {
        return res.status(200).json({ success: 'good' })
    }
})
module.exports = router
