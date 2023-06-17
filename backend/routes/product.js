const express = require('express')
const router = express.Router()
const db = require("../db");

//get all the products from the database depending on the filters applied using request query
router.get('/product', async (req, res) => {
    const filterID = req.query.filter
    const sorted = req.query.sort

    if (filterID || sorted) {

        var beginsql = `SELECT products.productID, productName, imgLink, variantType, min(variants.variantPrice) as minPrice 
        FROM products left join variants on products.productID = variants.productID WHERE products.productID
         in (SELECT productID FROM filters WHERE filterName = ?) GROUP BY products.productID`

        if (filterID == null || filterID == "All") {
            beginsql = `SELECT products.productID, productName, imgLink, variantType, min(variants.variantPrice) as minPrice 
            FROM products left join variants on products.productID =variants.productID GROUP BY products.productID`
        }

        switch (sorted) {
            case 'priceASC':
                var sql = beginsql + ` ORDER BY min(variants.variantPrice) ASC;`;
                break;
            case 'priceDESC':
                var sql = beginsql + ` ORDER BY min(variants.variantPrice) DESC;`;
                break;
            case null:
                var sql = beginsql;
                break;
            default:
                var sql = beginsql;
                break;
        }
    } else {
        var sql = `SELECT products.productID,  productName, imgLink, variantType, min(variants.variantPrice) as minPrice
         FROM products left join variants on products.productID =variants.productID GROUP BY products.productID`
    }

    try {
        const [data] = await db.query(sql, [filterID])
        return res.json(data)
    } catch (err) {
        res.status(500).json(err)
    }

    // db.query(sql, [filterID], (err, data) => {
    //     if (err) res.status(500).json({ message: err.message })
    //     return res.json(data)

    // })
})

//get product information for individual product pages, including any variants available
router.get('/product/:id', async (req, res) => {
    try {
        const productID = req.params.id
        const sql = `SELECT products.productID, productName, imgLink, variantType, productDescription, variantName, variantPrice FROM products left join variants on products.productID =variants.productID WHERE products.productID = ? ORDER BY variants.rank ASC;`;
        const [data] = await db.query(sql, [productID])
        return res.json(data)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

    // db.query(sql, [productID], (err, data) => {
    //     if (err) res.status(500).json({ message: err.message })
    //     return res.json(data)
    // }
    // )


})



module.exports = router