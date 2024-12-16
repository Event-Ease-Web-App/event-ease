import { EMAIL_SERVICE_ENV } from "@/constants/env";
import nodemailer from "nodemailer";

/**
 * This class sends emails to users using Nodemailer
 */
export class EmailService {
  /* Private property {Object} : _transporter contains emails auth */
  static _transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE_ENV.emailService,
    auth: {
      user: EMAIL_SERVICE_ENV.emailSender,
      pass: EMAIL_SERVICE_ENV.emailSenderPass,
    },
  });

  /**
   * This methods sends email to the appropriate user
   * @param {String} html - Email message
   */
  static async _sendEmail(
    receiverEmail: string,
    html: string,
    subject: string
  ) {
    const emailSender = EMAIL_SERVICE_ENV.emailSender;

    const mailOptions = {
      from: emailSender,
      to: receiverEmail,
      subject: subject,
      html: html,
    };

    await EmailService._transporter.sendMail(
      mailOptions,
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email Envoyé: " + info.response);
        }
      }
    );
  }

  /**
   * This methods sends the registering email to the user
   * @param {String} receiverName - End user name
   * @param {String} receiverEmail - End user email
   * @param {String} token - Token to validate the email
   */
  static async sendRegisterValidation(
    receiverName: string,
    receiverEmail: string,
    token: string
  ) {
    const html = `Bienvenue sur Event Ease <strong>${receiverName}</strong>,<br/><br/>Pour finaliser l'inscription, merci de <a href="http://localhost:5173/validate-email/${token}">valider votre compte</a> .`;

    EmailService._sendEmail(
      receiverEmail,
      html,
      "Inscription sur Event Ease - Validation de votre compte"
    );
  }
}
