angular.module('moduleServices') 		// SPOTIFY API SERVICE
	.factory('svcSpotify', function( $http, $rootScope ) {

		function getTrackInfo( songName ) {
			var httpProtocol = $rootScope.getHttpProtocol();
			var urlApi = httpProtocol + '//api.spotify.com/v1/search?q=<%TRACK%>&type=track';
			urlApi = urlApi.replace('<%TRACK%>', encodeURIComponent( songName ) );
			return $http.get( urlApi )
				.then( function( data ) {
					return { 
						trackInfo: data.data.tracks.items[0]
					} 
				})
		}

		function getAlbumTracks( albumID ) {
		    var urlApi = 'https://api.spotify.com/v1/albums/' + albumID + '/tracks';
			return $http.get( urlApi )
				.then( function( data ) {
					return data.data.items
				})
		}
			return {
				getTrackInfo: getTrackInfo,
				getAlbumTracks: getAlbumTracks
			}
})
