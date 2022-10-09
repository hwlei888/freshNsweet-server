
const mongoose = require('mongoose');
const Product = require('./Product');
const User = require('./User');

mongoose.connect('mongodb://127.0.0.1/ba'); // check online
const db = mongoose.connection;

db.on('error', err => {
    console.log('DB Connection error', err);
    process.exit(1);
});

db.once('open', async() => {
    console.log('Success! DB connected, model loaded.');

    // Product seeds *********************************************************
    await Product.deleteMany();

    const createdProducts = await Product.create([
        {
            title: 'Strawberry',
            introduction: 'Fresh Strawberry from Brazil',
            weight: '250g',
            price: 3.50,
            like: 5,
            categories: [
                {title: 'Fruit'},
                {title: 'New Arrival'},
                {title: 'Fresh Special'},
            ], // category[]
            images: [
                {url: 'https://cdn0.woolworths.media/content/wowproductimages/large/144607.jpg'},
                {url: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/320/320894/strawberry-on-white-background-to-represent-strawberry-tongue.jpg'},
            ]
        },

        {
            title: 'Red Capsicum Each',
            introduction: 'Capsicums are seed pods. A shiny red vegetable with crisp, moist flesh. Hollow with a seeded core. Capsicums are sweet and juicy with a mild spicy flavour. Red capsicums, being riper, are sweeter than green capsicums. Shape also varies with each variety, from the more commonly found blocky shape to a pointy capsicum. Miniature varieties are sometimes available.',
            weight: 'Each',
            price: 1.73,
            like: 1,
            categories: [
                {title: 'Vegetable'},
                {title: 'Australian Grown'},
                {title: 'Fresh Special'},
            ], // category[]
            images: [
                {url: 'https://cdn0.woolworths.media/content/wowproductimages/large/135306.jpg'},
                {url: 'https://www.luckyvegetables.com.au/wp-content/uploads/2021/11/red-caps.jpg'},
            ]
        },

    ]);

    console.log('products:', createdProducts);


    // User seeds *********************************************************
    await User.deleteMany();

    const createdUsers = await User.create([
        {
            name: 'Andy',
            email: 'andy@gmail.com',
            isAdmin: false,

        cart: [
            {
                quantity: 10,
                product: createdProducts[0],
            },

            {
                quantity: 3,
                product: createdProducts[1],
            },
        ], 

        orderHistory: [
            {
                address: 'Heaths Rd, Hoppers Crossing VIC 3030',
                items: [
                    {
                        quantity: 4,
                        product: createdProducts[0],
                    }
                ]
            }, // orderHistory 1

            {
                address: '264 Plenty Rd, Mill Park VIC 3082',
                items: [
                    {
                        quantity: 8,
                        product: createdProducts[0],
                    },

                    {
                        quantity: 2,
                        product: createdProducts[1],
                    },
                ]
            }, // orderHistory 2
        ]



        }
    ]); // User.create()




    console.log('Users:', createdUsers);











    process.exit(0);

});



