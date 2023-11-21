import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs/promises';
import { config } from 'dotenv';
import logger from '../logger.mjs';

config();

const sendEmail = async ({ to, subject, template, emailData }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const emailTemplateSource = await fs.readFile(`./src/email/templates/${template}.hbs`, 'utf8');
  const emailTemplate = handlebars.compile(emailTemplateSource);

  handlebars.registerPartial('header', await fs.readFile('./src/email/layout/header.hbs', 'utf8'));
  handlebars.registerPartial('footer', await fs.readFile('./src/email/layout/footer.hbs', 'utf8'));

  const emailHtml = emailTemplate({ subject, ...emailData });
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: to,
    subject: subject,
    html: emailHtml,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {
      logger.info('Email successfully sent!');
    })
    .catch((error) => {
      logger.error('Error: ', error);
    });
};

export { sendEmail };
