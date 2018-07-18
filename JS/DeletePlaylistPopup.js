class DeletePlaylistPopup {
	constructor(playlistId, playlistImage, url) {
		this.playlistId = playlistId;
    	this.playlistImage = playlistImage;
    	this.url = url;
	}

	buildDeletePlaylist() {
  		fetch(this.url)
    	.then(response => response.text())
    	.then(html => {

	     	var deletePlaylistForm = $(html);
	        var image = deletePlaylistForm.find("img")

	    	image.attr("src", this.playlistImage);

	    	deletePlaylistForm.find('.closing_button_container').click(this.close);

		    deletePlaylistForm.find('#no-deletion').click(function(e) {
		    	e.preventDefault();
		    	this.close();
		    }.bind(this));

		    deletePlaylistForm.appendTo("main");

		    deletePlaylistForm.find("form").on('submit', function(e) {
		      e.preventDefault();
		      this.deletePlaylist(this.playlistImage);
		    }.bind(this));
		})
  }

  deletePlaylist(imageUrl) {
  	$.ajax({
    	type: "DELETE",
        url: 'api/playlist/' + this.playlistId,
        success: function (data) {
	        console.log(data);
	        $('.add_songs_popup_header').remove();
	        $('#new-playlist-popup-form').remove();
	        var successMessage = $("<div>", {
	          css: {display: "flex",
	           			"align-items": "center",
	          			"flex-wrap": "wrap",
	          			"justify-content": "center"
	         	}
	        });
	        $("<h1>", {
	          text: 'The playlist was successfully deleted',
	          css: {"text-align": "center"}
	        }).appendTo(successMessage);
	        $("<img>", {
	          src: imageUrl,
	          width: "100",
	          height: "100",
	        }).appendTo(successMessage);
	        $('.new-playlist-popup-content').append(successMessage);

	        fetch('api/playlist')
	        .then(response => response.json())
	        .then(allPlaylists => {
	            var playlists = allPlaylists.data;
	            $(".all_playlists_container").empty();
	            playlists.forEach(playlistObj => {
	                var playlist = new Playlist(playlistObj);
	                playlist.build();
	                playlist.registerPlaying();
	            })
	        })
        }
    })
    
  }

  close() {
    console.log("close me");
    $('.new_playlist_popup').remove();
  }
}