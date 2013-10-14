var fs = require('fs')
  , path = require( 'path' )
  , _ = require('underscore');
    
exports.get = function (){

    var models_path = __dirname + '/json'
      , filePath = path.normalize( models_path + '/years.json' );
      
      console.log( filePath )
    if ( fs.existsSync( filePath ) && fs.lstatSync( filePath ).isFile() ){
        fs.unlinkSync( filePath );
    } 

    fs.readdir( models_path, function ( err, files ) {
        var years = []
          , temp = []
          , year;
          
        _.each( files, function( file, index ){
            year = parseInt( file.substr( 0,4 ), 10);
            if ( !isNaN( year ) ){
                years.push( year );
            }
        } );
        years.sort();
        
        _.each( years, function ( year, index ) {
            temp[ index ] = {};
            temp[ index ]['name'] = year;
        } );
        
        years = JSON.stringify( temp );
        fs.writeFile( filePath, years, function (err) {
            if (err) throw err;
            console.log('Years gotted!');
        });
    })
}