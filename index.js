const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); 

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit the process with failure
    }
    console.log('MySQL Connected...');
});

app.use('/api/auth', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
