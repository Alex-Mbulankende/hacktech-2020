const express = require('express');
const router = express.Router();
const utils = require("../../seed/utils")
/* GET home page. */
router.get('/listings', async function(req, res, next) {
    let zip = req.query.zip;
    let country = req.query.country;
    let radius = req.query.radius;
    let radiusUnit = req.query.radiusUnit;
    let limit = req.query.limit;

    let eBay = require('ebay-node-client')(utils.prod_key, utils.prod_secret);
    await getOAuthToken(eBay);
    await setUserToken(eBay);
    let data = await searchByZipCode(eBay, country, zip, radius, radiusUnit, limit);
    res.status(200);
    res.send(data)
});


async function getOAuthToken(eBay) {
    try {
        let token = await eBay.application.getOAuthToken({
            grant_type: 'client_credentials',
            scope: 'https://api.ebay.com/oauth/api_scope'
        });
        eBay.setToken(token.access_token);
    } catch (error) {
        console.log('error ', error);
        process.exit(1);
    }
}

async function setUserToken(eBay) {
    eBay.setUserToken(utils.prod_USER_token);
}


async function searchByZipCode(eBay, country="US", zipcode=92129, radius=30, unit="mi", limit=3){
    categories = ["257818", "177663", "181381", "75036"];
    var data = {
        category_ids: "220",
        filter: (`pickupCountry:${country},pickupPostalCode:${zipcode},pickupRadius:${radius},pickupRadiusUnit:${unit},deliveryOptions:{SELLER_ARRANGED_LOCAL_PICKUP}`),
        limit: `${limit}`
    };
    try {
        var response = await eBay.browse.search(data);
        console.log('response', response);
        return response
    } catch (error) {
        console.log('error ', error);
        return;
    }
}

module.exports = router;
