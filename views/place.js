// router.post('/checkout/payment/:amount',async(req,res)=>{

//     const {first_name,last_name,phone,email,address,city,state,postal_code} = req.body;
//     console.log(req.body);
//     console.log(first_name + " " + last_name + " " + phone + " " + email + " " + address + " " + city + " " + state + " " + postal_code);
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "INR",
//             product_data: {
//               name: "all items",
//             },
//             unit_amount: req.params.amount * 100,
//           },
//           quantity: "1",
//         },
//       ],
//       phone_number_collection: {
//         enabled: true,
//       },
//       mode: "payment",
//       success_url: "http://localhost:8080/products",
//       cancel_url: "http://localhost:8080/products",
//     });
//     res.redirect(303, session.url);
//     res.render("cart/payment");
//   });