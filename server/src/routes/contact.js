import { Router } from "express";
import { body, validationResult } from "express-validator";
import Contact from "../models/Contact.js";

const router = Router();

const contactValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("subject").trim().notEmpty().withMessage("Subject is required"),
  body("message").trim().isLength({ min: 10 }).withMessage("Message must be at least 10 characters"),
];

router.post("/", contactValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = await Contact.create({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });

    res.status(201).json({ message: "Message sent successfully!", id: contact._id });
  } catch (err) {
    next(err);
  }
});

export default router;
