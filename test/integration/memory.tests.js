"use strict";
var assert = require("assert");
var _ = require("lodash");
var helper = require("../helper.js");

var servicePort = helper.requireModule('./config.js').servicePort;
var serviceName = helper.requireModule('./config.js').serviceName;

var scenarios = [];

scenarios.push({
	label: "Integration test 1: Get Contact",
	method: 'get',
	tests: [
		{
			skip: false,
			url: '/contact/1?model=memory',
			result: {result: true, data: {"_id": "1","firstName": "John","lastName": "Doe","emails": [{"address": "me@gmail.com","primary": true}],"addresses": [{"address1": "123 cory street","address2": "suite 12","city": "boston","state": "MA","zip": "12345","primary": true}]} },
			body: null,
			bodyForm: null
		}
	]
});

scenarios.push({
	label: "Integration test 1.1: Get Contact wrong or no invalid id",
	method: 'get',
	tests: [
		{
			skip: false,
			url: '/contact/100?model=memory',
			result: {result: true, data: null},
			body: null,
			bodyForm: null
		}
	]
});

scenarios.push({
	label: "Integration test 2: Get Contacts no pagination",
	method: 'get',
	tests: [
		{
			skip: false,
			url: '/contacts?model=memory',
			result: {result: true, data: {"1": {"_id": "1","firstName": "John","lastName": "Doe","emails": [{"address": "me@gmail.com","primary": true}],"addresses": [{"address1": "123 cory street","address2": "suite 12","city": "boston","state": "MA","zip": "12345","primary": true}]}} },
			body: null,
			bodyForm: null
		}
	]
});

scenarios.push({
	label: "Integration test 3: Get Contacts with pagination",
	method: 'get',
	tests: [
		{
			skip: false,
			url: '/contacts?from=0&to=2&model=memory',
			result: {result: true, data: {"1": {"_id": "1","firstName": "John","lastName": "Doe","emails": [{"address": "me@gmail.com","primary": true}],"addresses": [{"address1": "123 cory street","address2": "suite 12","city": "boston","state": "MA","zip": "12345","primary": true}]}} },
			body: null,
			bodyForm: null
		}
	]
});

scenarios.push({
	label: "Integration test 4: match Contacts",
	method: 'get',
	tests: [
		{
			skip: false,
			url: '/contact/match/joh?model=memory',
			result: {result: true, data: {"1": {"_id": "1","firstName": "John","lastName": "Doe","emails": [{"address": "me@gmail.com","primary": true}],"addresses": [{"address1": "123 cory street","address2": "suite 12","city": "boston","state": "MA","zip": "12345","primary": true}]}} },
			body: null,
			bodyForm: null
		}
	]
});

scenarios.push({
	label: "Integration test 5: add 1 new Contact",
	method: 'post',
	tests: [
		{
			skip: false,
			url: '/contact?model=memory',
			result: {result: true, data: true},
			body: {"data": {"firstName": "Jane","lastName": "Doe","emails": [{"address": "jane@gmail.com","primary": true}],"addresses": [{"address1": "123 cory street","address2": "suite 12","city": "boston","state": "MA","zip": "12345","primary": true}]} },
			bodyForm: null
		}
	]
});

scenarios.push({
	label: "Integration test 6: add 3 new Contacts in one call",
	method: 'post',
	tests: [
		{
			skip: false,
			url: '/contact?model=memory',
			result: {result: true, data: true},
			body: {"data": [
				{"firstName": "Jack","lastName": "Doe","emails": [{"address": "jack@gmail.com","primary": true}],"addresses": [{"address1": "123 cory street","address2": "suite 12","city": "boston","state": "MA","zip": "12345","primary": true}]},
				{"firstName": "Jeff","lastName": "Doe","emails": [{"address": "jeff@gmail.com","primary": true}],"addresses": [{"address1": "123 cory street","address2": "suite 12","city": "boston","state": "MA","zip": "12345","primary": true}]},
				{"firstName": "Jess","lastName": "Doe","emails": [{"address": "jess@gmail.com","primary": true}],"addresses": [{"address1": "123 cory street","address2": "suite 12","city": "boston","state": "MA","zip": "12345","primary": true}]}
			] },
			bodyForm: null
		}
	]
});

scenarios.push({
	label: "Integration test 7: update one contact",
	method: 'put',
	tests: [
		{
			skip: false,
			url: '/contact/1?model=memory',
			result: {result: true, data: true},
			body: {"data": {"firstName": "Johnathan","lastName": "Doe","emails": [{"address": "jack@gmail.com","primary": true}],"addresses": [{"address1": "123 cory street","address2": "suite 12","city": "boston","state": "MA","zip": "12345","primary": true}]} },
			bodyForm: null
		}
	]
});

scenarios.push({
	label: "Integration test 7.2: update one contact",
	method: 'put',
	tests: [
		{
			skip: false,
			url: '/contact/100?model=memory',
			result: {result: false, errors: {"codes":[405],"details":[{"code":405,"message":"Error Updating Entry!"}]} },
			body: {"data": {"firstName": "Johnathan","lastName": "Doe","emails": [{"address": "jack@gmail.com","primary": true}],"addresses": [{"address1": "123 cory street","address2": "suite 12","city": "boston","state": "MA","zip": "12345","primary": true}]} },
			bodyForm: null
		}
	]
});

scenarios.push({
	label: "Integration test 8: delete one contact",
	method: 'del',
	tests: [
		{
			skip: false,
			url: '/contact/1?model=memory',
			result: {result: true, data: true},
			body: null,
			bodyForm: null
		}
	]
});

scenarios.push({
	label: "Integration test 8: delete one contact",
	method: 'del',
	tests: [
		{
			skip: false,
			url: '/contact/100?model=memory',
			result: {result: false, errors: {"codes":[403],"details":[{"code":403,"message":"Error Deleting Entry!"}]} },
			body: null,
			bodyForm: null
		}
	]
});

describe('Starting Integration tests', function () {

	// before(function (done) {
	//
	//     done();
	// });
	// after(function (done) {
	//
	//     done();
	// });

	_.forEach(scenarios, function (scenario, index) {
		describe('Testing: ' + scenario.label + ' on service [' + serviceName + '] port [' + servicePort + ']', function () {
			_.forEach(scenario.tests, function (test) {
				var testDescription = 'Testing ' + scenario.method + ' /' + serviceName + test.url;
				if (test.skip) {
					it.skip(testDescription, function (done) {
						done();
					});
				}
				else {
					it(testDescription, function (done) {
						helper.requester(scenario.method, {
							uri: 'http://localhost:' + servicePort + test.url,
							body: test.body,
							form: test.bodyForm
						}, function (err, body) {
							assert.ifError(err);
							assert.deepEqual(body, test.result);
							done();
						});
					});
				}
			});
		});
	});
});