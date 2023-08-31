const router = require('express').Router();
const userRoutes = require('./authRoutes');
const fuelRoutes = require('./fuelRoutes')

router.use('/users', userRoutes);
router.use('/fuel', fuelRoutes)


module.exports = router;
