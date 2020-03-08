const express = require('express');
const firebase = require('firebase')
const utils = require("../../seed/utils")

const app = firebase.initializeApp(utils.firebaseConfig)
const router = express.Router();


/* GET home page. */
router.get('/listings', async function(req, res, next) {
    let zip = req.query.zip;
    let country = req.query.country;
    let raidus = req.query.raidus;
    let radiusUnit = req.query.radiusUnit;
    let limit = req.query.limit;

    let eBay = require('ebay-node-client')(utils.sbx_key, utils.sbx_secret);
    // let eBay = require('ebay-node-client')(utils.prod_key, utils.prod_secret);
    
    await getOAuthToken(eBay);
    await setUserToken(eBay);
    let data = await searchByZipCode(eBay, country, zip, raidus, radiusUnit, limit);
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
    eBay.setUserToken(utils.sbx_USER_token);
}

let categoryNames = {
    masks: "257818",
    handSanitizer: "177663",
    camping: "181381",
    medicine: "75036"
}

let nameForNumber = {
    "257818": "masks",
    "177663": "handSanitizer",
    "181381": "camping",
    "75036": "medicine"
}

async function searchByZipCode(eBay, country="US", zipcode=92129, radius=30, unit="mi", limit=3){
    // debugger
    categories = [categoryNames.masks, categoryNames.handSanitizer, categoryNames.camping, categoryNames.medicine];
    var data = {
        category_ids: "220",
        filter: (`pickupCountry:${country},pickupPostalCode:${zipcode},pickupRadius:${radius},pickupRadiusUnit:${unit},deliveryOptions:{SELLER_ARRANGED_LOCAL_PICKUP}`),
        limit: `${limit}`
    };
    try {
        let status = {}
        let catFunc = function(catId) {
            return async function() {
                let data = {
                    category_ids: `${catId}`,
                    filter: (`pickupCountry:${country},pickupPostalCode:${zipcode},pickupRadius:${radius},pickupRadiusUnit:${unit},deliveryOptions:{SELLER_ARRANGED_LOCAL_PICKUP}`),
                    limit: `${limit}`,
                    fieldgroups: "FULL"
                };
                let response = await eBay.browse.search(data);
                status[catId] = response.total
                let result = [];
                // await Promise.all(response.itemSummaries.map(item => {
                //     return async function() {
                //         let id = item.itemId;
                //         let itemData = await eBay.browse.getItem(id);
                //         result.push(itemData)
                //     }
                // }))
                
                return response;
            }
        }
        let results = await Promise.all(categories.map(catId => catFunc(catId)()));

        // var response = await eBay.browse.search(data);
        categories.forEach(cat => {
            firebase.database().ref(`zipcodes/${zipcode}`).child(nameForNumber[cat]).set(status[cat])
            console.log(`${nameForNumber[cat]} -> ${status[cat]}`)
        })
        return results
    } catch (error) {
        console.log('error ', error);
        return;
    }  
}

module.exports = router;
