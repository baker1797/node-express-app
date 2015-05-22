/**
 * Sandbox for canvas testing.
 */

$(document).ready(function() {
	var canvas,
	    context,
	    raf;

	var activeRoutine = ballPit;

	function init() {
		canvas = $('#sandboxCanvas')[0];
		if ( canvas ) {
			context = $('#sandboxCanvas')[0].getContext( '2d' );
		}

		if ( context ) {
			console.info('found canvas');
		} else {
			console.warn( 'no canvas was found' );
			return;
		}

		// Stop / start the animation
		$( '#stopRAF' ).on( 'click', function() {
			window.cancelAnimationFrame( raf );
		});

		$( '#startRAF' ).on( 'click', function() {
			raf = window.requestAnimationFrame( activeRoutine );
		});

		// Canvas routine inits.
		//drawClock();
		ballPit();
	}

	var ball = {
		x: 100,
		y: 100,
		vX: 5,
		vY: 2,
		radius: 25,
		color: 'red',
		draw: function() {
			context.beginPath();
			context.arc( this.x, this.y, this.radius, 0, Math.PI * 2, true );
			context.closePath();
			context.fillStyle = this.color;
			context.fill();
		}
	};

	function drawClock() {
		context.save();
		context.clearRect(0, 0, 600, 400);
		context.translate(300, 200);
		context.lineCap = 'butt';
		context.lineWidth = 4;
		context.save();

		// Hours.
		for ( var i=0; i < 12; i++ ){
			context.beginPath();
			context.rotate( Math.PI / 6 );
			context.moveTo(100, 0);
			context.lineTo(80, 0);
			context.stroke();
		}
		context.restore();
		context.save();

		// Reset to sort of the top
		context.rotate(-Math.PI / 2 );

		var time = new Date();
		
		// Minutes.
		context.lineWidth = 1;
		for ( var i=0; i < 60; i++ ) {

			context.beginPath();
			spinVariance = 60;
			context.rotate( ( Math.PI / 30 ) * time.getSeconds() / spinVariance );
			context.moveTo(90, -20);
			context.lineTo(80, 0);

			context.moveTo(80, 0);
			context.lineTo(60, 20);

			context.moveTo(60, -20);
			context.lineTo(40, 0);

			context.moveTo(40, 0);
			context.lineTo(5, 20);
			context.stroke();
		}
		context.restore();


		context.restore();
		window.requestAnimationFrame( drawClock );
	}

	function ballPit() {
		//context.clearRect( 0, 0, canvas.width, canvas.height );
		
		//Trail Effect.
		//context.fillStyle = 'rgba(80,80,80,0.3)';
		//context.fillRect(0,0,canvas.width,canvas.height);

		ball.draw();

		if ( ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0 ) {
			ball.vX *= -1;
		}
		if ( ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0 ) {
			ball.vY *= -1;
		}

		// Velocity.
		ball.x += ball.vX;
		ball.y += ball.vY;

		// Accel.
		ball.vY *= .99;
		ball.vY += .25;

		raf = window.requestAnimationFrame( ballPit );
	}


	// clear

	// save

	// draw

	// restore

	init();
});