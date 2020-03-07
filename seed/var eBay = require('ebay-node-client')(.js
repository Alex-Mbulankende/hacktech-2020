var eBay = require('ebay-node-client')('RonakSha-Pic2List-SBX-416e557a4-e335a4b9', 'SBX-16e557a4a4f0-2bdb-4ddf-89df-81a9');
async function main() {
    try {
        var token = await eBay.application.getOAuthToken({
            grant_type: 'client_credentials',
            scope: 'https://api.ebay.com/oauth/api_scope'
        });
        console.log(token)
        eBay.setToken(token.access_token);
    } catch (error) {
        console.log('error ', error);
        return;
    }

}
main()