class Player {
	constructor (playlistId, playlistName, playlistImage) {
		this.playlistId = playlistId;
		this.playlistName = playlistName;
		this.playlistImage = playlistImage;
		this.songs = null;
		this.getSongs();
	}

	getSongs() {
		$.get('api/playlist/' + this.playlistId + '/songs', function(response) {
			this.songs = response.data.songs;
			console.log(this.songs);
			this.build();	
		}.bind(this));
	}

	build () {
		if ($('#player-container').length) {
        	($('#player-container')).remove();
    	}
		this.playerContainer = $('<div>', {id: "player-container"});

		var playerDiv = $('<div>', {id: "player"});

		var imageContainer = $('<div>', {id: "image_player_container"});
		$('<img>', {
			src: this.playlistImage, 
			id: "player-image",
			class: "animate",
			error: function (e) {
				e.target.src = 'images/playlist.jpg'
			}, 
		}).appendTo(imageContainer);

		$('<i>', {
			class: "far fa-play-circle",
			id: "play-pause-button"
		}).appendTo(imageContainer);

		imageContainer.appendTo(playerDiv);

		var playlistInfo = $('<div>', {id: "playlist-info"});
		var audio = $('<audio>', {
			id: "audio-player",
			controls: true,
			autoplay: true,
			src: this.songs[0].url,
			'data-audio_song_id': 1
		}).on('ended', this.playNext.bind(this));

		audio.appendTo(playlistInfo);
		$('<h4>', {
			text: "Now Playing: " + this.playlistName, 
			id: "now-playing-text"
		}).appendTo(playlistInfo);

		var list = $('<ul>', {id: "song-list"});
		for(let i = 0, length1 = this.songs.length; i < length1; i++){
			var span = $('<span>', {
				class: "songs_span",
				text: i+1 + '. ',
				"data-list_song_id": i+1
			});
			var listItem = $('<li>', {
				text: this.songs[i].name,
				click: function() {
					this.changeSong(i);
				}.bind(this)
			}).appendTo(list);
			listItem.prepend(span);
		}

		list.appendTo(playlistInfo);
		playlistInfo.appendTo(playerDiv);

		var editDeleteButtons = $('<div>', {id: "player_edit_delete_buttons"});
		$('<i>', {
			class: "far fa-times-circle",
			id: "player-delete-button",
			click: function() {
				var deletePlaylist = new DeletePlaylistPopup(
					this.playlistId,
					this.playlistImage,
					"playlistPopups/delete-playlist-popup.html"
				);
				deletePlaylist.buildDeletePlaylist();
				$('#player-container').remove();
			}.bind(this),
		}).appendTo(editDeleteButtons);

		$('<i>', {
			class: "fas fa-pencil-alt",
			id: "player-edit-button",
			click: function(){
				console.log("edit button on player was touched")
				var playlistObj = {
					id: this.playlistId,
					name: this.playlistName,
					image: this.playlistImage
				}
				var editPlaylist = new EditPlaylistPopup(
					playlistObj,
					"playlistPopups/edit-playlist-name-image.html",
					"playlistPopups/edit-playlist-songs.html"
				);
				editPlaylist.getSongs();
				$('#player-container').remove()
			}.bind(this),
		}).appendTo(editDeleteButtons);

		playerDiv.appendTo(this.playerContainer);
		editDeleteButtons.appendTo(this.playerContainer);
		this.playerContainer.prependTo($('main'));

		$('html, body').animate({ scrollTop: 0 }, 'slow');
		// this will take (mostly mobile) users to the top
		//  of the page as soon as the player is created.

		audio.on('pause', this.matchCssPause.bind(this));
		audio.on('play', this.matchCssPlay.bind(this));
		$('#play-pause-button').click(function () {
			var songIsPaused = document.getElementById("audio-player").paused;
			if (songIsPaused) {
				$('audio')[0].play();
				//matchCssPlay function will run automatically
			} else {
				$('audio')[0].pause();
				//matchCssPause function will run automatically
			}
		})
	}

	playNext(e) {
		//very important: data attribute automatically increases
		//in 1 when the song ends! ('ended') event. 
		//(regardless of any written code in this project)
		var index = ++e.target.dataset.audio_song_id;
		if (index - 1 >= this.songs.length) {return false;}
		$(e.target).attr({
			"src": this.songs[index - 1].url,
			"data-audio_song_id": index
		});
		e.target.play();
	}
	changeSong(i) {
		var audioSongData = $('#audio-player').attr('data-audio_song_id');
		var songSpanData = $(event.target).find('span').attr('data-list_song_id');
		//prevents further clicking on the same song if it already
		//exists in the audio tag (because then it will jump to the start)
		console.log(audioSongData, songSpanData)
		if (Number(audioSongData) != Number(songSpanData)) {
			var audioTag = $('audio');
			this.toggleSongNumToPlay(false);
			//function was used because song changing doesn't pause audio
			audioTag.attr({
				"src": this.songs[i].url,
				"data-audio_song_id": i+1
			});
			audioTag[0].play();
		}
	}
	matchCssPause() {
		$( "#player-image").css("animation-play-state", "paused");
		$("#play-pause-button").removeClass("far fa-pause-circle");
		$("#play-pause-button").addClass("far fa-play-circle");
		this.toggleSongNumToPlay(false);
	}
	matchCssPlay() {
		$( "#player-image").css("animation-play-state", "running");
		$("#play-pause-button").removeClass("far fa-play-circle");
		$("#play-pause-button").addClass("far fa-pause-circle");
		this.toggleSongNumToPlay(true);
	}
	toggleSongNumToPlay(booleanPlay) {
		var audioSongData = $('#audio-player').attr('data-audio_song_id');
		// console.log($('#audio-player').data("audio_song_id")); - will not work
		var songSpanData = $(`[data-list_song_id='${audioSongData}']`);
		if (booleanPlay) {
			songSpanData.addClass('fas fa-play play_list_icon').empty().css("margin-right", "0.25rem");
		} else {
			songSpanData.removeClass('fas fa-play play_list_icon').text(audioSongData + '. ').css("margin-right", "0");
		}
	}
}

		//e.target.src = this.songs[index - 1].url;
		// e.target.play();
		//$(e.target).attr({"data-audio_song_id": index + 1});