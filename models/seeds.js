
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
            selectQuantity: 0,
            categories: [
                {title: 'Fruit'},
                {title: 'New Arrival'},
                {title: 'Fresh Special'},
            ], // category[]
            images: [
                {url: 'https://cdn0.woolworths.media/content/wowproductimages/large/144607.jpg'},
                {url: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/320/320894/strawberry-on-white-background-to-represent-strawberry-tongue.jpg'},
            ]
        }, // createdProducts[0]

        {
            title: 'Red Capsicum Each',
            introduction: 'Capsicums are seed pods. A shiny red vegetable with crisp, moist flesh. Hollow with a seeded core. Capsicums are sweet and juicy with a mild spicy flavour. Red capsicums, being riper, are sweeter than green capsicums. Shape also varies with each variety, from the more commonly found blocky shape to a pointy capsicum. Miniature varieties are sometimes available.',
            weight: 'Each',
            price: 1.73,
            selectQuantity: 0,
            categories: [
                {title: 'Vegetable'},
                {title: 'Australian Grown'},
                {title: 'Fresh Special'},
            ], // category[]
            images: [
                {url: 'https://cdn0.woolworths.media/content/wowproductimages/large/135306.jpg'},
                {url: 'https://www.luckyvegetables.com.au/wp-content/uploads/2021/11/red-caps.jpg'},
            ]
        }, // createdProducts[1]

        {
            title: 'Red Watermelon Cut Quarter Each',
            introduction: "Large oval fruit with a thick green skin and a sweet watery pink to red flesh. Often the deeper colored the flesh, the sweeter the taste. Watermelon's flesh contains about 6% sugar and it is comprised primarily of water. This seedless variety is perfect for kids.",
            weight: 'Quarter Each',
            price: 4.18,
            selectQuantity: 0,
            categories: [
                {title: 'Fruit'},
                {title: 'Best Sellers'},
                {title: 'Fresh Special'},
            ], // category[]
            images: [
                {url: 'https://cdn0.woolworths.media/content/wowproductimages/large/120384.jpg'},
                {url: 'https://www.enzazaden.com/us/-/media/images/enza-zaden/list-images-640x480/01_products-services/watermelon/p_2017003_red_amber.jpg'},
                {url: 'https://hips.hearstapps.com/hmg-prod/images/repeated-watermelon-on-the-blue-background-royalty-free-image-1626974881.jpg'},
            ]
        }, // createdProducts[2]

        {
            title: 'Cavendish Bananas Each',
            introduction: "Cavendish is the most popular banana variety in Australia, with firm, starchy flesh and available all year round. Ripe bananas are perfect for snacking, used in baking, fruit salads and smoothie.",
            weight: 'Each',
            price: 0.36,
            selectQuantity: 0,
            categories: [
                {title: 'Fruit'},
                {title: 'Fresh Special'},
            ], // category[]
            images: [
                {url: 'https://cdn0.woolworths.media/content/wowproductimages/large/133211.jpg'},
                {url: 'https://images.theconversation.com/files/142716/original/image-20161021-1763-13xoceb.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop'},
                {url: 'https://modernfarmer.com/wp-content/uploads/2022/01/shutterstock_533882299.jpg'},
            ]
        }, // createdProducts[3]

        {
            title: 'Woolworths Butternut Pumpkin Cut Each',
            introduction: "Butternut pumpkin, or butternut squash, has hard golden-brown skin with bright orange flesh on the inside. This pumpkin is versatile and delicious with a sweet, nutty taste. A perfect allrounder, you can roast, mash, fry, bake and even air-fry it.",
            weight: 'Each',
            price: 2.60,
            selectQuantity: 0,
            categories: [
                {title: 'Vegetable'},
                {title: 'Australian Grown'},
                {title: 'New Arrival'},
            ], // category[]
            images: [
                {url: 'https://cdn0.woolworths.media/content/wowproductimages/large/147197.jpg'},
                {url: 'https://cdn0.woolworths.media/content/wowproductimages/large/147197_1.jpg'},
                {url: 'https://img.taste.com.au/HrwR8IZM/w720-h480-cfill-q80/taste/2020/03/april20_rice-stuffed-butternut-pumpkin-159628-1.jpg'},
            ]
        }, // createdProducts[4]

        {
            title: 'Hass Avocado Each',
            introduction: "Famous for their smooth, buttery flesh Hass avocados are a delightful addition to any meal. They have a pebbly skin that changes colour as they ripen from green to purple-black. Store firm fruit on the bench for a day or two and move to the fridge to hold in a ripe and ready to eat state once they begin to soften.",
            weight: 'Each',
            price: 2.00,
            selectQuantity: 0,
            categories: [
                {title: 'Vegetable'},
                {title: 'Australian Grown'},
                {title: 'Best seller'},
            ], // category[]
            images: [
                {url: 'https://cdn0.woolworths.media/content/wowproductimages/large/120080.jpg'},
                {url: 'https://gregalder.com/yardposts/wp-content/uploads/2020/06/GEM-and-Hass-avocados-1024x866.jpg'},
                {url: 'https://thumbs.dreamstime.com/b/ripe-hass-avocado-fruit-top-view-wooden-plate-spoon-161930497.jpg'},
                {url: 'https://gourmandandgourmet.com.au/wp-content/uploads/mp/files/posts/images/shepardisthedevil.jpg'},
            ]
        }, // createdProducts[5]

    ]);

    console.log('products:', createdProducts);


    // User seeds *********************************************************
    await User.deleteMany();

    const createdUsers = await User.create([

        {
            name: 'lei',
            email: 'lei@gmail.com',
            passwordDigest: bcrypt.hashSync('chicken', 10),
            isAdmin: true,
        }, // createdUsers[0]

        {
            name: 'Andy',
            email: 'andy@gmail.com',
            passwordDigest: bcrypt.hashSync('chicken', 10),
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
        }, // createdUsers[1]

        {
            name: 'Angie',
            email: 'angie@gmail.com',
            passwordDigest: bcrypt.hashSync('chicken', 10),
            isAdmin: false,

            cart: [
                {
                    quantity: 3,
                    product: createdProducts[2],
                },

                {
                    quantity: 5,
                    product: createdProducts[3],
                },

                {
                    quantity: 2,
                    product: createdProducts[4],
                },
            ], 

            orderHistory: [
                {
                    address: '5 Viscount Pl, Liverpool NSW 2170',
                    items: [
                        {
                            quantity: 4,
                            product: createdProducts[0],
                        },
                    ]
                }, // orderHistory 1

                {
                    address: 'Balaclava Rd, Macquarie Park NSW 2109',
                    items: [
                        {
                            quantity: 2,
                            product: createdProducts[3],
                        },

                        {
                            quantity: 5,
                            product: createdProducts[4],
                        },

                        {
                            quantity: 2,
                            product: createdProducts[5],
                        },
                    ]
                }, // orderHistory 2
            ]
        }, // createdUsers[2]





    ]); // User.create()




    console.log('Users:', createdUsers);


    process.exit(0);

});



