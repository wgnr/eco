// ETHEREAL
// const nodemailer = require("nodemailer");
import { createTransport, SendMailOptions, TransportOptions } from "nodemailer";
import { logger } from "./logger";

const {
  ETHEREAL_EMAIL,
  ETHEREAL_PASSWORD,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN,
} = process.env;

const transporterEthereal = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: ETHEREAL_EMAIL,
    pass: ETHEREAL_PASSWORD,
  },
});

const transporters = {
  gmail: createTransport({
    // @ts-ignore
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD,
      clientId: OAUTH_CLIENTID,
      clientSecret: OAUTH_CLIENT_SECRET,
      refreshToken: OAUTH_REFRESH_TOKEN,
    },
  }),
  ethereal: createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: ETHEREAL_EMAIL,
      pass: ETHEREAL_PASSWORD,
    },
  }),
};

export const sendMail = (
  provider: "gmail" | "ethereal",
  options: SendMailOptions
) => {
  let providerService;
  if (provider === "gmail") {
    providerService = transporters.gmail;
  } else {
    providerService = transporters.ethereal;
  }

  providerService.sendMail(
    { ...options, from: ETHEREAL_EMAIL },
    (err, info) => {
      if (err) {
        logger.logger.error(err);
      }

      logger.logger.info(info);
    }
  );
};

export const sendEmailOnEvent = (
  provider: "gmail" | "ethereal",
  toEmail: string,
  username: string,
  event: "login" | "logout",
  imgUrl?: string
) => {
  const text = `The user ${username} has logged ${
    event === "login" ? "in" : "out"
  } at ${new Date().toISOString()}.`;

  sendMail(provider, {
    to: toEmail,
    subject: event === "login" ? "Login Event" : "Logout Event",
    ...(imgUrl
      ? { html: `<p>${text}</p><img src=${imgUrl} alt="user picture">` }
      : { text }),
  });
};
