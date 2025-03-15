const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

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
app.use('/items', itemsRouter);

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