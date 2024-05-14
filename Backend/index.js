// server.js (Node.js backend)

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://rajbhosale625:6yOG6qZjtc2hxO8t@cluster0.ilxji3z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Schema
const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
  time: String,
});

// Create Model
const FormData = mongoose.model('FormData', formDataSchema);

// API Endpoint to Save Form Data
app.post('/api/formdata', async (req, res) => {
    try {
      const { name, email, date, time } = req.body;
      const formData = new FormData({
        name,
        email,
        date,
        time,
      });
      console.log('Received form data:', formData); // Log the form data before saving
      await formData.save();
      console.log('Form data saved successfully'); // Log a success message after saving
      res.status(201).json({ message: 'Form data saved successfully' });
    } catch (error) {
      console.error('Error saving form data:', error); // Log any errors that occur
      res.status(500).json({ message: 'Server error' });
    }
  });  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
