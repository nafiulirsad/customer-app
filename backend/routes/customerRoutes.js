const express = require('express');
const router = express.Router();

const {
  getCustomers,
  getGenderStats,
  getDigitalInterestStats,
  getLocationTypeStats,
  getDeviceBrandStats,
  getAgeDistribution
} = require('../controllers/customerController');

router.get('/customers', getCustomers);
router.get('/gender-stats', getGenderStats);
router.get('/location-type-stats', getLocationTypeStats);
router.get('/digital-interest-stats', getDigitalInterestStats);
router.get('/device-brand-stats', getDeviceBrandStats);
router.get('/age-distribution', getAgeDistribution);

module.exports = router;