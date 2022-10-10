
const express = require('express');
const app = express();
const PORT = 3000;

// set the CORS allow header for us on every request, for AJAX requests
const cors = require('cors'); // check online
app.use(cors());

// To get access to POSTed 'formdata' body content, we have to add a new middleware handler for it
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}...`);
});

// Mongoose DB initialisation
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');

mongoose.connect('mongodb://127.0.0.1/ba');
const db = mongoose.connection;

db.on('error', err => {
    console.log('Error connecting to DB server', err);
    process.exit(1);
});


// Authentication *********************************************************

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtAuthenticate = require('express-jwt');

const checkAuth = () => {

    return jwtAuthenticate.expressjwt({
        secret: SERVER_SECRET_KEY, // check the token hasn't been tampered with
        algorithms: ['HS256'],
        requestProperty: 'auth'  // gives us 'req.auth'
    });
}; // checkAuth()


const SERVER_SECRET_KEY = 'mySecretKeyHereCHICKEN';


// API routes GET / *********************************************************
app.get('/', (req, res) => {
    console.log('Root route was requested.');
    res.json({hello: 'Welcome to freshNsweet'})
})

// Index of products: GET /products *********************************************************
app.get('/products', async (req, res) => {
    
    try {
        const products = await Product.find();
        res.json(products);
    }catch(err){
        console.error('Error loading all products:', err);
        res.status(422).json({error: 'Db connection error'});
    }

}); // GET /flights


// Index of users: GET /users *********************************************************
app.get('/users', async(req, res) => {

    try{
        const users = await User.find()
        .populate('cart.product')
        .populate({path: 'orderHistory.items.product', select: 'title'});
        // const users = await User.find().populate({path: 'cart.product', select: 'title'});
        res.json(users);
    }catch(err){
        console.error('Error loading all users:', err);
        res.status(422).json({error: 'Db connection error'});
    }
}); // GET /users


// Product Details show route: GET /products/:id *********************************************************
app.get('/products/:id', async (req, res) => {

    try{
        const product = await Product.findOne({_id: req.params.id});

        console.log('product', product);

        res.send({ product });

    }catch(err){
        console.log('Error finding product by ID:', req.params, err);
        res.sendStatus(422);
    }
});


// Categories show route: GET /category/Fruit *********************************************************
app.get('/category/:title', async (req, res) => {

    try{
        // .find ('categories.title': 'Fruit')
        //the first letter in find need to be upper case
        // const paramsTtitle = req.params.title.charAt(0).toUpperCase() + req.params.title.slice(1);
        const categoryProducts = await Product.find({'categories.title': {'$regex': req.params.title, '$options': 'i'}});
        // const categoryProducts = await Product.find({'categories.title': {"$regex": "Fresh", "$options": "i" } });

        console.log('products of that category', categoryProducts);

        // res.send({categoryProducts});
        res.json(categoryProducts);

    }catch(err){
        console.log('Error finding category', err );
        res.sendStatus(422);
    }
});


// Categories show route: GET /user *********************************************************
app.get('/user', async (req, res) => {

    try{
        const user = await User.findOne({_id: '6343b7b71c46d0568631dfbd'})
        .populate('cart.product');

        console.log('user', user);

        res.json(user);

    }catch(err){
        console.log('Error finding user', err);
        res.sendStatus(422);
    }

});


// Categories show route: POST /user *********************************************************
app.post('/user', async(req, res) => {
    
    console.log('POST/user');
    console.log('req body:', req.body);

    const newItem = {
        quantity: 1,
        product: req.body,
    }

    // async & await !!!!!!!
    try{
        const result = await User.updateOne(
            {_id: '6343b7b71c46d0568631dfbd' },

            {
                $push:{cart: newItem}
            },
        ); // .updateOne()

        // const resultUser =  await User.findOne({_id:'6343b7b71c46d0568631dfbd'}).populate('cart.product');
        // console.log(resultUser);


        
        console.log('result of updateOne', result);

        if(result.matchedCount === 0){
            console.error('item not found for cart update', result, req.body);
            res.sendStatus(422);
        }

        res.json(newItem);



    }catch(err){
        console.error('Error updating cart', err);
        res.sendStatus(422);
    }

});



// Login route *********************************************************

app.post('/login', async(req, res) => {

    console.log('login:', req.body);

    const {email, password} = req.body;
    // const email = req.body.email;
    // const password = req.body.password; 

    try {
        const user = await User.findOne({email});

        if(user && bcrypt.compareSync(password, user.passwordDigest)){
            // correct credentials
            // res.json({success: true})

            const token = jwt.sign(
                {_id: user._id},
                SERVER_SECRET_KEY,
                {expiresIn: '72h'} // 5 days
            );

            res.json({token});

        }else {
            // incorrect credentials: user not found (by email), or passwords don't match
            res.status(401).json({success: false}); // Unauthorized
        }

    }catch(err){
        console.log('Error verifying login credentials:', err);
        res.sendStatus(500);
    }

}); // POST /login


// Routes below this line only work for authenticated users

app.use(checkAuth());

app.use(async (req, res, next) => {

    try{
        const user = await User.findOne({_id: req.auth._id});

        if(user === null){
            res.sendStatus( 401 );
        } else {
            req.current_user = user;
            next();
        }

    }catch(err){
        console.log('Error querying User in auth middleware', err);
        res.sendStatus( 500 );
    }
});


// All routes below now have a 'req.current_user' defined

app.get('/current_user', (req, res) => {
    res.json(req.current_user);
});







