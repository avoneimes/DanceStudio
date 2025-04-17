const express = require('express'); // Node.js require funkcija importuoja express biblioteka
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// nustatomi endpointai (marsrutai)
const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);

// prisijungiama prie mongo dumobazes
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
    })
    .catch(err => console.error(err));
