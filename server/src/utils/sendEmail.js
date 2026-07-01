const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, message) => {
  try {
    console.log("Sending email to:", email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.log("EMAIL ERROR:");
    console.log(error);
    throw error;
  }
};

module.exports = sendEmail;