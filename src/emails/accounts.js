const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: 'amitporia132@gmail.com',
        from: 'amit.poria@mailinator.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app ${name}. Let me know how you get along with the app`
    })
}

const sendCancellationEmail = (email, name) =>{
    sgMail.send({
        to: 'amitporia132@gmail.com',
        from: 'amit.poria@mailinator.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye ${name}. I hope to see you back sometime soon.`
    })
}
module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}

