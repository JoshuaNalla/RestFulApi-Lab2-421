const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// for the swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;


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
                url: `http://localhost:${PORT}`,
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
    apis: ['./routes/*.js'], // Path to your API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://jmn6092:Joshua%40123@lab2-take2.ehfku.mongodb.net/?retryWrites=true&w=majority&appName=Lab2-take2', {
  useNewUrlParser: true,
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
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

