require('dotenv').config()
const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_PRIV)
const db = require("../db");
const nodemailer = require('nodemailer')


//process payment
router.post('/payment-order', async (req, res) => {

    try {
        const total = req.body.amount;
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "cad",
            amount: total

        })

        res.status(200).json(paymentIntent.client_secret)
    } catch (err) {
        // res.status(500).json({ error: err.message })
        res.status(500).json(err)

    }
})

router.post('/process-order', async (req, res) => {

    try {
        const orderPrice = req.body.orderPrice;
        const username = req.body.username;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const numItems = req.body.numItems;
        const street = req.body.street;
        const city = req.body.city;
        const province = req.body.province;
        const pc = req.body.pc;
        const products = req.body.items;
        const taxes = req.body.taxes;
        const shipping = req.body.shipping;
        const subtotal = req.body.subtotal

        //check if customer has an account or has already ordered before
        const [checkUser] = await db.query("SELECT * FROM users WHERE username = ?", [username])

        //if user doesn't exist - add them to database as guest customer 
        if (checkUser.length == 0) {
            await db.query("INSERT INTO users values(?,?,?, NULL)", [username, firstName, lastName])
        }

        const addQuery = "INSERT INTO orders(username, orderPrice, subtotal, shipping, taxes, numItems, orderDate, orderTime, street, city, province, pc) values(?, ?, ?, ?,?,?, CURRENT_DATE(), CURRENT_TIME(), ?, ?,?, ?)"
        //adding order to our database
        const [add] = await db.query(addQuery, [username, orderPrice, subtotal, shipping, taxes, numItems, street, city, province, pc])

        const orderID = add.insertId

        //we need to add the products in the order in the database 
        for (const item of products) {
            await db.query('INSERT INTO ordercontains values(?,?,?,?,?)', [orderID, item.id, item.variant, item.price, item.quantity])
        }


        //const hi = products.map(async (item) => { doesnt' work because it does not await, collects return values 

        //send email to customer for order confirmation

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAIL_EMAIL,
                pass: process.env.NODEMAIL_PASS,
            },
        });

        const msg = "Thank you for ordering from Plantasia. Your order is on its way!"

        let sendEmail = await transporter.sendMail({
            from: '"Plantasia" <noreply@plantasia.com>',
            to: username,
            subject: "Plantasia - Order Confirmation",
            text: msg,
            html: `<p>${msg}</p>`, // html body
        });

        res.status(200).json(orderID)

    } catch (err) {
        res.status(500).json(err)
    }

})
module.exports = router