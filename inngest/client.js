import { Inngest } from "inngest";

// export const inngest = new Inngest({
//   name: "ticketing-system",
//   eventKey: process.env.INNGEST_EVENT_KEY,
// });

console.log("Inngest init called");
export const inngest = new Inngest({ name: "ticketing-system" });
