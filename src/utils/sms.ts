import twilio from "twilio";
import { logger } from "./logger";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, SMS_ADMIN_ALERT } = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const sendSMS = async (message: string) => {
  logger.logger.info("Sending messaje", message);
  try {
    logger.logger.info(
      await client.messages.create({
        body: message,
        from: "+19714071392",
        to: SMS_ADMIN_ALERT!,
      })
    );
  } catch (err) {
    logger.logger.error(err);
  }
};
