const mailer = require('nodemailer')
require('dotenv').config()

const htmlTemplate = `
	<h1>Thanks for signing up to Fixit Repairs!</h1>
	<p>To complete your account registration, please click on the link below to verify your email address!</p>
	<br>
	<a target="_blank" href="{authURL}{authToken}">{authURL}{authToken}</a>
`

const sendVerificationEmail = async (email, token) => {
    const transporter = mailer.createTransport({
        host: process.env.MAIL_SMTP,
        port: process.env.MAIL_PORT_SSL,
        secure: true,
        // secure: false, // upgrade later with STARTTLS
        auth: {
            user: process.env.MAIL_EMAILSENDER,
            pass: process.env.MAIL_EMAILPASSWORD
        }
    })

    let html = htmlTemplate
    html = html.replaceAll('{authURL}', process.env.MAIL_VERIFY_URL)
    html = html.replaceAll('{authToken}', token)
    const info = await transporter.sendMail({
        from: `Fixit Fast Repairs <${process.env.MAIL_EMAILSENDER}>`,
        to: email,
        subject: 'FXTFAST | Complete your account registration',
        html: html
    })
    console.log(info)
}

module.exports.sendVerificationEmail = sendVerificationEmail
