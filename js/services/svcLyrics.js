angular.module('moduleServices')		// LYRICS API SERVICE
	.factory('svcLyrics', function( $http, $rootScope ) {

		function getLyrics( artist, songName ) {
			var httpProtocol = $rootScope.getHttpProtocol();
			var urlApi = httpProtocol + '//rocky-hollows-34313.herokuapp.com/lyric?artist=<%ARTIST%>&track=<%TRACK%>';
			urlApi = urlApi.replace('<%TRACK%>', encodeURIComponent( songName ) );
			urlApi = urlApi.replace('<%ARTIST%>', encodeURIComponent( artist ) );
			return $http.get( urlApi )
				.then( function( data ) {
					return data.data
				})
		}
			return {
				getLyrics: getLyrics
			}
})
