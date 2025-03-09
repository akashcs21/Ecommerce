const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { validateProduct , isLoggedIn  , isSeller ,isProductAuthor} = require('../middleware');
const {showAllProducts, productForm , createProduct , showProduct , editProductForm , updateProduct , deleteProduct} =  require('../controllers/product')

router.get('/products', showAllProducts );


router.get('/products/new', isLoggedIn, isSeller, productForm);

router.post('/products', isLoggedIn, isSeller, validateProduct, createProduct);

router.get('/products/:id', isLoggedIn, showProduct);


router.get('/products/:id/edit',isLoggedIn,isProductAuthor, editProductForm);

router.patch('/products/:id', isLoggedIn, isProductAuthor, validateProduct, updateProduct);


router.delete('/products/:id',isLoggedIn,isProductAuthor,deleteProduct);

router.get('/search', async (req, res) => {
    try {
        const query = req.query.query || '';
        const regex = new RegExp(query, 'i'); // Case-insensitive regex for partial matches
        const products = await Product.find({ name: regex }); // Adjust the field as needed
        res.render('products/search_result', { products, query });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Scholarship = require('../models/scholarship');
// const { validateProduct , isLoggedIn  , isSeller ,isProductAuthor} = require('../middleware');


// router.get('/scholarships', async (req, res) => {
    
//     try {
//         const scholarships = await Scholarship.find({});
//         res.render('scholarships/index', { scholarships });
//     }
//     catch (e) {
//         res.status(500).render('error',{err:e.message})
//     }
// });


// router.get('/scholarships/new', (req, res) => {
//     try {
//         res.render('scholarships/new');
//     }
//     catch (e) {
//          res.status(500).render('error',{err:e.message})
//     }  
// });

// router.post('/scholarships',isLoggedIn,isSeller,validateProduct,async (req, res) => {
    
//     try {
//         const { name, img, desc, price } = req.body;
//         await Scholarship.create({ name, img, price: parseFloat(price), desc,author:req.user._id });
//         req.flash('success', 'Successfully added a new scholarship!');
//         res.redirect('/scholarships');
//     }
//     catch (e) {
//         res.status(500).render('error', { err: e.message })
//     }
// });

// router.get('/scholarships/:id',isLoggedIn, async (req, res) => {


//     try {
//         const { id } = req.params;
//         const scholarship = await Scholarship.findById(id).populate('reviews');
//         res.render('scholarships/show', { scholarship}); 
//     }
//     catch (e) {
//         res.status(500).render('error',{err:e.message})
//     }
// });


// router.get('/scholarships/:id/edit',isLoggedIn, async (req, res) => {
    
//     try {
//         const { id } = req.params;
//         const scholarship = await Scholarship.findById(id);
//         res.render('scholarships/edit', { scholarship });
//     }
//     catch (e) {
//         res.status(500).render('error',{err:e.message})
//     }  
// });

// router.patch('/scholarships/:id',isLoggedIn,validateProduct,async (req, res) => {
    

//     try {
//         const { id } = req.params;
//         const { name, price, img, desc } = req.body;
//         await Scholarship.findByIdAndUpdate(id, { name, price, desc, img });
//         req.flash('success', 'Edit Your Scholarship Successfully');
//         res.redirect(`/scholarships/${id}`);
//     }
//     catch (e) {
//         res.status(500).render('error',{err:e.message})
        
//     } 
// });

// router.delete('/scholarships/:id',isLoggedIn,async (req, res) => {
//     const { id } = req.params;
//     await Scholarship.findByIdAndDelete(id);
//     res.redirect('/scholarships');
// });
// // router.delete('/scholarships/:id',isLoggedIn,isProductAuthor, async (req, res) => {
    
// //     try {
// //         const { id } = req.params;
// //         await Scholarship.findByIdAndDelete(id);
// //         res.redirect('/scholarships');
// //     }
// //     catch (e) {
// //         res.status(500).render('error',{err:e.message})   
// //     }
// // });




// module.exports = router;