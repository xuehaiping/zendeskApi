/**
 *  @fileOverview index page and sever set up
 *
 *  @author       Haiping Xue
 *
 *  @requires     NPM:express
 *  @requires     NPM:body-parser
 *  @requires     NPM:ejs
 *  @requires     ./controllers/ticketView
 */

 /**
  * for app
  *
  * @type {Module}
  */
var express = require('express');
var app = express();

/**
 * for ticketView page
 *
 * @type {Module}
 */
app.use('/ticketView', require('./controllers/ticketView'));

var ticketData = new require('./models/tickets');

/**
 * for zendesk api request
 *
 * @type {Module}
 */
var zendesk = require('node-zendesk');

/**
 * to support URL-encoded bodies
 *
 * @type {Module}
 */
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + 'public'));
app.set('views', __dirname +'/views');
app.set('view engine', 'ejs');


// index page, only been called in for first time access or refresh
app.get('/', function (req, res) {
  // only refresh the page when there
  if(ticketData.get() === undefined || req.query.refresh === 'true') {
    // create a zendesk client
    var client = zendesk.createClient({
      username:  'claymoresq@gmail.com',
      token:     'UMqCnddXK8kXp1thNshLa2Wocv7ETUqdytX6Z0Ae',
      remoteUri: 'https://internproject.zendesk.com/api/v2'
    });

    // create a observer to query all tickets
    var observer = {
      error: function(err) {
        console.log("Can not query tickets\n" + err);
        console.error;
        res.render('index', {tickets: null, error: "Some error ouccrs, check the error " + err});
      },
      next: function(status, body, response, result, nextPage) {
        console.log('Next page:', nextPage);
      },
      complete: function(statusList, body, responseList, resultList) {
        console.log('Pagination complete.');
        // cache the tikcets data
        ticketData.set(body);
        //render page with all tickets
        res.render('index', {tickets: ticketData.get(), error: null});
      }
    };

    console.log("Query zendesk api");
    //query the zendesk api
    client.tickets.list(observer);

  }
  // do not query zendesk api for performance
  else {
    console.log("Load old tickets data");
    res.render('index', {tickets: ticketData.get(), error: null});
  }
});

//start service
var server = app.listen(8081, function () {
  var host = "localhost";
  var port = server.address().port;
  console.log("Zendesk API listening at http://%s:%s", host, port);
});

module.exports = server;
