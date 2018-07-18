class Playlist {
	constructor (data) {
		this.id = data.id;
		this.name = data.name;
		this.image = data.image;
		this.container = null;
	}
	getId () {return this.id;}

	build () {
		this.container = $('<section>', {class: "single_playlist_container"});

		var title = $('<h2>', {
			text: this.name, 
			class: "playlist_title"
		});
		
		title.appendTo(this.container);
		var imageContainer = $('<div>', {class: "image_play_container"});

		$('<img>', {
			src: this.image, 
			class: "playlist-image",
			error: function (e) {
				e.target.src = 'images/playlist.jpg'
			}, 
		}).appendTo(imageContainer);

		$('<i>', {
			class: "far fa-play-circle"
		}).appendTo(imageContainer);

		var editContainer = $('<div>', {
			class: "edit_delete_buttons"
		})
		$('<i>', {
			class: "far fa-times-circle delete_button",
			click: function() {
				var deletePlaylist = new DeletePlaylistPopup(
					this.id,
					this.image,
					"playlistPopups/delete-playlist-popup.html"
				);
				deletePlaylist.buildDeletePlaylist();
			}.bind(this),
		}).appendTo(editContainer);

		$('<i>', {
			class: "fas fa-pencil-alt edit_button",
			click: function() {
				var playlistObj = {
					id: this.id,
					name: this.name,
					image: this.image
				}
				var editPlaylist = new EditPlaylistPopup(
					playlistObj,
					"playlistPopups/edit-playlist-name-image.html",
					"playlistPopups/edit-playlist-songs.html"
				);
				editPlaylist.getSongs();
				console.log(editPlaylist)
			}.bind(this),
		}).appendTo(editContainer);

		imageContainer.appendTo(this.container);
		editContainer.appendTo(imageContainer);
		this.container.appendTo($('.all_playlists_container'));
		title.arctext({radius: 160});

	}

	registerPlaying() {
		this.container.find('.fa-play-circle').click(function(event) {
			var player = new Player(this.id, this.name, this.image);
		}.bind(this));
	}
}