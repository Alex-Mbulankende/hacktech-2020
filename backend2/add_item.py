# -*- coding: utf-8 -*-

import os
import sys
import datetime
from optparse import OptionParser

sys.path.insert(0, '%s/../' % os.path.dirname(__file__))

from samples.common import dump

import ebaysdk
from ebaysdk.exception import ConnectionError
from ebaysdk.trading import Connection as Trading

"""
Item example: 
    item = Item(
        title="A  cat dancing on the ground",
        description="Well, it's dancing",
        categoryID="257818",
        price="500.0",
        location="9450 Gilman Drive, La Jolla",
        picture_url="https://static.boredpanda.com/blog/wp-content/uploads/2018/11/funny-dancing-cats-101-5bf08f6996330__700.jpg",
    )
"""
class Item:

    def __init__(
            self, title, description, categoryID, price, location, postal_code, picture_url, country="US",
            currency="USD", is_new=True,
    ):
        self.location = location
        self.postal_code = postal_code
        self.picture_url = picture_url
        self.currency = currency
        self.country = country
        self.price = price
        self.categoryID = categoryID
        self.title = title
        self.description = description
        self.conditionid = str(1000 if is_new else 3000)

    def build_item(self):
        return {
            "Item": {
                "ConditionID": self.conditionid,
                "CategoryMappingAllowed": "true",
                "Title": self.title,
                "Description": self.description,
                "PrimaryCategory": {"CategoryID": self.categoryID},
                "ListingType": "FixedPriceItem",
                "StartPrice": self.price,
                "ListingDuration": "GTC",
                "Country": self.country,
                "Site": self.country,
                "Currency": self.currency,
                "ShipToLocations": "None",
                "PaymentMethods": "PayPal",
                "PayPalEmailAddress": "frontend@sucks.com",
                "PictureDetails": {
                    "PictureURL": self.picture_url
                },
                "Location": self.location,
                "PostalCode": self.postal_code,
                "Quantity": "1",
                "ReturnPolicy": {
                    "ReturnsAcceptedOption": "ReturnsAccepted",
                    "RefundOption": "MoneyBack",
                    "ReturnsWithinOption": "Days_30",
                    "Description": "If you are not satisfied, return the item for refund.",
                    "ShippingCostPaidByOption": "Buyer"
                },
                "SellerProfiles": {
                    "SellerPaymentProfile": {
                        "PaymentProfileName": "PayPal:Immediate pay",
                    },
                    "SellerReturnProfile": {
                        "ReturnProfileName": "30 Day Return Policy",
                    },
                    "SellerShippingProfile": {
                        "ShippingProfileName": "USPS First Class, Priority, Priority Express Flat Rate Envelope",
                    }
                },
            },
        }


def add_item(item):
    """http://www.utilities-online.info/xmltojson/#.UXli2it4avc
    """

    try:
        api = Trading(config_file=os.path.join("ebay.yaml"), domain="api.sandbox.ebay.com")
        api.execute('AddItem', item)
        return dump(api, full=True)

    except ConnectionError as e:
        print(e)
        print(e.response.dict())


def make_item_url(response):
    return "http://cgi.sandbox.ebay.com/ws/eBayISAPI.dll?ViewItem&item=" + response.ItemID


if __name__ == "__main__":
    print("Trading API Samples for version %s" % ebaysdk.get_version())
    item = Item(
        title="a danca the ground",
        description="Well",
        categoryID="257818",
        price="500.0",
        location="9450 Gilman Drive, La Jolla",
        postal_code="10001",
        picture_url="https://galleryplus.ebayimg.com/ws/web/333535832003_4_0_1/225x225.jpg",
    )
    response = add_item(item.build_item())
    if response:
        print (make_item_url(response))
