const router = require('express').Router();
const userRoutes = require('./authRoutes');

router.use('/users', userRoutes);

module.exports = router;
