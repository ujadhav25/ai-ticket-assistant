export const sendMail = async (to, subject, text) => {
  try {
    console.log("in send mail");
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: "Inngest TMS",
      to,
      subject,
      text,
    });
    console.log("Message sent:", info.messageId);
    return info;
  } catch (error) {
    console.log("Mail Error", error.message);
    throw error;
  }
};
