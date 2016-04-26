"use strict";
var request = require("request");

var lib = {
	requireModule: function(path) {
		return require((process.env.APP_DIR_FOR_CODE_COVERAGE || '../') + path);
	},

	requester: function(method, params, cb) {
		var requestOptions = {
			timeout: 30000,
			'uri': params.uri,
			'json': params.body || true
		};
		if(!params.headers){
			params.headers = {};
		}
		params.headers['user-agent'] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36";

		if(params.headers) requestOptions.headers = params.headers;
		if(params.authorization) requestOptions.headers.authorization = params.authorization;
		if(params.qs) requestOptions.qs = params.qs;
		if(params.form !== undefined) requestOptions.form = params.form;

		if(process.env.SOAJS_DEBUG){
			console.log('===========================================================================');
			console.log('==== URI     :', params.uri);
			console.log('==== REQUEST :', JSON.stringify(requestOptions));
		}
		request[method](requestOptions, function(err, response, body) {
			if(process.env.SOAJS_DEBUG) {
				console.log('==== RESPONSE:', JSON.stringify(body));
			}
			return cb(err, body, response);
		});
	}
};
module.exports = lib;