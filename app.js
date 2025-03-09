const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport =  require('passport');
const LocalStrategy =  require('passport-local');
const User = require('./models/User');
const seedDB = require('./seed')
const MongoStore = require('connect-mongo');
require('dotenv').config();
// const dbURL = 'mongodb://127.0.0.1:27017/e-com';
const dbURL = 'mongodb+srv://tripathiaman1011:830333@cluster0.dztrxtf.mongodb.net/food-del';

mongoose.set('strictQuery', true);
mongoose.connect(dbURL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let secret = 'weneedabettersecretkey';

let store = MongoStore.create({
    secret:secret,
    mongoUrl: dbURL,
    touchAfter:24*60*60
})

const sessionConfig = {
    store:store,
    name:'bhaukaal',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expires:Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



passport.use(new LocalStrategy(User.authenticate()));


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// seedDB();

// Routes require
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const productApi = require('./routes/api/productapi');
const paymentRoutes = require('./routes/payment');


app.get('/' , (req,res)=>{
    res.render('home');
})

app.get('/user/cart/placed' , (req,res)=>{
    res.render('placed');
})

// middle express
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(productApi);
app.use(paymentRoutes);


const port = 8080;

app.listen(port, () => {
    console.log(`server running at port ${port}`);
});