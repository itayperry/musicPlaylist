 fetch('api/playlist')
.then(response => response.json())
.then(playlists => {

	init(playlists.data)

	$('input[type=search]').keyup(function(event) {
		$(".all_playlists_container").empty();
		init(
			playlists.data.filter(pl => pl.name.toLowerCase().includes($(event.target).val().toLowerCase()))
		)
	});

	$('#new-playlist-button').click(function() {
		console.log("The 'new playlist' button was clicked");
		//var newPlaylist = new NewPlaylistPopup();
		//newPlaylist.buildAddPlaylist();
		var newPlaylist = new NewPlaylistPopup(
			"playlistPopups/new-playlist-first-popup.html",
			"playlistPopups/new-playlist-addSongs-popup.html"
		);
		newPlaylist.buildAddPlaylist();
		console.log(newPlaylist)
	})
})

function init(playlists) {
	//$('.all_playlists_container').empty()
	console.log(playlists)
	playlists.forEach(playlistObj => {
		var playlist = new Playlist(playlistObj);
		console.log(playlist);
		playlist.build();
		console.log(playlist);
		playlist.registerPlaying();
		console.log('id of this playlist is ' + playlist.getId());
		//$('.playlist_title').arctext({radius: 160});
		
	})
}