import nodemailer from 'nodemailer'

export const transporterNodemailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nataelhandito@gmail.com',
        pass: 'zphetjsubfexypdu'
    },
    tls: {
        rejectUnauthorized: true
    }
})