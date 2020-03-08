const express = require('express');
const firebase = require('firebase')
const utils = require("../../seed/utils")
const request = require("request");
const app = firebase.initializeApp(utils.firebaseConfig)
const router = express.Router();

async function test() {
    const csv = require('csv-parser')
    const fs = require('fs')
    const results = [];
    fs.createReadStream('./data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
        results.forEach(item => {
            addItem(item["title"], item["description"], categoryNames[item["category"]], item["price"], item["location"], item["postal_code"], item["picture_url"], item["country"], item["currency"], item["is_new"], item["latitude"], item["longitude"])
            console.log(categoryNames[item["category"]])
        })
        const item = results[2]
        console.log(item)
        let data = await addItem(
        `${item["title"].substring(0, 75) }`,
        `${item["description"].substring(0, 75) }`,
        `${categoryNames[item["category"]].substring(0, 75) }`,
        `${item["price"] }`,
        `${item["location"].substring(0, 75) }`,
        `${item["postal_code"] }`,
        `${item["picture_url"] }`,
        `${item["country"] }`,
        `${item["currency"] }`,
        `${item["is_new"]}`,
        `${item["latitude"]}`,
        `${item["longitude"]}`)
        console.log(data)
        
        // [
        //   { NAME: 'Daffy Duck', AGE: '24' },
        //   { NAME: 'Bugs Bunny', AGE: '22' }
        // ]
    });
}


/* GET home page. */
router.get('/listings', async function(req, res, next) {
    let zip = req.query.zip;
    let country = req.query.country;
    let raidus = req.query.radius;
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

router.get("/wtf", async function(req, res) {
    let title = req.query.title || "Hand Sanatizer";
    let description = req.query.description || "Use this to protect yourself from the coronavirus!";
    let categoryID = req.query.categoryID || categoryNames.handSanitizer;
    let price = req.query.price || "3";
    let location = req.query.location || "8223 Stage Coach Place";
    let postal_code = req.query.postal_code || "95131";
    let picture_url = req.query.picture_url || "https://static.grainger.com/rp/s/is/image/Grainger/38CC09_AS01?$mdmain$";
    let country = req.query.country || "US";
    let currency = req.query.currency || "USD";
    let is_new = req.query.is_new || "True";
    let itemId = req.query.itemId // required

    firebase.database().ref(`listings/v1|${itemId}|0`).set({
        title: title,
        description: description,
        categoryID: categoryID,
        postal_code: postal_code,
        price: price,
        location: location,
        picture_url: picture_url,
        country: country,
        currency: currency,
        is_new: is_new
    })

    res.send(itemId)
})

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
    sanitizer: "177663",
    camping: "181381",
    medicine: "75036"
}

let nameForNumber = {
    "257818": "masks",
    "177663": "sanitizer",
    "181381": "camping",
    "75036": "medicine"
}


async function searchByZipCode(eBay, country="US", zipcode=92129, radius=30, unit="mi", limit=3){
    // debugger
    categories = [categoryNames.masks, categoryNames.sanitizer, categoryNames.camping, categoryNames.medicine];
    
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
                debugger
                let response = await eBay.browse.search(data);
                status[catId] = response.total
                let allData = [];

                if (response.total > 0) {
                    for await (const item of response.itemSummaries) {
                        let id = item.itemId;
                        debugger
                        let data = await firebase.database().ref(`/listings/${id}`).once('value').then(async function(snapshot) {
                            const result = await snapshot.val()
                            return result || id
                        }).catch(async function(error) {
                            return {}
                        })
                        console.log("WOW ITS DATA")
                        console.log(data)
                        allData.push(data)
                        data["url"] = `http://cgi.sandbox.ebay.com/ws/eBayISAPI.dll?ViewItem&item=${id.substring(3, id.length-2)}`
                    }
                    debugger
                    console.log(allData)
                    return allData;
                } else {
                    return []
                }
            }
        }
        debugger
        let results = []
        for await (const catId of categories) {
            console.log(`starting ${nameForNumber[catId]}`)
            results.push(await catFunc(catId)())
            console.log(`completed ${nameForNumber[catId]}`)
            console.log(results.slice().pop())
        }
        // let results = await Promise.all(categories.map(catId => catFunc(catId)()));
        console.log(`—————————`)
        console.log(results)
        console.log(`——————–`)
        // var response = await eBay.browse.search(data);
        categories.forEach(cat => {
            firebase.database().ref(`zipcodes/${zipcode}`).child(nameForNumber[cat]).set(status[cat]/10)
            console.log(`${nameForNumber[cat]} -> ${status[cat]}`)
        })
        console.log(results)
        return results
    } catch (error) {
        console.log('error ', error);
        return;
    }  
}


