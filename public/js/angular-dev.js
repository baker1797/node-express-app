var $ = jQuery;


var devAngularApp = angular.module( 'devAngularApp', ['ngRoute', 'gamesFilters'] );

devAngularApp

	.controller( 'NavController', [
		'$scope',
		function ($scope) {
			$scope.nav = [
				{ title: 'League', model: 'na' },
				{ title: 'NHL', model: 'NHL' },
				{ title: 'we', model: 'we' }
			];
		}])

	.controller( 'NcaaGamesController', [
		'$scope', '$http',
		function ($scope, $http) {
			$http
				.get( 'http://relaunch-sports-dev.usatoday.com:50624/SportsHub/Editorial.svc/bracket/mens-basketball/2015' )
				.success(function(data) {
					$scope.games = data.regions;
					$('#spinner').remove();
				});
			$http
				.get( 'http://relaunch-sports-dev.usatoday.com:50624/SportsHub/Editorial.svc/bracket/mens-basketball/2015/teams' )
				.success(function(data) {
					$scope.teams = data.teams;
				});
		}])
	
	.controller( 'TeamsController', [
		'$scope', '$routeParams', 'Teams',
		function ($scope, $routeParams, Teams) {
			$scope.team = Teams[$routeParams.team];
		}])

	.controller( 'LeaguesController', [
		'$scope', '$routeParams', 'Leagues',
		function ($scope, $routeParams, Leagues) {
			$scope.leagues = Leagues;
			//$scope.orderProp = 'popularity'; // pre-sort the list
		}])

	.config(['$routeProvider',
		function($routeProvider) {
			console.info('Angular Router hit');
			$routeProvider
				.when( '/', {
					templateUrl: '/navDetails.html',
					controller: 'NavController'
				})
				.when( '/games', {
					templateUrl: 'partials/games.html',
					controller: 'NcaaGamesController'
				})
				.when( '/leagues/:team', {
					templateUrl: '/leagueDetails.html',
					controller: 'TeamsController'
				});
		}])

	.factory('Teams',
		function() {
		return {
			phillies: { id: 4, city: "Philadelphia", mascot: "Phanatic" },
			mets: { id: 2, city: "New York", mascot: "Mr. Met" },
			yankees: { id: 1, city: "New York" },
		}
	})


	// Basically a JSON file. Can be used for requests, globals, configs, etc.
	.factory('Leagues',
		function() {
		return [
			{
				id: 'NFL',
				popularity: .5
			},
			{
				id: 'NHL',
				popularity: .2
			},
			{
				id: 'MLB',
				popularity: .25
			},
			{
				id: 'NBA',
				popularity: .35
			},
			{
				id: 'NCAAB',
				popularity: .28
			},
			{
				id: 'Nascar',
				popularity: .32
			},
			{
				id: 'PGA',
				popularity: .22
			},
		];
	});


/* Custom Filter */
angular
	.module('gamesFilters', [])
	.filter('gameHighlight', function() {
		return function(input) {
			if ( input === 'DUKE' ) {
				return '===WINNER====';
			} else {
				return input;
			}
		};
	});