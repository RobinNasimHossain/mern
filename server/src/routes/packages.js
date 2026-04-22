import { Router } from "express";
import Package from "../models/Package.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { category, continent, search, featured, sort, limit } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (continent) filter.continent = continent;
    if (featured === "true") filter.featured = true;
    if (search) {
      filter.$text = { $search: search };
    }

    let query = Package.find(filter);

    if (sort === "price_asc") query = query.sort({ price: 1 });
    else if (sort === "price_desc") query = query.sort({ price: -1 });
    else if (sort === "rating") query = query.sort({ rating: -1 });
    else if (sort === "duration") query = query.sort({ duration: 1 });
    else query = query.sort({ createdAt: -1 });

    if (limit) query = query.limit(Number(limit));

    const packages = await query.exec();
    res.json(packages);
  } catch (err) {
    next(err);
  }
});

router.get("/categories", async (_req, res, next) => {
  try {
    const categories = await Package.distinct("category");
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.get("/continents", async (_req, res, next) => {
  try {
    const continents = await Package.distinct("continent");
    res.json(continents);
  } catch (err) {
    next(err);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const pkg = await Package.findOne({ slug: req.params.slug });
    if (!pkg) return res.status(404).json({ error: "Package not found" });
    res.json(pkg);
  } catch (err) {
    next(err);
  }
});

export default router;
