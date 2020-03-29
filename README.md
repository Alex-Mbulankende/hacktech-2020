## Inspiration

When a zone gets quarantined, we are trapped; cut off from the outside world. This makes it very difficult for the people living there to obtain the supplies that they need to survive. What our app helps doing is provide a live map through Esri's ArcGIS with all eBay listings with the items that you may need to better fight the coronavirus. You can also contribute helping others by selling items in excess that you don't need. Our app will also help you figure what is the current item situation and what you should sell based on that. This helps the community be united during this hard moments. Usually, diseases like this force us to stay distant - Coronally allows us to come *together* to fight the coronavirus.

<div align='center'>
<img height="350px" width="350px" src="https://user-images.githubusercontent.com/32719891/76167655-8d44c500-6125-11ea-96cc-276d756dae25.png" />
</div>

## What it does
Buyers use Coronally to buy listings of items nearby and Sellers use Coronally to sell recommended listings to them.

Coronally utilizes the eBay platform to connect community members to each other. Users in need of supplies use the app to browse supplies on an Esri ArcGIS Map that are near to them — and thus inside their quarantine — and pickup supplies that will help them.

Users who wish to help their community can use the insights generated from the activity on the platform to sell the items that the community needs. 

Additionally, because of all this data that is being processed through the platform, as well as important decisions being made using it (such as selling vital supplies and going to pickup items), we thought it prudent to integrate important data regarding the Coronavirus Crisis with our own insights to create the Coronally Dashboard.

![Coronally Buyer Tab](https://user-images.githubusercontent.com/32719891/76167540-9da87000-6124-11ea-9bee-e55434762b06.png)
_People can see listings of essential items in their local area. This allows people to trade in areas where there are lack of supplies in grocery stores and markets._

## How we built it
This app would not have been possible without the use of eBay and Esri. eBay serves as the critical platform to connect community members with each other, and Esri's ArcGIS provides a seamless interface for users to find the listings closest to them.

Using Express.js and Python with eBay's REST and SOAP APIs + Firebase to store analytics data, we developed a REST api for our frontend to interact with the platforms. 

Pulling this data, our frontend used Esri's ArcGIS to plot the listings closest to the user via React and Redux. Additionally, the frontend pulls insights from our backend platform to power our analytics dashboard.

## Challenges we ran into
The major challenges we faced in the backend were predominantly related to understanding the documentation and APIs available for eBay. Other minor issues where in sending the data to the servers and parse it correctly. On the front end side, a good chunk of time has been spent on designing the interface to be immediate and response. A big challenge for the front end was learning how to use Esri's ArcGIS to plot all the listings from eBay

We also ran into issues in simulating a quarantined city in Italy. We were unfortunately unable to get our code to work for Italy in Sandbox mode, and instead pivoted to simulating a city

![](https://user-images.githubusercontent.com/32719891/76167586-e6f8bf80-6124-11ea-9534-3c9c71b362e7.png)
_Our project relied heavily on Ebay's API. We made it possible to list items on Ebay directly through our app and utilized Ebay to collect listings._

## Accomplishments that we're proud of
We're really proud we managed to get a working demo of what the future Coronally will be. We are also proud that we managed to use all the cool stuff we wanted to use :)


## What's next for Coronally
The Coronavirus Crisis is constantly developing, and we want to make sure Coronally adapts to meet the crisis. We think that in the future, Quarantines could become too strong to even allow people to exit their houses. However, this shouldn't prohibit communities from being able to help each other. We could potentially integrate Coronally and eBay's local pickup with Drone Delivery to let users get supplies without having to leave their houses.
