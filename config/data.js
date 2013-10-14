
var fs = require('fs');

var models_path = __dirname + '/app/json';

var years = [];

fs.readdir( models_path, function ( err, files ) {
    console.log(files);
})