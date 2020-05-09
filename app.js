const express = require('express');
const connectDB = require('./config/db');
const shortUrl = require('./models/shortUrl');

// start express server
const app = express();

// connect MongoDB Cloud Atlas database
connectDB();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(express.json({ extended: false }));

// define Routes
// app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const localPort = 5002;

app.get('/', async (req, res) => {
    const shortUrls = await shortUrl.find();
    res.render('index', { shortUrls });
});

app.get('/:ref', async (req, res) => {
    const redirect = await shortUrl.findOne({ short: req.params.ref });
    if (redirect == null) return res.sendStatus(404);

    redirect.clicks++;
    redirect.save();

    res.redirect(redirect.target);
});

app.listen(process.env.PORT || localPort, () =>
    // eslint-disable-next-line no-console
    console.log(`Server started on port ${localPort}.`)
);

// console.log('working'); TODO: remove for production
