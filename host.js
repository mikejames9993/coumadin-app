'use strict';

var express = require('express');
var path = require('path');

// Read port from shell arguments
var port = process.argv[2] || 3005;

var app = express();

// Statically serve up UI files
app.use(express.static(path.join(__dirname, 'app'), {
	fallthrough: false
}));

// Host the app
app.listen(port, function() {
	console.log("App running on port " + port);
});
