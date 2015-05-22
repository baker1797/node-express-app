/**
 * Description: Maintains a user's session history to serve dynamic page links and data.
 * Author:      Kyle Baker
 * Date:        5/14/15
 */

'use strict'

var BakagainHistory = {
	/**
	 * Object variables.
	 */
	recentPages:    {},
	recentPagesKey: 'recentPages',

	/**
	 * Start up the history script.
	 */
	init: function() {
		document.addEventListener("DOMContentLoaded", function( event ) {
			BakagainHistory.pushHistory();
			BakagainHistory.getHistory();
			BakagainHistory.renderPages();
		});
	},

	/**
	 * Add a webpage's context to the user's session list.
	 */
	pushHistory: function() {
		// Get the history.
		this.recentPages = JSON.parse( sessionStorage.getItem( this.recentPagesKey ) ) || [];

		// Save the current page.
		var pageContext = {
			'href': window.location.href,
			'title': document.getElementsByTagName( 'title' )[0].text
		};

		/* @TODO - check if it was just a page refresh */

		this.recentPages.push( pageContext );

		sessionStorage.setItem( this.recentPagesKey, JSON.stringify( this.recentPages ) );
	},

	/**
	 * Retrieve a list of recent pages from the user's session.
	 *
	 * @param int 	n - the number of items to retrieve.
	 */
	getHistory: function( n ) {
		this.recentPages = JSON.parse( sessionStorage.getItem( this.recentPagesKey ) );

		if ( n && this.recentPages[ n ] ) {
			console.log( this.recentPages[ n ] );
		} else {
			console.log( this.recentPages );
		}
	},

	/**
	 * Render a list of recent pages to the screen.
	 *
	 * @param int 	n - the number of items to render.
	 */
	renderPages: function( n ) {
		if ( this.recentPages.length < 1 ) {
			return;
		}

		var outputTarget = $( '.bakagain_history_list' ),
		    page,
		    el_l,
		    el_a;

		for ( page in this.recentPages ) {
			// Create a new anchor element.
			el_l = document.createElement( 'li' );
			el_a = el_l.appendChild( document.createElement( 'a' ) );

			// Set it's values.
			el_a.innerHTML = this.recentPages[ page ].title;
			el_a.setAttribute( 'href', this.recentPages[ page ].href );
			el_a.setAttribute( 'class', 'bakagain_history_link' );
			el_l.setAttribute( 'class', 'bakagain_history_item' );

			outputTarget.append( el_l );
		}
	},

	/**
	 * Delete the user's session history.
	 */
	deleteHistory: function() {
		sessionStorage.removeItem( this.recentPagesKey );
	}
};