router.get("/insight", async (req, res, next) => {
    let zipcode = req.query.zip || 92129
    const result = await firebase.database().ref(`zipcodes/${zipcode}`).once('value').then(async function(snapshot) {
        console.log(snapshot)
        const result2 = await snapshot.val()
  
        return result2;
      });

      if (!result) {
          res.send("No Data")
      } else {
        res.send(result)
      }
})

router.get("/addItem", async (req, res, next) => {
    console.log(req.query)
    let title = req.query.title || "Hand Sanatizer";
    let description = req.query.description || "Use this to protect yourself from the coronavirus!";
    let categoryID = req.query.categoryID || categoryNames.sanitizer;
    let price = req.query.price || "3";
    let location = req.query.location || "8223 Stage Coach Place";
    let postal_code = req.query.postal_code || "92129";
    let picture_url = req.query.picture_url || "https://static.grainger.com/rp/s/is/image/Grainger/38CC09_AS01?$mdmain$";
    let country = req.query.country || "US";
    let currency = req.query.currency || "USD";
    let is_new = req.query.is_new || "True";
    let lat = req.query.lat
    let lng = req.query.lng

    console.log(title)
    

    addItem(title,
    description,
    categoryID,
    price,
    location,
    postal_code,
    picture_url,
    country,
    currency,
    is_new, lat,
    lng).then(success => {
        res.status(200)
        res.send(success)
    }).catch(({err, response, body}) => {
        res.status(400)
        res.send(response)
    })
})

function addItem(title,
    description,
    categoryID,
    price,
    location,
    postal_code,
    picture_url,
    country,
    currency,
    is_new, lat, lng) {
    return new Promise((resolve, reject) => {

        // firebase.database().ref(`listings/v1|${110510320006}|0`).set({
        //     title: title,
        //     description: description,
        //     categoryID: categoryID,
        //     postal_code: postal_code,
        //     price: price,
        //     location: location,
        //     picture_url: picture_url,
        //     country: country,
        //     currency: currency,
        //     is_new: is_new,
        //     lat: lat,
        //     lng, lng
        // })

        request.post({
            url: 'http://35.232.236.97/additem',
            body: {
                "title": title,
                "description": description,
                "categoryID": categoryID,
                "price": price,
                "location": location,
                "postal_code": postal_code,
                "picture_url": picture_url,
                "country": country,
                "currency": currency,
                "is_new": is_new,
                "lat": lat,
                "lng": lng
            },
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // add to firebase too
                let itemId = body.body.split("=").pop()
                firebase.database().ref(`listings/v1|${itemId}|0`).set({
                    title: title,
                    description: description,
                    categoryID: categoryID,
                    postal_code: postal_code,
                    price: price,
                    location: location,
                    picture_url: picture_url,
                    country: country,
                    currency: currency,
                    is_new: is_new,
                    lat: lat,
                    lng, lng
                })
                resolve(body);
            } else {
                reject({error: error, response: response, body: body})
            }
        });
    })    
}

router.get("/mockData", (req, res) => {
    test()
    res.send()
   
    // addItem(title,
    //     description,
    //     categoryID,
    //     price,
    //     location,
    //     postal_code,
    //     picture_url,
    //     country,
    //     currency,
    //     is_new, lat, lng);
}) 

module.exports = router;
