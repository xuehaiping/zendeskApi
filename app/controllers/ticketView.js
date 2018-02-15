/**
 *  @fileOverview Detail ticket information page.
 *
 *  @author       Haiping Xue
 *
 *  @requires     NPM:express
 *  @requires     NPM:body-parser
 *  @requires     NPM:ejs
 */

// require tickets for ticket data
var ticketData = require('../models/tickets');

var express = require('express');
var router = express.Router();

/**
 * to use ejs
 *
 * @type {Module}
 */
var ejs = require('ejs');

/**
 * to support URL-encoded bodies
 *
 * @type {Module}
 */
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

//handles post request for starting the game
router.post('/', function(req, res) {

  console.log("Get request ticketKey: " + req.body.ticketKey);

  if(ticketData.get() === undefined) {
    res.render('ticketView', {ticket: {Error: 'This tickets infomation is not available.'}});
  }
  else {
    res.render('ticketView', {ticket:ticketData.get()[req.body.ticketKey]});
  }
});

module.exports = router;
