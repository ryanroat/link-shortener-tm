/* eslint-disable linebreak-style */
const express = require('express');
const validUrl = require('valid-url');
// const config = require('config');

const router = express.Router();

const shortUrl = require('../models/shortUrl');

// @route   POST /api/url/shorten
// @desc    Create short url object from submitted long url target

router.post('/shorten', async (req, res) => {
  // get target url from req body here
  // TODO: could / should this be done in schema?
  // const domainRoot = config.get('domainRoot');

  // check domainRoot url is valid ?  WHY ?
  // check code here

  // short id url code generated in schema when target added to DB

  // check sumbitted target url for validity
  if (validUrl.isUri(req.body.target)) {
    try {
      const url = await shortUrl.findOne({ target: req.body.target });

      if (url) {
        // res.json(url);
        // alert('exists');
        res.redirect('/');
      } else {
        await shortUrl.create({ target: req.body.target });
        res.redirect('/');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json('server error');
    }
  }

  // check valid target already in DB
});

// @route   GET /api/url/delete
// @desc    Test get of delete button

router.get('/delete', async (req, res) => {
  const shortUrls = await shortUrl.find();
  console.log('delete requested');
  res.render('delete', { shortUrls });
});

module.exports = router;
