const express = require('express');
const Package = require('../models/Package');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category, continent, featured, search, sort, limit } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (continent) filter.continent = continent;
    if (featured === 'true') filter.featured = true;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
      ];
    }

    let query = Package.find(filter);
    if (sort === 'price_asc') query = query.sort({ price: 1 });
    else if (sort === 'price_desc') query = query.sort({ price: -1 });
    else if (sort === 'rating') query = query.sort({ rating: -1 });
    else query = query.sort({ createdAt: -1 });

    if (limit) query = query.limit(parseInt(limit, 10));

    const packages = await query;
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const pkg = await Package.findOne({ slug: req.params.slug });
    if (!pkg) return res.status(404).json({ error: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
