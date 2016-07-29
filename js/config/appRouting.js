angular.module('moduleConfig', ['ngRoute'])
	.config( function( $routeProvider ) {
		$routeProvider
			.when('/', {
				templateUrl: 'templates/landing.html',  // <--- LANDING
				controller: 'ctrLanding'
			})
			.when('/home', {
				templateUrl: 'templates/landing.html',  // <--- LANDING
				controller: 'ctrLanding'
			})
			.when('/player', {
				templateUrl: 'templates/player.html', // <---- PLAYER
				controller: 'ctrGetMasterInfo'
			})
			.otherwise({ redirectTo: '/' });		
	})

	.run( function( $rootScope ) {
		$rootScope.getHttpProtocol = function() {
			return window.location.protocol;
		}
	})

// para que permita agregar una URL en src en HTML5 audio
// aunque ya lo permite igualmente el control no funciona
	.config( function( $sceDelegateProvider ) {
	  $sceDelegateProvider.resourceUrlWhitelist( ['**'] );
	});
	