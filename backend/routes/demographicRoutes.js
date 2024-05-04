import express from "express";
const router = express.Router();
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createDemographic,
  updateDemographic,
  removeDemographic,
  readDemographic,
  listDemographic,
} from "../controllers/demographicController.js";

router.route("/").post(authenticate, authorizeAdmin, createDemographic);
router
  .route("/:demographicId")
  .put(authenticate, authorizeAdmin, updateDemographic);
router
  .route("/:demographicId")
  .delete(authenticate, authorizeAdmin, removeDemographic);

router.route("/listDemographics").get(listDemographic);
router.route("/:id").get(readDemographic);

export default router;
