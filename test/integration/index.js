"use strict";
var helper = require("../helper.js");
var service, controller;

describe("Initialize & start controller and service", function () {

    before(function (done) {

        done();
    });

    after(function (done) {
        controller = require("soajs.controller");
        setTimeout(function () {
            service = helper.requireModule('./index.js');
            setTimeout(function () {
                require("./all.tests.js");
                done();
            }, 1000);
        }, 1000);
    });
});