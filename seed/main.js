const utils = require("./utils")

async function main() {
    let eBay = require('ebay-node-client')(utils.key, utils.secret);

    await getOAuthToken(eBay);

    await getUserToken(eBay);
    
    let item = new Item(50, {
        'title': 'Wow I LOVE Testing',
            'description': 'Wow I LOVE Testing. Unopened box.',
            'aspects': {
                'Brand': ['GoPro'],
                'Type': ['Helmet/Action'],
                'Storage Type': ['Removable'],
                'Recording Definition': ['High Definition'],
                'Media Format': ['Flash Drive (SSD)'],
                'Optical Zoom': ['10x']
            },
            'brand': 'GoPro',
            'mpn': 'CHDHX-401',
            'imageUrls': [
                'http://i.ebayimg.com/images/i/182196556219-0-1/s-l1000.jpg',
                'http://i.ebayimg.com/images/i/182196556219-0-1/s-l1001.jpg',
                'http://i.ebayimg.com/images/i/182196556219-0-1/s-l1002.jpg'
            ]
        }
    );

    await addItem(item, eBay);
}

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

async function getUserToken(eBay) {
    eBay.setUserToken(utils.USER_TOKEN);
}

class Item {
    constructor(amount, productData) {
        this.formatted = {
            'availability': {
                'shipToLocationAvailability': {
                    'quantity': amount
                }
            },
            'condition': 'NEW',
            'product': productData
        };
        this.sku = `${Math.floor(Math.random()*100000000000000)}`
    }
}

async function addItem(item, eBay) {
    try {
        console.log(item.sku)
        var response = await eBay.inventory.createOrReplaceInventoryItem(item.sku, item.formatted);
        console.log('response', response);
        response = await eBay.inventory.getInventoryItems({limit: "100"});
        console.log('response ', response);
    } catch (error) {
        console.log('error ', error);
        return;
    }  
}

main();