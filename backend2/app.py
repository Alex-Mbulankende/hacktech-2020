import json

from flask import Flask, request, make_response
from add_item import add_item, Item, make_item_url

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Front end sucks!'


@app.route('/additem', methods=['POST'])
def add_message():
    jc = json.loads(request.data)
    item = Item(
        title=jc["title"],
        description=jc["description"],
        categoryID=jc["categoryID"],
        price=jc["price"],
        location=jc["location"],
        postal_code=jc["postal_code"],
        picture_url=jc["picture_url"],
        country=jc["country"],
        currency=jc["currency"],
        is_new=jc["is_new"],
    )
    result = add_item(item.build_item())
    if result:
        return make_response(make_item_url(result), 200)
    else:
        return make_response("Duplicate", 400)


if __name__ == '__main__':
    app.run(port=5000, host="127.0.0.1")
