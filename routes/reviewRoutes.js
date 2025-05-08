const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const protect = require('../middlewares/authMiddleware');

router.post('/',protect, reviewController.createReview);
router.get('/:id',protect, reviewController.getReviewById);
router.put('/:id',protect, reviewController.updateReview);
router.delete('/:id',protect, reviewController.deleteReview);

module.exports = router;
