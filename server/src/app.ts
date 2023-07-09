import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import "express-async-errors";
import { connectDB } from "./db/connect.js";
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";
import { authenticateUser } from "./middleware/authentication.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";

const app = express();

app.set("trust proxy", 1);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.static(path.join(__dirname, "../../../client/build")));
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../client/build", "index.html"));
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(`mongodb+srv://${process.env.MONGO_URI}`);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
