// app.js
/* global requestCrossDomain, jQuery */
(function (g, d, $, u){
  'use strict';
  $(function() {
    var
      URL_TEMPLATE = 'http://lyrics.wikia.com/api.php?artist={{artist}}&song={{song}}&fmt=realjson&callback=LyricsFinderParseResult',

      artist = '',
      song = {
        title: ''
      },

      errors = [],

      $g = $(g),
      $cache = $('#cache'),
      $form = $('form'),
      $buttonMore = $('<button>', {
        id: 'buttonMore',
        text: 'more',
        'class': 'btn btn-primary btn-block btn-lg'
      }),
      $buttonAbout = $('#buttonAbout'),
      $buttonBack = $('#buttonBack'),

      test = (/test/ig).test(location.hash);

    function parseResult (data) {
      var
        artist = data.artist,

        $artist = $('#artist'),
        $song = $('#song'),
        $lyrics = $('#lyrics');

      song.title = data.song;
      song.lyrics = data.lyrics;
      song.url = data.url;

      song.lyrics = song.lyrics.replace(/\n/g, '<br>');

      $artist.text(artist);
      $song.text(song.title);

      if ((/not found/ig).test(song.lyrics)) {
        $lyrics.html(song.lyrics);
        errors.push('nie znaleziono tekstu');
      }

      else {
        $lyrics.html(song.lyrics).parent().after($buttonMore);
      }

      $('#resultPage, #result')
        .css('opacity', 0)
        .removeClass('hidden')
        .animate({
          opacity: 1
        });
    }

    function parseToUrlSafeValues (str) {
      str = encodeURIComponent(str);
      str = str.replace('%2B', '+');

      return str;
    }

    function getInputData (what) {
      var value = $('form input[name="' + what + '"]').val();

      value = parseToUrlSafeValues(value);

      return value;
    }

    function getData () {
      var url = '';

      artist = getInputData('artist');
      song.title = getInputData('song');

      if (artist && song.title) {
        url = URL_TEMPLATE.replace('{{artist}}', artist).replace('{{song}}', song.title);

        $.ajax({
          url: url,
          crossDomain: true,
          dataType: 'jsonp',
          jsonp: 'LyricsFinderParseResult'
        });
      }

      else {
        errors.push('nie podano wszystkich danych');
      }

      $buttonMore.removeClass('hidden');

      return false;
    }

    function getFullLyrics () {
      requestCrossDomain(song.url, function(results) {
        results = results.replace(/link|style|script|meta/ig, 'p');
        $cache.html(results);

        $('#lyrics')
          .animate({
            opacity: 0
          }, function() {
            $(this)
              .html($cache.find('.lyricbox').html())
              .animate({
                opacity: 1
              });
          });

        $buttonMore.addClass('hidden');
      });
    }

    function doTest () {
      if (test) {
        $('form [name="artist"]').val('queen');
        $('form [name="song"]').val('bohemian rhapsody');
      }
    }

    function showAboutPage () {
      $g.trigger('page.about.visible');
    }

    function showButtonBack () {
      $buttonBack
        .show()
        .css({display: 'block'})
        .removeClass('hidden');
    }

    function hideButtonBack () {
      $buttonBack.hide().addClass('hidden');
    }

    function goBack () {
      g.history.back();
    }

    g.LyricsFinderParseResult = parseResult;
    $g.on('page.about.visible', showButtonBack);
    $g.on('page.about.hidden', hideButtonBack);
    $form.on('submit', getData);
    $buttonMore.on('click', getFullLyrics);
    $buttonAbout.on('click', showAboutPage);
    $buttonBack.on('click', goBack);
    doTest();
  });
}(window, document, jQuery));

