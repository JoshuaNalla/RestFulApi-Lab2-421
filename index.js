const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// for the swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 4000;


   // Swagger definition
   const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`, // this should be 4000
            },
        ],
   components: {
     securitySchemes: {
         bearerAuth: {
             type: 'http',
             scheme: 'bearer',
             bearerFormat: 'JWT', 
         },
     },
 },
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Middleware
app.use(bodyParser.json());

// MongoDB Connection
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb://localhost:27017/Lab4system';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser:    true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const itemsRouter = require('./routes/items');
const customerRouter = require('./routes/customers');
const orderRouter = require('./routes/orders')
app.use('/items', itemsRouter);
app.use('/customers', customerRouter);
app.use('/orders', orderRouter);

// Start the server
app.listen(3000, () => { // the server should run on port 3000
  console.log(`Server is running on port ${3000}`);
});

// introduced asynch operation using setTimeout
const delayedOperation = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Asynchronous operation introduced, and completed with 2 seconds delay')
      resolve();
    }, 2000); // the seconds changed here
  })
};

// new endpoint to test the async operation
app.get('/delayed', async (req, res) => {
  try {
    console.log('initiliazing async operation...');
      await delayedOperation();
      res.send('async operation completed successfully after two seconds (delay introduced)');
  } catch (error){
    console.log("error", error);
  }
});

