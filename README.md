# RestFulApi-Lab2-421

Endpoints:

Customer : 
To create a customer: use the post localhost:3000/customers
Enter the name of the customer and his/her age in the following format
{
    "name":"joshua"
    "age":"19"
}
success code: 201 (created)
any other code indicates error (400 - invalid input, 500 - internal server errors)
To retrieve all customers in the database: use the get localhost:3000/customers
success code: 200
any other code indicates error (500 - internal server error)
To delete a customer: use the delete localhost:3000/customers
To update a customer: use the update localhost:3000/customers

Items: 
To create an Item: use the post localhost:3000/items
Enter the Name of the item, and its description in the following format
{
    "name":"baseball"
    "description":"part of the baseball kit"
}
success code: 201 (created)
any other code indicates error (400 - invalid input, 500 - internal server errors)
To retrieve all the available items in the database: use the get localhost:3000/orders
success code: 200
any other code indicates error (500 - internal server error)
To delete an Item: use the delete localhost:3000/items
To update an Item: use the update localhost:3000/items

Orders:
To create an order: use the post localhost:3000/orders
Enter the valid ids of the customer who is going to buy and the item he/she wants and the quantity desired in the following format
{
    "customerId":"ewrqw4231kjbn124kj214"
    "itemId":"2kj1223414bkjb23432kj"
    "quantity":"22"
}
success code: 201 (created)
any other code indicates error (400 - invalid input, 500 - internal server errors)
To retrieve all placed orders in the database: use the get localhost:3000/orders
success code: 200
any other code indicates error (500 - internal server error)
To delete an order: use the delete localhost:3000/orders
To update an order: use the update localhost:3000/orders
