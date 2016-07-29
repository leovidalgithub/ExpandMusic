angular.module( 'moduleControllers' )
	.controller( 'ctrGetMasterInfo', function( $scope, $rootScope, svcSpotify, svcLyrics, $q, svcLastFM ) { // DETAIL SONGS

//------------------- GET GENERAL TRACKS INFO  -----------------------------------
		if ( $rootScope.aTrackNames ) {
			$scope.masterInfo = [];
			$q.all( $rootScope.aTrackNames.map( createPromiseFromItem ) ) // .all ( promises Array )
				.then( fillMasterTracksInfo );

			function createPromiseFromItem ( song ) {
				return svcSpotify.getTrackInfo( song );
			}
		} else {
			console.log('Not songNames available');
		}
//------------------- START FILL MASTER-TRACK-INFO -------------------------------
		function fillMasterTracksInfo( data ) {

			$( data ).each( function( index, el ) {
				var itemInfo = el.trackInfo;
				if ( itemInfo ) { // si no llega nada porque no consiguó la canción no lo agrego al array

					var duration = new Date(itemInfo.duration_ms);
					duration = duration.getUTCMinutes() + ':' + duration.getUTCSeconds();

					$scope.masterInfo.push( {
						trackName: itemInfo.name,
						trackId: itemInfo.id,
						trackPreview: itemInfo.preview_url,
						trackDuration: duration,
						trackSpotify: itemInfo.external_urls.spotify,
						albumId: itemInfo.album.id,
						albumName: itemInfo.album.name,
						albumCover: itemInfo.album.images[1].url,
						artistName: itemInfo.artists[0].name,
						artistId: itemInfo.artists[0].id,
						artistSpotify: itemInfo.artists[0].external_urls.spotify
					} );
				}
			});
			getAlbumTracks();			
		} // @end fillMasterTracksInfo()

//------------------- GET ALBUM TRACKS --------------------------------------------
		function getAlbumTracks() {
			$( $scope.masterInfo ).each( function( index, el ) {
				svcSpotify.getAlbumTracks( el.albumId )
					.then(function( data ) {
						var tracksArray = [];
						$( data ).each( function( index, el ) {
							tracksArray.push( el.name);
						});
						$scope.masterInfo[index].albumTracks = tracksArray;
					})
			});
			getLyrics();
		}

//------------------- GET TRACK LYRICS --------------------------------------------
		function getLyrics() {
			$($scope.masterInfo).each( function( index, el ) {
				svcLyrics.getLyrics( el.artistName, el.trackName )
					.then(function( data ) {

						if ( data.status == 'ok')
						$scope.masterInfo[index].lyrics = data.lyrics;
						else {
						$scope.masterInfo[index].lyrics = 'No lyrics found';
						}
					})
			});
			getArtistInfo();
		}
		
//------------------- GET ARTIST INFO ----------------------------------------------
		function getArtistInfo() {
			$($scope.masterInfo).each( function( index, el ) {
				svcLastFM.getArtistInfo( el.artistName )
					.then(function( data ) {
						$scope.masterInfo[index].artistCover = data.image[4]['#text'];
						$scope.masterInfo[index].summary = data.bio.summary;
						$scope.masterInfo[index].artistListeners = data.stats.listeners;
						$scope.masterInfo[index].artistPlaycount = data.stats.playcount;
						$scope.masterInfo[index].style = data.tags.tag[0].name;
						$scope.masterInfo[index].artistLastFMUrl = data.url;
					})
			});
			// console.log( $scope.masterInfo );
			$rootScope.$broadcast( 'evMasterInfoFilled' );
		}	

})