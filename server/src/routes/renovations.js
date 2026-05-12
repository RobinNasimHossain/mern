import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import Renovation from "../models/Renovation.js";

const router = Router();
router.use(requireAuth);

router.get("/", async (req, res, next) => {
  try {
    const list = await Renovation.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ schedules: list });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const doc = await Renovation.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!doc) return res.status(404).json({ error: "Schedule not found" });
    res.json({ schedule: doc });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      projectId,
      company,
      address,
      lockCode,
      date,
      description,
      sections,
      miscItems,
    } = req.body;
    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }
    const doc = await Renovation.create({
      user: req.user._id,
      projectId,
      company,
      address,
      lockCode,
      date,
      description,
      sections: sections || [],
      miscItems: miscItems || [],
    });
    res.status(201).json({ schedule: doc });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const {
      projectId,
      company,
      address,
      lockCode,
      date,
      description,
      sections,
      miscItems,
    } = req.body;
    const doc = await Renovation.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        projectId,
        company,
        address,
        lockCode,
        date,
        description,
        sections,
        miscItems,
      },
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ error: "Schedule not found" });
    res.json({ schedule: doc });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const doc = await Renovation.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!doc) return res.status(404).json({ error: "Schedule not found" });
    res.json({ message: "Schedule deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
