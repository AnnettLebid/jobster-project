import express from "express";
import { createJob, getJob, updateJob, deleteJob, getAllJobs } from "../controllers/jobs.js";

const router = express.Router();

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

export default router;
