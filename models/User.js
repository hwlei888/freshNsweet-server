
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    name: String,
    email: String,
    passwordDigest: String,
    isAdmin: Boolean,

    cart: [
        {
            quantity: Number,
            product: {
                ref: 'Product',
                type: mongoose.Schema.Types.ObjectId
            }

        }
    ], // cart

    orderHistory: [
        {
            address: String,
            paymentDate : {
                type: Date,
                default: Date.now
                // automatically default this field to the current date
            },
            items: [
                {
                    quantity: Number,
                    product: {
                        ref: 'Product',
                        type: mongoose.Schema.Types.ObjectId
                    }
        
                }
            ]

        }
    ]


}); // Schema()

module.exports = mongoose.model('User', UserSchema);

