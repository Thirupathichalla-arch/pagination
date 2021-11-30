const nodemailer = require("nodemailer");

module.exports=nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 587,
            secure: false, // upgrade later with STARTTLS 
            auth: {
                 user: "82f9dbffbdfd48",
                pass: "7c6189e604cb24" 
            },
})
