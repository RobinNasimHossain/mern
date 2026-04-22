import { Router } from "express";
import { body, validationResult } from "express-validator";
import Review from "../models/Review.js";
import Package from "../models/Package.js";

const router = Router();

const reviewValidation = [
  body("packageId").isMongoId().withMessage("Invalid package ID"),
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be 1-5"),
  body("comment").trim().isLength({ min: 5 }).withMessage("Comment must be at least 5 characters"),
];

router.get("/package/:packageId", async (req, res, next) => {
  try {
    const reviews = await Review.find({ packageId: req.params.packageId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

router.get("/featured", async (_req, res, next) => {
  try {
    const reviews = await Review.find({ rating: { $gte: 4 } })
      .sort({ createdAt: -1 })
      .limit(6);
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

router.post("/", reviewValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const review = await Review.create({
      packageId: req.body.packageId,
      name: req.body.name,
      email: req.body.email,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    const stats = await Review.aggregate([
      { $match: { packageId: review.packageId } },
      { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } },
    ]);

    if (stats.length > 0) {
      await Package.findByIdAndUpdate(review.packageId, {
        rating: Math.round(stats[0].avg * 10) / 10,
        reviewCount: stats[0].count,
      });
    }

    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
});

export default router;
