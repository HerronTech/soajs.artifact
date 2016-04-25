"use strict";
var assert = require("assert");
var _ = require("lodash");
var helper = require("../helper.js");

var servicePort = helper.requireModule('./config.js').servicePort;
var serviceName = helper.requireModule('./config.js').serviceName;

var scenarios = [];

scenarios.push({
    label: "Integration test 1",
    method: 'get',
    tests: [
        {skip: false, url: '/ping?user=john', result: {result: true, data: {user: 'john'}}, body: null, bodyForm: null}
    ]
});





describe('Starting Integration tests', function () {

    before(function (done) {

        done();
    });
    after(function (done) {

        done();
    });

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
                    helper.requester(scenario.method, {
                        uri: 'http://localhost:' + servicePort + '/' + test.url,
                        body: test.body,
                        form: test.bodyForm
                    }, function (err, body) {
                        assert.ifError(err);
                        assert.deepEqual(body, test.result);
                        done();
                    });
                }
            });
        });
    });
});