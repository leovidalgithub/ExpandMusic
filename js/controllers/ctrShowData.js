angular.module('moduleControllers')

	.controller( 'mainCtrl', function( $scope, $rootScope, $location ) { // MAIN CONTROLLER

		$rootScope.$on('evMasterInfoFilled', function() {
			$scope.arrayIndex = 0;
		})

		$scope.goLanding = function() {
			$location.path( '/home' );
		}
	})

	.controller( 'songInfoCtrl', function( $scope, $rootScope ) { // SONG INFO
	})
	.controller( 'artistCtrl', function( $scope, $rootScope ) { // ARTIST
	})
	.controller( 'albumCtrl', function( $scope, $rootScope ) { // ALBUM
	})
	.controller( 'songCtrl', function( $scope, $rootScope ) { // SONG
	})
	.controller( 'controlsCtrl', function( $scope, $rootScope ) { // CONTROLS
	})
	.controller( 'lyricsCtrl', function( $scope, $rootScope ) { // LYRICS
	})
