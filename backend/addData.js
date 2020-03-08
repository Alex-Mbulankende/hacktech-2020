const csv = require('csv-parser')
const fs = require('fs')
const request = require('request')
const utils = require("../seed/utils")
const firebase = require("firebase")
const app = firebase.initializeApp(utils.firebaseConfig)

const keypress = async () => {
    process.stdin.setRawMode(true)
    return new Promise(resolve => process.stdin.once('data', () => {
      process.stdin.setRawMode(false)
      resolve()
    }))
  }


  let categoryNames = {
    masks: "257818",
    sanitizer: "177663",
    camping: "159913",
    medicine: "3193"
}

let nameForNumber = {
    "257818": "masks",
    "177663": "sanitizer",
    "159913": "camping",
    "3193": "medicine"
}

test()
async function test() {
    
    const results = [];
    fs.createReadStream('./better.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
        for await (const item of results) {
            console.log(item)
            // await keypress()
            try {
                const url = await addItem(item["title"].substring(0, 50), item["description"], categoryNames[item["category"]], item["price"], item["location"], item["postal_code"], item["picture_url"], item["country"], item["currency"], item["is_new"], item["latitude"], item["longitude"])
                console.log(url)
            } catch(err) {
                console.error(err)
            }
            // await keypress();
        }
        // console.log(data)
    });
}

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