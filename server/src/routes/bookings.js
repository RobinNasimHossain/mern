import { Router } from "express";
import { body, validationResult } from "express-validator";
import Booking from "../models/Booking.js";
import Package from "../models/Package.js";

const router = Router();

const bookingValidation = [
  body("packageId").isMongoId().withMessage("Invalid package ID"),
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").trim().notEmpty().withMessage("Phone number is required"),
  body("travelers").isInt({ min: 1 }).withMessage("At least 1 traveler required"),
  body("travelDate").isISO8601().withMessage("Valid travel date is required"),
];

router.post("/", bookingValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const pkg = await Package.findById(req.body.packageId);
    if (!pkg) return res.status(404).json({ error: "Package not found" });

    const pricePerPerson = pkg.discountPrice || pkg.price;
    const totalPrice = pricePerPerson * req.body.travelers;

    const booking = await Booking.create({
      packageId: pkg._id,
      packageTitle: pkg.title,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      travelers: req.body.travelers,
      travelDate: req.body.travelDate,
      specialRequests: req.body.specialRequests || "",
      totalPrice,
    });

    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("packageId");
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

export default router;
