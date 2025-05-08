const Review = require('../models/review');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { productId, rating, message } = req.body;

    if (!productId || rating === undefined) {
      return res.status(400).json({ message: 'productId, userId and rating are required' });
    }

    if (message !== undefined) {
      if (typeof message !== 'string' || message.length < 5 || message.length > 500) {
        return res.status(400).json({ message: 'message must be a string between 5 and 500 characters' });
      }
    }

    const review = new Review({ productId, userId: req.user.id, rating, message });
    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a review by ID
exports.updateReview = async (req, res) => {
  try {
    const { rating, message } = req.body;

    if (rating === undefined) {
      return res.status(400).json({ message: 'rating is required' });
    }

    if (message !== undefined) {
      if (typeof message !== 'string' || message.length < 5 || message.length > 500) {
        return res.status(400).json({ message: 'message must be a string between 5 and 500 characters' });
      }
    }

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.rating = rating;
    if (message !== undefined) {
      review.message = message;
    }
    await review.save();

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
