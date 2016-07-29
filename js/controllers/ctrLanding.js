angular.module('moduleControllers')
	.controller( 'ctrLanding', function( $scope, $rootScope, $location ) { // LANDING

		$scope.goPlayer = function(){
			$location.path( '/player' );
		}

//--------------------- GET SELECTED TRACKS FROM INPUT CONTROL ------------------------
		$( '#files' ).on( 'change', function( event ) {

			var aTrackNames = [];
	        var files = event.target.files;

	        // Fill array with file names without extension
	        for ( var i=0; i<files.length; i++ ) {		           
	           if ( files[i].type.indexOf( 'audio' ) > -1 ) {
					var trackNameWithoutExtension = files[i].name.replace(/\.[^/.]+$/, "");
					aTrackNames.push( trackNameWithoutExtension );
	            }
	        }
	        $rootScope.aTrackNames = aTrackNames;

	        $rootScope.$apply( function() {
				$location.path( '/player' );
			});
		});
})
