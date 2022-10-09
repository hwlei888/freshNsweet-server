
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


// Categories show route: GET /fruit  *********************************************************
app.get('/category/:title', async (req, res) => {

    try{
        // .find ('categories.title': 'Fruit')
        //the first letter in find need to be upper case
        // const paramsTtitle = req.params.title.charAt(0).toUpperCase() + req.params.title.slice(1);
        const fruit = await Product.find({'categories.title': {'$regex': req.params.title, '$options': 'i'}});
        // const fruit = await Product.find({'categories.title': {"$regex": "Fresh", "$options": "i" } });

        console.log('fruit product', fruit);

        // res.send({fruit});
        res.json(fruit);

    }catch(err){
        console.log('Error finding category', err );
        res.sendStatus(422);
    }
})







