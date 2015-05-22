 jQuery(document).ready(function() {

 	/* Vars */
	var $ = jQuery,
		$derbyCanvas,
		$pitchCanvas,
	    pitchCtx,
	    derbyCtx,
		pitch,
		raf,
		activeRoutine = drawPitch
		homerunTotal  = 0;


	/* Init Canvas Controllers */
 	function init() {
	 	$( '#startGame' ).on( 'click', drawStrikezone );
	 	$( '#bg_switcher' ).on( 'click', bgSwitcher );
		$( '#btn-pitch-js' ).on( 'click', initPitch );

		$derbyCanvas = $( '#derbyCanvas' );
		derbyCtx     = $derbyCanvas[0].getContext('2d');
		$pitchCanvas = $( '#pitchCanvas' );
		pitchCtx     = $pitchCanvas[0].getContext('2d');

		// Mouse Listener.
		$pitchCanvas[0].addEventListener('click', function( event ) {
			var mousePos = getMousePos( pitchCanvas, event );
			console.log( 'Mouse position: ' + Math.round( mousePos.x ) + ',' + mousePos.y );


			if ( pitch && mousePos.x > pitch.x && mousePos.x < pitch.x + pitch.distance * .8 ) {

				if ( pitch && mousePos.y > pitch.y && mousePos.y < pitch.y + pitch.distance * .8 ) {
					console.log('ya');
					homerunTotal++;
					pitchCtx.fillStyle = 'green';
					pitchCtx.fill();
					drawHomeRun();
				}
			}
		}, false);

		// Stop / start the animation
		$( '#stopRAF' ).on( 'click', function() {
			window.cancelAnimationFrame( raf );
		});

		$( '#startRAF' ).on( 'click', function() {
			raf = window.requestAnimationFrame( activeRoutine );
		});
 	}

	var Pitch = function( x, y, dX, dY, s, n ) {
		this.x         = x;
		this.y         = y;
		this.dX        = dX;
		this.dY        = dY;
		this.distance  = s;
		this.pitchType = n;
	};

	function initPitch() {
		console.log('initPitch');

		if ( Math.random() > .5 ) {	
			//Curve.
			pitch = new Pitch( 270, 160, trajXY( 4, -1 ), trajXY( 6, 1 ), 0, 'curveball' );
		} else {
			//Fastball.
			pitch = new Pitch( posXY( 240, 360 ), posXY( 200, 280 ), 1, 2, 0, 'fastball' );
		}
		drawPitch();
	}

	function drawStrikezone() {
		// Strike zone.
		derbyCtx.beginPath();
		derbyCtx.lineWidth = "4";
		derbyCtx.strokeStyle = "black";
		derbyCtx.fillStyle = "rgba(255, 255, 255, 1)";

		// Redo with Path instead of Rect.
		derbyCtx.rect(240, 200, 40, 180);
		derbyCtx.rect(280, 200, 40, 180);
		derbyCtx.rect(320, 200, 40, 180);

		derbyCtx.rect(240, 200, 120, 60);
		derbyCtx.rect(240, 260, 120, 60);
		derbyCtx.rect(240, 320, 120, 60);
		derbyCtx.stroke();

		drawZones();
	}

	function drawZones() {
		var zones = new Object({
			'hot': [
				{
					'id': 5,
					'alpha': .4
				},
				{
					'id': 8,
					'alpha': .8
				},
				{
					'id': 9,
					'alpha': .3
				}
			],
			'cold': [
				{
					'id': 1,
					'alpha': .7
				},
				{
					'id': 2,
					'alpha': .4
				}
			]
		});

		var zone,
		    x,
		    y,
		    width   = 40,
		    height  = 60,
		    startX  = 240,
		    startY  = 200;

		// Hot zones.
		derbyCtx.fillStyle = "rgba(255, 50, 50, 0.7)";
		for ( zone in zones.hot ) {
			zone = zones.hot[ zone ];
			console.log( zone.id + ': ' + zone.alpha );

			derbyCtx.fillStyle = 'rgba(255, 50, 50, ' + zone.alpha + ')';

			// Get Zone location.
			y = Math.floor( (zone.id - 1) / 3 );
			x = (zone.id - 1) % 3;

			console.log( x + ', ' + y );

			derbyCtx.fillRect( startX + x * width, startY + y * height, width, height );
			derbyCtx.strokeRect( startX + x * width, startY + y * height, width, height );
		}

		// Cold zones
		for ( zone in zones.cold ) {
			zone = zones.cold[ zone ];
			console.log( zone.id + ': ' + zone.alpha );

			derbyCtx.fillStyle = 'rgba(50, 50, 255, ' + zone.alpha + ')';

			// Get Zone location.
			y = Math.floor( (zone.id - 1) / 3 );
			x = (zone.id - 1) % 3;

			console.log( x + ', ' + y );

			derbyCtx.fillRect( startX + x * width, startY + y * height, width, height );
			derbyCtx.strokeRect( startX + x * width, startY + y * height, width, height );
		}
	}

	function drawHomeRun() {

		/*
		display a random path based on # of homeruns
		*/

		switch ( homerunTotal ) {
			case 1 :
				derbyCtx.strokeStyle = 'rgba(50,153,255,0.7)';
				derbyCtx.beginPath();
				derbyCtx.moveTo(300, 250);
				derbyCtx.bezierCurveTo(400, 10, 475, 0, 550, 130);
				derbyCtx.stroke();
				break;

			case 2 :
				derbyCtx.strokeStyle = 'rgba(50,153,255,0.9)';
				derbyCtx.beginPath();
				derbyCtx.moveTo(305, 280);
				derbyCtx.bezierCurveTo(370, 10, 440, 0, 475, 75);
				derbyCtx.stroke();
				break;

			case 3 :
				derbyCtx.strokeStyle = 'rgba(50,153,255,0.6)';
				derbyCtx.beginPath();
				derbyCtx.moveTo(340, 300);
				derbyCtx.bezierCurveTo(160, 10, 120, 0, 80, 80);
				derbyCtx.stroke();
				break;

			case 4 :
				derbyCtx.strokeStyle = 'rgba(50,153,255,0.6)';
				derbyCtx.beginPath();
				derbyCtx.moveTo(330, 310);
				derbyCtx.quadraticCurveTo(160, 10, 90, 95);
				derbyCtx.stroke();
				break;

			default :
				derbyCtx.strokeStyle = 'rgba(50,153,255,0.6)';
				//derbyCtx.beginPath();
				derbyCtx.moveTo( trajXY( 340, 260 ), trajXY( 380, 200 ) );
				//derbyCtx.lineTo( trajXY( 580, 20 ), trajXY( 200, 120 ) );
				derbyCtx.quadraticCurveTo(160, 10, trajXY( 580, 20 ), trajXY( 200, 120 ) );
				derbyCtx.stroke();
				break;
		}
	}

	function drawPitch() {
		console.log( 'drawPitch' );
		console.info( 'The wind up...' );

		if ( 'curveball' === pitch.pitchType && pitch.distance > 10 ) {
			pitch.dY += pitch.dY / 12;
		}

		pitch.x = pitch.x + pitch.dX;
		pitch.y = pitch.y + pitch.dY;

		// Draw the ball.
		pitchCtx.clearRect( 0, 0, 600, 400 );
		pitchCtx.fillStyle = 'rgba(255,255,255,1)';
		pitchCtx.strokeStyle = 'rgba(0,153,255,0.4)';
		pitchCtx.save();
		pitchCtx.beginPath();
		pitchCtx.arc( pitch.x + pitch.dX, pitch.y + pitch.dY, pitch.distance * .8, 0, 2 * Math.PI, false);
		pitchCtx.fillStyle = 'white';
		pitchCtx.fill();
		pitchCtx.lineWidth = 2;
		pitchCtx.strokeStyle = '#300';
		pitchCtx.stroke();

		if ( pitch.distance > 23 ) {
			setTimeout( function() {
				pitchCtx.clearRect( 0, 0, 600, 400 );

				//pitchCtx.fillStyle = 'red';
				//pitchCtx.fill();
				pitch.x = pitch.x + pitch.dX;
				pitch.y = pitch.y + pitch.dY;

				setTimeout( initPitch, 200);
			}, 1500 );
		} else {
			pitch.distance++;
			raf = window.requestAnimationFrame( activeRoutine );
		}
	}

	/******************\
		Helpers
	\******************/
	function bgSwitcher( event ) {
		var activeBg = $(this).find( 'input:checked' );
		if ( activeBg && activeBg.length > 0 ) {
			$derbyCanvas.css( 'background', 'url( img/bg_stadium-' + activeBg.val() + '.jpg)' );	
		}
	}

	function trajXY( max, min ) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function posXY( max, min ) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	}

	init();
});