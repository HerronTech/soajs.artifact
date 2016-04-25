"use strict";
var helper = require("../helper.js");
var service;

describe("Initialize & start controller and service", function () {

    before(function (done) {

        done();
    });

    after(function (done) {
        service = helper.requireModule('./index.js');
        setTimeout(function () {
            require("./all.tests.js");
            done();
        }, 1000);
    });
});