import express from "express";
import entryController from "../controllers/entry.controller.js";

const router = express.Router();

router.post("/", entryController.addEntry);
router.get("/", entryController.listEntries);
router.patch("/:id", entryController.editEntry);
router.delete("/:id", entryController.deleteEntry);

router.get("/search", entryController.searchEntries);

export default router;
