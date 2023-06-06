import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1b6eb4e45e5829",
        pass: "586cbbd2e5b069",
      },
    });
    await transporter.sendMail({
      from: "sandbox.smtp.mailtrap.io",
      to: email,
      subject: subject,
      text: text,
    });
  } catch (error) {
    console.log(error);
    console.log("email not sent!");
    return error;
  }
};

export default sendEmail;
