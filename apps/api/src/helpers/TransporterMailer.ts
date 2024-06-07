import nodemailer from 'nodemailer'

export const transporterNodemailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nataelhandito@gmail.com', // Email Sender
        pass: 'zphetjsubfexypdu'// App Password
    },
    tls: {
        rejectUnauthorized: true
    }
})