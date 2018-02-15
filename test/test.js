/**
 *  @fileOverview test with mocha framework
 *
 *  @author       Haiping Xue
 *
 *  @requires     NPM:supertest
 *  @requires     NPM:express
 *  @requires     NPM:chai
 *  @requires     NPM:nock
 *  @requires     NPM:should
 *  @requires     ./response
 */

/**
  * for http request
  *
  * @type {Module}
*/
var request = require('supertest')

var express = require('express');

/**
  * for start server
  *
  * @type {Module}
*/
var app = require('../app/server');

/**
  * for expect
  *
  * @type {Module}
*/
var chai = require('chai')
var expect = chai.expect;

/**
  * for mock zendesk api response
  *
  * @type {Module}
*/
var nock = require('nock');

/**
  * dummy data for test
  *
  * @type {Module}
*/
var testResponse = require('./response');

/**
  * for check html content
  *
  * @type {Module}
*/
var should = require('should');

// refresh opration test
describe('Refresh page', function() {

  it("Index page renders successfully for pressing refresh button", function(done) {
    //mock http request for zen desk
    nock('https://internproject.zendesk.com')
      .get('/api/v2/tickets.json')
      .reply(200, function (uri, requestBody) {
        return  testResponse;
      });

    request(app).get('/')
      .query({ refresh: 'true' })
      .expect(200, done)
      .end(
        function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.text).to.be.a('string');
          done();
        });
  })
});

// select page test
describe('Click and open a ticket page, then go to a detail ticket page', function() {

  it("Index page renders successfully for go to index page", function(done) {
    //mock http request for zen desk
    nock('https://internproject.zendesk.com')
      .get('/api/v2/tickets.json')
      .reply(200, function (uri, requestBody) {
        return  testResponse;
      });

    request(app).get('/')
      .expect(200, done)
      .end(
        function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.text).to.be.a('string');
          // should promote success alert
          res.text.should.match(/class="alert alert-success/);
          // should match dummy data subject
          res.text.should.match(/Sample ticket: Meet the ticket/);
          done();
        });
  })

  it("Open a ticket detail page successfully", function(done) {
    request(app)
      .post('/ticketView')
      .type("form")
      .send({"ticketKey": 0})
      .expect(200, done)
      .end(
        function(err, res) {
          expect(res.statusCode).to.equal(200);
          // every ticket should have key fields for tickets
          res.text.should.match(/subject/);
          res.text.should.match(/description/);
          res.text.should.match(/url/);
          done();
        });
  });
});
