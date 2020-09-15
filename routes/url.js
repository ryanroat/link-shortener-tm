/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const express = require('express');
const methodOverride = require('method-override');
const validUrl = require('valid-url');
// const config = require('config');

const router = express.Router();
router.use(methodOverride('_method'));

const shortUrl = require('../models/shortUrl');
const { route } = require('.');

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

// @route   POST /api/url/delete
// @desc    Test post of delete button route

router.post('/delete', async (req, res) => {
  const entry = await shortUrl.findOne({ short: req.body.delete });
  const url = new URL(entry.target);
  console.log('delete requested');
  console.log(url.hostname + url.pathname);
  const deleted = await shortUrl.findOne({ short: req.body.delete });
  console.log(deleted);
  res.render('delete', { entry });
});

// @route   DELETE /api/url/delete
// @desc    Test delete method call of confirm delete button route

router.delete('/delete/:url', async (req, res) => {
  const { url } = req.params;
  console.log('deleteing', url);
  const deleted = await shortUrl.findOneAndDelete({ short: url });
  res.redirect('/');
});

// @route   POST /api/url/edit
// @desc    Test post of edit button route

router.post('/edit/:url', async (req, res) => {
  const entry = await shortUrl.findOne({ short: req.params.url });
  console.log('edit requested');
  res.render('edit', { entry });
});

// @route   PUT /api/url/edit
// @desc    Test put of edit view submit button route

router.put('/edit/:url', async (req, res) => {
  console.log('update requested');
  console.log(req.params.url);
  const { updateShort } = req.body;
  console.log(updateShort);
  let entry = await shortUrl.findOne({ short: updateShort });
  if (entry) {
    console.log('in use');
    // TODO: need a message to user here that new short url is not available??
    console.log(entry);
    res.redirect(307, `${req.params.url}`);
  } else {
    console.log('available');
    entry = await shortUrl.findOne({ short: req.params.url });
    entry.short = updateShort;
    await entry.save();
    console.log('updated');
    console.log(entry);
    res.redirect('/');
  }
});

module.exports = router;
