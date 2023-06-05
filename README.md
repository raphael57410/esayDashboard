# Easy Dashboard ⚠️(in progress)⚠️

Dashbord to represent your database mongdb to view your data and delete data

## How does it work?

At the start of the application enter the base url of your api your api must return all your database collections

`db.db.listCollections().toArray();`

![App Screenshot](./public//screenShot/home.png)

## When you've entered your api url
### Things you need to know

    - your route must have the same name as your collection name 

![App Screenshot](./public//screenShot/route.png)
![App Screenshot](./public//screenShot/dashboard.png)