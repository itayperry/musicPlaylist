class NewPlaylistPopup {

  constructor(addPlaylistUrl, addSongsUrl) {
    //id forms automatically
    this.addPlaylistUrl = addPlaylistUrl;
    this.addSongsUrl = addSongsUrl;
  }

  buildAddPlaylist() {
    fetch(this.addPlaylistUrl)
    .then(response => response.text())
    .then(html => {

      var addPlaylistForm = $(html);

      addPlaylistForm.find('.closing_button_container').click(this.close);

      addPlaylistForm.find("img").on('error', function() {
         $(this).attr("src", "images/playlist.jpg");
      });

      addPlaylistForm.find('.reset').click(function(e) {
         e.preventDefault();
         addPlaylistForm.find("input[name='playlist_name']").val('');
         addPlaylistForm.find("input[name='playlist_image_url']").val('');
      });

      addPlaylistForm.appendTo("main");

      addPlaylistForm.find("form").on('submit', function(e) {
        e.preventDefault();
        var name = addPlaylistForm.find("input[name='playlist_name']").val();
        var imageUrl = addPlaylistForm.find("img").attr("src");
        this.buildAddSongs(name, imageUrl);
      }.bind(this));

      $(document).on("input", 'input[name="playlist_image_url"]', this.showPreview);
    })
  }

  buildAddSongs(name, imageUrl) {
    console.log(name,imageUrl);
    fetch(this.addSongsUrl)
    .then(response => response.text())
    .then(html => {

      $(".new_playlist_popup").remove();

      var addSongsForm = $(html);

      addSongsForm.find('.closing_button_container').click(this.close);
      
      var imgTag = addSongsForm.find("img");
      imgTag.on('error', function() {
         $(this).attr("src", "images/playlist.jpg");
      });
      imgTag.attr("src", imageUrl);

      addSongsForm.find('#add-song-inputs').click(function(e) {
         e.preventDefault();
         this.createSongField()
      }.bind(this));

      addSongsForm.find("form").on('submit', function(e) {
        e.preventDefault();
        var allNames = document.getElementsByName("song_name[]");
        var allSongs = document.getElementsByName("song_url[]");
        console.log(allNames[0].value.length);
        console.log(allSongs.length);
        var songs = [];
        var validate = true;
        for(let i = 0; i < allNames.length; i++) {
          if ($('.validation_message').length) {
            ($('.validation_message')).remove();
          }
          var result = allSongs[i].value.match(/\.(?:wav|mp3)$/i);

          if (result !== null && allNames[i].value.length > 1) {
            
            songs.push({
              name: allNames[i].value,
              url: allSongs[i].value
            });

          } else {

            $("<p>", {
              text: "Song url must end with mp3/wav and names must consist of at least characters",
              css: {"color": "red", "text-align": "center"},
              class: "validation_message"
            }).prependTo($('.contain_fields'));
            return validate = false;
          }
        }
        
        //$(allNames[0]).css({"color": "red"});
        //$('html, .contain_fields').animate({ scrollTop: 0 }, 'slow');
        if (validate) {
          var newPlaylistObject = {
            name: name,
            image: imageUrl,
            songs: songs
          }
          this.createNewPlaylist(newPlaylistObject);
        }
      }.bind(this));

      addSongsForm.appendTo("main");
      // console.log("this far we're cool");
    })
  }

  createSongField () {
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

  createNewPlaylist(newPlaylistObject) {
    var data = JSON.stringify(newPlaylistObject);
    $.post("api/playlist", data, function(data){
        $('.add_songs_popup_header').remove();
        $('#new-playlist-popup-form').remove();
        // $('.new-playlist-popup-content')
        //.append('<h1>' + newPlaylistObject.name + ' playlist was successfully added</h1>')
        //.append("<img src=" + newPlaylistObject.image + ">");

        var successMessage = $("<div>", {
          css: {display: "flex",
                "align-items": "center",
                "flex-wrap": "wrap",
                "justify-content": "center"
          }
        });
        $("<h1>", {
          text: newPlaylistObject.name + ' playlist was successfully added',
          css: {"text-align": "center"}
        }).appendTo(successMessage);
        $("<img>", {
          src: newPlaylistObject.image,
          width: "100",
          height: "100"
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
    )
    // console.log(data);
    // $.ajax({
    //   type: "POST",
    //   url: "api/playlist",
    //   data: data
    //   success: function () {
    //       console.log("success")
    //   }
    //   // dataType: "json"
    // })
  }

  showPreview() {
    $('#popup-image').attr({"src": $("input[name=playlist_image_url]").val()});
  }

  close() {
    console.log("close me");
    $('.new_playlist_popup').remove();
  }
}