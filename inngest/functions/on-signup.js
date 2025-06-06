import { inngest } from "../client.js";
import { NonRetriableError } from "inngest";
import User from "../../models/user.js";
import { sendMail } from "../../utils/mailer.js";

export const onUserSignup = inngest.createFunction(
  { id: "on-user-signup", retries: 2 },
  { event: "user/signup" },
  async ({ event, step }) => {
    console.log("umesh here");
    try {
      const { email } = event.data;
      const user = await step.run("get-user-email", async () => {
        const userObj = await User.findOne({ email });
        if (!userObj) {
          throw new NonRetriableError("User no longer exists in our database");
        }
        return userObj;
      });

      await step.run("send-welcome-email", async () => {
        const subject = `Welcome to the app`;
        const message = `Hi,
            \n\n
            Thanks for signing up. We are glad to have you onboard..!!!
        `;
        await sendMail(user.email, subject, message);
      });

      return { success: true };
    } catch (error) {
      console.log("Error runing step", error.message);
      return { success: false };
    }
  }
);
