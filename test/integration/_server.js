"use strict";
var assert = require('assert');
var shell = require('shelljs');
var utilities = require("soajs.utilities/loc.js");

describe("importing sample data", function () {
	
	it("do import", function (done) {
		shell.pushd(utilities.dir);
		process.env.SOAJS_PROFILE = utilities.dir + "/data/artifact/profile.js";
		
		shell.exec("node index.js -f artifact", function (code) {
			assert.equal(code, 0);
			shell.popd();
			done();
		});
	});
	
	it("Run Tests", function (done) {
		require(__dirname + "/index.js");
		done();
	});
});
