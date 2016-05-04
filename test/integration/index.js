"use strict";
var helper = require("../helper.js");
var service;

describe("Initialize & start controller and service", function () {

    before(function (done) {
        done();
    });

    it("Starting Integration tests ...", function (done) {
        service = helper.requireModule('./index.js');
        setTimeout(function () {
            require("./memory.tests.js");
            require("./mongo.tests.js");
            done();
        }, 1000);
    });
});