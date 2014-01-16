// app.js
/* global requestCrossDomain:true */
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

            $cache = $('#cache'),

            $form = $('form'),

            $buttonMore = $('<button>', {
                id: 'buttonMore',
                text: 'more',
                'class': 'btn btn-primary btn-block btn-lg'
            }),

            test = (/test/ig).test(location.hash),

            parseResult = function(data) {
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

                $('#resultPage')
                    .css('opacity', 0)
                    .removeClass('hidden')
                    .animate({
                        opacity: 1
                    });
            },

            parseToUrlSafeValues = function(str) {
                str = encodeURIComponent(str);
                str = str.replace('%2B', '+');

                return str;
            },

            getInputData = function(what) {
                var
                    value = $('form input[name="' + what + '"]').val();

                value = parseToUrlSafeValues(value);

                return value;
            },

            getData = function() {
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
            },

            getFullLyrics = function() {
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
            },

            doTest = function() {
                if (test) {
                    $('form [name="artist"]').val('queen');
                    $('form [name="song"]').val('bohemian rhapsody');
                }
            };

        g.LyricsFinderParseResult = parseResult;
        $form.on('submit', getData);
        $buttonMore.on('click', getFullLyrics);
        doTest();
    });
}(window, document, jQuery));
    