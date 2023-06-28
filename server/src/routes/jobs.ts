import express from "express";
import { createJob, getJob, updateJob, deleteJob, getAllJobs, showStats } from "../controllers/jobs.js";
import { testUserLimitations } from "../middleware/testUser.js";

const router = express.Router();

router.route("/").post(testUserLimitations, createJob).get(getAllJobs);
router.route("/stats").get(showStats);
router.route("/:id").get(getJob).patch(testUserLimitations, updateJob).delete(testUserLimitations, deleteJob);

export default router;
