import nodemailer from 'nodemailer'

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMT_HOST,
      port: process.env.SMT_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    await transporter.sendMail({
      from: process.env.SMT_HOST,
      to: email,
      subject: subject,
      text: text,
    })
  } catch (error) {
    console.log(error)
    console.log('email not sent!')
    return error
  }
}

export default sendEmail
