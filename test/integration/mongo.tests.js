"use strict";
var assert = require("assert");
var _ = require("lodash");
var helper = require("../helper.js");

var Mongo = require('soajs').mongo;
var dbConfig = require("./db.config.test.js");
var myDBConfig = dbConfig();
myDBConfig.name = "myContacts";
var mongo = new Mongo(myDBConfig);

var servicePort = helper.requireModule('./config.js').servicePort;
var serviceName = helper.requireModule('./config.js').serviceName;

var dbRecords = [];

describe('Starting Integration tests', function () {

	before(function (done) {
		mongo.remove('records',{}, function(error){
			assert.ifError(error);
	        done();
		});
	});
	
	beforeEach(function(done){
		mongo.find('records',{}, function(error, data){
			assert.ifError(error);
			dbRecords = data;
			done();
		});
	});

	describe("Testing Add", function(){
		it("add 1 new Contact", function(done){

			helper.requester("post", {
				uri: 'http://localhost:' + servicePort + '/contact?model=mongo',
				body: {"data": {"firstName": "Jane","lastName": "Doe","emails": [{"address": "jane@gmail.com","primary": true}],"addresses": [{"address1": "123 cory street","address2": "suite 12","city": "boston","state": "MA","zip": "12345","primary": true}]} },
				form: null
			}, function (err, body) {
				assert.ifError(err);
				assert.deepEqual(body, {result: true, data: true});
				done();
			});
		});

		it("add 3 new Contacts in one call", function(done){
			helper.requester("post", {
				uri: 'http://localhost:' + servicePort + '/contact?model=mongo',
				body: {"data": [
					{"firstName": "Jack","lastName": "Doe","emails": [{"address": "jack@gmail.com","primary": true}],"addresses": [{"address1": "123 cory street","address2": "suite 12","city": "boston","state": "MA","zip": "12345","primary": true}]},
					{"firstName": "Jeff","lastName": "Doe","emails": [{"address": "jeff@gmail.com","primary": true}],"addresses": [{"address1": "123 cory street","address2": "suite 12","city": "boston","state": "MA","zip": "12345","primary": true}]},
					{"firstName": "Jess","lastName": "Doe","emails": [{"address": "jess@gmail.com","primary": true}],"addresses": [{"address1": "123 cory street","address2": "suite 12","city": "boston","state": "MA","zip": "12345","primary": true}]}
				] },
				form: null
			}, function (err, body) {
				assert.ifError(err);
				assert.deepEqual(body, {result: true, data: true});
				done();
			});
		});
	});

	describe("Testing Get", function(){
		it("get 1 Contact", function(done){
			var expected = dbRecords[0];
			expected._id = expected._id.toString();
			helper.requester("get", {
				uri: 'http://localhost:' + servicePort + '/contact/' + dbRecords[0]._id.toString() + '/?model=mongo',
				body: null,
				form: null
			}, function (err, body) {
				assert.ifError(err);
				assert.deepEqual(body, {result: true, data: expected});
				done();
			});
		});

		it("wrong id", function(done){
			helper.requester("get", {
				uri: 'http://localhost:' + servicePort + '/contact/' + new mongo.ObjectId().toString() + '/?model=mongo',
				body: null,
				form: null
			}, function (err, body) {
				assert.ifError(err);
				assert.deepEqual(body, {result: true, data: null});
				done();
			});
		});
	});

	describe("Testing List", function(){
		it("no pagination", function(done){
			helper.requester("get", {
				uri: 'http://localhost:' + servicePort + '/contacts?model=mongo',
				body: null,
				form: null
			}, function (err, body) {
				assert.ifError(err);
				assert.equal(body.data.length, 4);
				done();
			});
		});

		it("yes pagination", function(done){
			helper.requester("get", {
				uri: 'http://localhost:' + servicePort + '/contacts?model=mongo',
				body: null,
				form: null
			}, function (err, body) {
				assert.ifError(err);
				assert.equal(body.data.length , 4);
				done();
			});
		});
	});

	describe("Testing match", function(){
		it("Integration test 4: match Contacts", function(done){
			var q = dbRecords[0].firstName.substr(0,3);
			dbRecords[0]._id = dbRecords[0]._id.toString();
			helper.requester("get", {
				uri: 'http://localhost:' + servicePort + '/contact/match/' + q + '?model=mongo',
				body: null,
				form: null
			}, function (err, body) {
				assert.ifError(err);
				assert.deepEqual(body, {result: true, data: [dbRecords[0]] });
				done();
			});
		});
	});

	describe("Testing update", function(){
		it("valid", function(done){
			helper.requester("put", {
				uri: 'http://localhost:' + servicePort + '/contact/' + dbRecords[0]._id.toString() + '/?model=mongo',
				body: {"data": {"firstName": "Johnathan","lastName": "Doe","emails": [{"address": "jack@gmail.com","primary": true}],"addresses": [{"address1": "123 cory street","address2": "suite 12","city": "boston","state": "MA","zip": "12345","primary": true}]} },
				form: null
			}, function (err, body) {
				assert.ifError(err);
				assert.deepEqual(body, {result: true, data: true});
				done();
			});
		});

		it("invalid", function(done){
			helper.requester("put", {
				uri: 'http://localhost:' + servicePort + '/contact/' + new mongo.ObjectId().toString() + '/?model=mongo',
				body: {"data": {"firstName": "Johnathan","lastName": "Doe","emails": [{"address": "jack@gmail.com","primary": true}],"addresses": [{"address1": "123 cory street","address2": "suite 12","city": "boston","state": "MA","zip": "12345","primary": true}]} },
				form: null
			}, function (err, body) {
				assert.ifError(err);
				assert.deepEqual(body, {result: false, errors: {"codes":[405],"details":[{"code":405,"message":"Error Updating Entry!"}]} });
				done();
			});
		});
	});

	describe("Testing delete", function(){
		it("valid", function(done){
			helper.requester("del", {
				uri: 'http://localhost:' + servicePort + '/contact/' + dbRecords[0]._id.toString() + '/?model=mongo',
				body: null,
				form: null
			}, function (err, body) {
				assert.ifError(err);
				assert.deepEqual(body, {result: true, data: true});
				done();
			});
		});

		it("invalid", function(done){
			helper.requester("del", {
				uri: 'http://localhost:' + servicePort + '/contact/' + new mongo.ObjectId().toString() + '/?model=mongo',
				body: null,
				form: null
			}, function (err, body) {
				assert.ifError(err);
				assert.deepEqual(body, {result: false, errors: {"codes":[403],"details":[{"code":403,"message":"Error Deleting Entry!"}]} });
				done();
			});
		});
	});
});