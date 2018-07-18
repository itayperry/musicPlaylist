class EditPlaylistPopup {
	constructor(playlistObj, editPlaylistUrl, editSongsUrl) {
	  this.playlistId = playlistObj.id;
		this.playlistName = playlistObj.name;
		this.playlistImage = playlistObj.image;
		this.playlistSongs = null;
		this.editPlaylistUrl = editPlaylistUrl;
	  this.editSongsUrl = editSongsUrl;
	}

	getSongs() {
		$.get('api/playlist/' + this.playlistId + '/songs', function(response) {
			this.playlistSongs = response.data.songs;
			console.log(this.playlistSongs);
			this.buildEditPlaylist();	
		}.bind(this));
  }

	buildEditPlaylist() {
  	fetch(this.editPlaylistUrl)
    .then(response => response.text())
    .then(html => {

     	var editPlaylistForm = $(html);
      var image = editPlaylistForm.find("img")

    		image.attr("src", this.playlistImage);

    		editPlaylistForm.find("input[name='playlist_name']").val(this.playlistName)
    		editPlaylistForm.find("input[name='playlist_image_url']").val(this.playlistImage);

    		editPlaylistForm.find('.closing_button_container').click(this.close);

    		image.on('error', function() {
      		 $(this).attr("src", "images/playlist.jpg");
   		});

	    editPlaylistForm.find('.reset').click(function(e) {
	    	e.preventDefault();
	   		image.attr("src", "images/playlist.jpg"); //written here because it will not happen on reset
	        editPlaylistForm.find("input[name='playlist_name']").val('');
	        editPlaylistForm.find("input[name='playlist_image_url']").val('');
	    }.bind(this));

	    editPlaylistForm.appendTo("main");

	    editPlaylistForm.find("form").on('submit', function(e) {
	      e.preventDefault();
	      var name = editPlaylistForm.find("input[name='playlist_name']").val();
	      var imageUrl = editPlaylistForm.find("img").attr("src");
	      this.buildEditSongs(name, imageUrl);
	    }.bind(this));

	    $(document).on("input", 'input[name="playlist_image_url"]', this.showPreview);
		})
  }

  buildEditSongs(name, imageUrl) {
    fetch(this.editSongsUrl)
    .then(response => response.text())
    .then(html => {

      $(".new_playlist_popup").remove();

      var editSongsForm = $(html);

      editSongsForm.find('.closing_button_container').click(this.close);
      
      var imgTag = editSongsForm.find("img");
      imgTag.on('error', function() {
         $(this).attr("src", "images/playlist.jpg");
      });
      imgTag.attr("src", imageUrl);

      editSongsForm.find('#add-song-inputs').click(function(e) {
        e.preventDefault();
        this.createEmptySongField()
      }.bind(this));

      editSongsForm.appendTo("main");

      editSongsForm.find("form").on('submit', function(e) {
        e.preventDefault();
        var allNames = document.getElementsByName("song_name[]");
        var allSongs = document.getElementsByName("song_url[]");
        var songs = [];
        var validate = true;
        for(let i = 0; i < allNames.length; i++) {
          if ($('.validation_message').length) {
            ($('.validation_message')).remove();
          }
          var result = allSongs[i].value.match(/\.(?:wav|mp3)$/i);
          console.log(result);
          if (result !== null && allNames[i].value.length > 1) {
            songs.push({
              name: allNames[i].value,
              url: allSongs[i].value
            });
            console.log("uf itha")
          } else {
            console.log("victorious");
            $("<p>", {
              text: "Song url must end with mp3/wav and names must consist of at least characters",
              css: {"color": "red", "text-align": "center"},
              class: "validation_message"
            }).prependTo($('.contain_fields'));
            return validate = false;
          }
        }
        
        //$(allNames[0]).css({"color": "red"});
        if (validate) {
          $('html, .contain_fields').animate({ scrollTop: 0 }, 'slow');
          var nameAndImageObj = {
            name: name,
            image: imageUrl
          }
          var songsObj = {
            songs: songs
          }
          console.log(nameAndImageObj, songsObj)
          this.editPlaylist(nameAndImageObj, songsObj); 
        }
      }.bind(this));

      this.playlistSongs.forEach(songObj => {
      	this.createSongField(songObj.name, songObj.url);
			});
    })
  }

  createSongField (songName, songUrl) {
    var field = $('<fieldset>');
    var urlLabel = $('<label>', {
      css: {"margin-right": "0.85rem"} 
    }).appendTo(field);
    var songNameLabel = $('<label>').appendTo(field);
    
    $('<span>', {
      text: "Song URL",
      css: {"margin-right": "0.35rem"}
    }).appendTo(urlLabel);
    $('<input>', {
      type: "name",
      name: "song_url[]",
      value: songUrl
    }).appendTo(urlLabel);

    $('<span>', {
      text: "Name",
      css: {"margin-right": "0.35rem"}
    }).appendTo(songNameLabel);
    $('<input>', {
      type: "name",
      name: "song_name[]",
      value: songName
    }).appendTo(songNameLabel);

    $('<i>', {
      class: "far fa-times-circle close_fieldset_btn",
      click: function(e) {
        if ($('fieldset').length > 2) {
    			field.remove();
    		}
      }
    }).appendTo(field);

    field.appendTo(".contain_fields");
  }

  createEmptySongField () {
    var field = $('<fieldset>');
    var urlLabel = $('<label>', {
      css: {"margin-right": "0.85rem"} 
    }).appendTo(field);
    var songNameLabel = $('<label>').appendTo(field);
    
    $('<span>', {
      text: "Song URL",
      css: {"margin-right": "0.35rem"}
    }).appendTo(urlLabel);
    $('<input>', {
      type: "name",
      name: "song_url[]"
    }).appendTo(urlLabel);

    $('<span>', {
      text: "Name",
      css: {"margin-right": "0.35rem"}
    }).appendTo(songNameLabel);
    $('<input>', {
      type: "name",
      name: "song_name[]"
    }).appendTo(songNameLabel);

    $('<i>', {
      class: "far fa-times-circle close_fieldset_btn",
      click: function(e) {
        field.remove();
      }
    }).appendTo(field);

    field.appendTo(".contain_fields");
  }

  editPlaylist(nameAndImageObj, songsObj) {
  	var data = JSON.stringify(nameAndImageObj);
  	var songsData = JSON.stringify(songsObj);
      $.post("api/playlist/" + this.playlistId + "/songs", songsData)
      .then(
      	$.post("api/playlist/" + this.playlistId, data, function(data) {
  				console.log("hand og god")
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
	          text: nameAndImageObj.name + ' playlist was successfully edited',
	          css: {"text-align": "center"}
	        }).appendTo(successMessage);
	        $("<img>", {
	          src: nameAndImageObj.image,
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
	      })
      )
  }

  showPreview() {
    $('#popup-image').attr({"src": $("input[name=playlist_image_url]").val()});
  }

  close() {
    console.log("close me");
    $('.new_playlist_popup').remove();
  }
}