// access user information like past orders
const express = require('express')
const router = express.Router()
const db = require("../db");
const passport = require('passport');
require('../passport/pass')(passport);



//get authorized user's past orders 
router.get("/pastOrders", async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, isValid, msg) => {
        if (err) {
            res.status(400).json(err)
        } else {
            if (msg) {
                res.status(400).json(msg)
            }
            try {
                if (isValid) {
                    const [orderData] = await db.query(`SELECT * FROM orders WHERE username = ?`, [isValid.username]);


                    var data = []

                    for (const order of orderData) {
                        const getOrders = 'SELECT orderID, ordercontains.productID, variantName, productPrice, quantity, productName, imgLink FROM ordercontains join products on ordercontains.productID = products.productID WHERE ordercontains.orderID = ?;'
                        const [productData] = await db.query(getOrders, [order.orderID])

                        let element = {
                            order: order,
                            products: productData
                        }

                        data = [...data, element]
                    }

                    res.status(200).json(data)

                }
            } catch (error) {
                res.status(500).json(error.message)
            }
        }

    })(req, res, next)
});

module.exports = router;

