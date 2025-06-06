import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
// import { serve } from "inngest/express";
// import { onUserSignup } from "./inngest/functions/on-signup.js";
dotenv.config();

const PORT = process.env.PORT || 3009;
const app = express();

// const inngestHandler = serve("ticketing-system", [onUserSignup]);

app.use(cors());
app.use(express.json());

// app.use("/api/inngest", inngestHandler);

app.use("/api/auth", userRouter);

app.listen((req, res, next) => {
  console.log("MongoDB Connected 1");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log("Server at http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("MongoDB Error", err);
  });
