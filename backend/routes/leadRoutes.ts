import express from "express";

import {
  createLead,
  deleteLead,
  getLeads,
  getSingleLead,
  updateLead,
} from "../controller/leadController";

import { protect } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getLeads)
  .post(createLead);

router.route("/:id")
  .get(getSingleLead)
  .put(updateLead)
  .delete(authorizeRoles("admin"), deleteLead);

export default router;