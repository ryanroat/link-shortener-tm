const express = require('express');
const connectDB = require('./config/db');

// start express server
const app = express();

// connect MongoDB Cloud Atlas database
connectDB();

app.use(express.json({ extended: false }));

const localPort = 5002;

app.listen(process.env.PORT || localPort, () =>
    // eslint-disable-next-line no-console
    console.log(`Server started on port ${localPort}.`)
);

// console.log('working'); TODO: remove for production
