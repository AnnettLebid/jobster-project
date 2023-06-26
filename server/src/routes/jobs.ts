import express from "express";
import { createJob, getJob } from "../controllers/jobs.js";

const router = express.Router();

router.route("/").post(createJob);
router.route("/:id").get(getJob);

export default router;
