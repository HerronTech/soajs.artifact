'use strict';
var soajs = require('soajs');
var config = require('./config.js');

var service = new soajs.server.service(config);

service.init(function () {

    service.get("/:id", function (req, res) {

        var txt = req.soajs.inputmaskData.id;

        return res.json(req.soajs.buildResponse(null, txt));
    });

    service.start();
});