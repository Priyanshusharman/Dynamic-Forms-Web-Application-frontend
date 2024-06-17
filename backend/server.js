const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database'); // Database configuration
const Form = require('./models/Form'); // Sequelize model

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Sync Database
sequelize.sync().then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.log('Error: ' + err);
});

// API routes
const formRoutes = require('./routes/forms');
app.use('/api/forms', formRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
