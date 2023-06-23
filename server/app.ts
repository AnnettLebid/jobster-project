import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./db/connect";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth");

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(`mongodb+srv://${process.env.MONGO_URI}`);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
