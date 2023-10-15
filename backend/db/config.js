
import mongoose from "mongoose";

var MONGODB_URL = "mongodb+srv://bhanupratap04123:ADYB$d-uT9YeYWi@cluster0.eyfrwj5.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });