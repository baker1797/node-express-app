var express    = require( 'express' ),
	path       = require( 'path' ),
	handlebars = require( 'express-handlebars' ),
	Log        = require( 'log' );

var app = module.exports = express();


// Create a log for every app request.
app.use( function ( req, res, next ) {
	req.log = new Log( app.get( 'log level' ) );
	next();
} );

// Setup handlebars templates.
var hbs = handlebars.create( {
	extname: 'html',
	defaultLayout: 'main.html',
	layoutsDir: path.join( __dirname, 'templates' ),
	partialsDir: [
		path.join( __dirname, 'templates' )
	]
} );

// view engine setup
app.engine( 'html', hbs.engine );
app.set( 'views', path.join( __dirname, 'templates' ) );
app.set( 'view engine', 'html' );

//Static files
app.use( express.static( 'public' ) );

// Root path route
app.get( '/', function ( req, res ) {
	var model = {
		layout: 'sidebar', // defaults to any extension: layout.{ejs|jade|whatever}
		locals: {			// context for the page.
			menu_items: [ 'Home', 'About', 'Contact', 'Products', 'Help' ],
			players: [
				'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/30583.png&w=350&h=254',
				'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/30836.png&w=350&h=254',
				'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/5383.png&w=350&h=254',
				'http://vigilantebaseball.com/wp-content/uploads/2013/09/billy-hamilton.png',
				'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/31214.png&w=350&h=254'
			]
		}
	};




	res.render( 'sidebar', model );
} );

// Root path route
app.get( '/angular*', function ( req, res ) {
/*
	var model = {
		layout: 'angular', // defaults to layout.(ejs|jade|whatever)
		
	};

	res.render( 'angular', model );
*/
	res.sendfile('./templates/angular.html');
} );


// Home run derby.
app.get( '/derby', function ( req, res ) {
	/*
	handlebars.registerHelper('fullName', function() {
	  return "text";
	});
	*/
	
	res.render( 'derby' );
} );


// Log errors.
app.use( function( err, req, res, next ) {
	req.log.error( err );

	res
		.status( 500 )
		.send( 'TODO: Create an error page' );
} );

