const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Review = require('../models/Review');
const { validateReview } = require('../middleware');


router.post('/products/:productid/review',validateReview,async(req, res) => {


    try {
        const { productid } = req.params;
        const { rating, comment } = req.body;

        const product = await Product.findById(productid);

        const review = new Review({ rating, comment });

        // Average Rating Logic
        const newAverageRating = ((product.avgRating * product.reviews.length) + parseInt(rating)) / (product.reviews.length + 1);
        product.avgRating = parseFloat(newAverageRating.toFixed(1));

        product.reviews.push(review);

        await review.save();
        await product.save();

        req.flash('success', 'Added your review successfully!');
        res.redirect(`/products/${productid}`);
    }

    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
    
});
router.delete('/products/:productid/review/:reviewid', async (req, res) => {
    try {
      const { productid, reviewid } = req.params;
      const product = await Product.findById(productid);
      const review = await Review.findByIdAndRemove(reviewid);
  
      if (!review) {
        req.flash('error', 'Review not found!');
        res.redirect(`/products/${productid}`);
        return;
      }
  
      if (product.reviews.length > 0) {
        const newAverageRating = ((product.avgRating * product.reviews.length) - review.rating) / (product.reviews.length - 1);
        product.avgRating = parseFloat(newAverageRating.toFixed(1));
      } else {
        product.avgRating = 0;
      }
  
      product.reviews.pull(reviewid);
      await product.save();
  
      req.flash('error', 'Review deleted successfully!');
      res.redirect(`/products/${productid}`);
    } catch (e) {
      res.status(500).render('error', { err: e.message });
    }
  });
  



module.exports = router;
