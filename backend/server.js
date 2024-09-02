require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const cors = require('cors');
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://talha:talha@cluster0.1lmmm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
