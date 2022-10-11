
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    title: String,
    introduction: String,
    weight: String,
    price: Number,
    selectQuantity: Number,

    categories: [
        {
            title: String
        }
    ], 
    
    images: [
        {
            url: String
        }
    ],

}); // end of schema definition


module.exports = mongoose.model('Product', ProductSchema);

