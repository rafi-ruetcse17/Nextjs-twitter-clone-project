const nodemailer = require("nodemailer");

export const sendEmail = async (email, verificationToken) => {
  var Transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASS,
    },
  });

  var mailOptions;
  let sender = "Md. Rafi Alam";
  mailOptions = {
    from: sender,
    to: email,
    subject: "Verify your account for twitter-clone app!",
    html: `<a href="the-ultimate-twitter-clone.vercel.app/api/verifyUser/${verificationToken}">Click Here To Verify</a>`
  };

  Transport.sendMail(mailOptions, function (error, response) {
    if (error) {
      throw Error("Message not sent!");
    } else {
      return response;
    }
  });
};
