
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://bhanupratap04123:VJ05ZVFIj0CBjWUl@cluster0.eyfrwj5.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });