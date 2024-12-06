require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const nodemailer = require ('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    
    port: 587,
    secure: false, 
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY
    },
  });




  const sendMail = async (recipientEmail, subject, textContent, htmlContent) => {
    const mailOptions = {
      from: {
        name: 'Brain Integration Institute',
        address: 'brainintegrationdev@gmail.com', 
      },
      to: recipientEmail, 
      subject: subject, 
      text: textContent, 
      html: htmlContent, 
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Mail has been sent!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  module.exports = {
    sendMail,
};

