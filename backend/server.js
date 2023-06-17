const express = require('express')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')
const passport = require('passport');

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))

const productRoute = require('./routes/product')
app.use('/api', productRoute);

const regRoute = require('./routes/auth')
app.use('/api', regRoute);

const userRoute = require('./routes/user')
app.use('/api', userRoute);

const orderRoute = require('./routes/checkout')
app.use('/api', orderRoute);

app.listen(8081, () => {
    console.log("server connected")
})



// app.get('/shop', (req, res) => {
//     const sql = "SELECT products.productID, products.price, productName, imgLink, variantType, max(variants.variantPrice) as maxPrice, min(variants.variantPrice) as minPrice FROM products left join variants on products.productID =variants.productID GROUP BY products.productID"
//     db.query(sql, (err, data) => {
//         if (err) return res.status(500).json({ message: err.message })
//         return res.json(data)
//     })
// })

// get product information for one item
// app.get('/:id', (req, res) => {
//     const productID = req.params.id
//     const sql = `SELECT * FROM products WHERE productID  = ?`

//     db.query(sql, [productID], (err, data) => {
//         if (err) res.status(500).json({ message: err.message })
//         return res.json(data)
//     }
//     )
// })

// get product information for items with variants
// SELECT * FROM products left join variants on products.productID =variants.productID ORDER BY products.productID ASC, variants.rank;
// app.get('/users/:id', (req, res) => {
//     const productID = req.params.id
//     const sql = `SELECT * FROM products left join variants on products.productID =variants.productID WHERE products.productID = ? ORDER BY products.productID ASC, variants.rank`

//     db.query(sql, [productID], (err, data) => {
//         if (err) res.status(500).json({ message: err.message })
//         return res.json(data)
//     }
//     )
// })

// get variant list for a product
// app.get('/variants/:id', (req, res) => {
//     const productID = req.params.id
//     const sql = `SELECT variantName, variantPrice FROM variants WHERE productID = ? ORDER BY rank ASC`;

//     db.query(sql, [productID], (err, data) => {
//         if (err) res.status(500).json({ message: err.message })
//         return res.json(data)
//     }
//     )
// })


// app.get('/filter/:filterName', (req, res) => {
//     const filter = req.params.filterName;
//     const sql = `SELECT products.productID, products.price, productName, imgLink, variantType, max(variants.variantPrice) as maxPrice,
//      min(variants.variantPrice) as minPrice FROM products left join variants on products.productID =variants.productID WHERE products.productID
//      in (SELECT productID FROM filters WHERE filterName = ?) GROUP BY products.productID`
//     db.query(sql, [filter], (err, data) => {
//         if (err) res.status(500).json({ message: err.message })
//         return res.json(data)
//     })
// })


