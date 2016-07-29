angular.module('moduleServices')	// LAST FM SERVICE
	.factory('svcLastFM', function( $http ) {

		function getArtistInfo( artist ) {
			var urlApi = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=<%ARTIST%>&api_key=df31429d1b240eb4a809ed64b4bd822f&format=json';
			urlApi = urlApi.replace( '<%ARTIST%>', encodeURIComponent( artist ) );

			return $http.get( urlApi )
				.then( function( data ) {
					return data.data.artist
				})
		}
			return {
				getArtistInfo: getArtistInfo,
			}
})
