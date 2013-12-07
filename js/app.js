(function (g, d, $, u){
    var
        songTitle = '',
        $buffer = $('<div>'),
        $container = $('#container'),
        song = '',
        API_KEY = '9daed1547c54b5d6236a7a61635e80',
        url = 'http://api.lyricsnmusic.com/songs?api_key=' + API_KEY + '&q=',

        onJsonpCallback;

    onJsonpCallback = function(results) {
            var japierdole = false;
            console.log(results);
            japierdole = true;



            console.log('wtf');
        };

    g.API_KEY = API_KEY;
    g.url = url;
    g.$buffer = $buffer;

    g.utils.load('js/requestCrossDomain.js');



    $('form').on('submit', function() {
        songTitle = $('form [name="songTitle"]').val();
        url += songTitle;
        url += '&callback=onJsonpCallback'

        // $.getJSON(url, function(results) {
        //     console.log(results);
        // });


        $.ajax({
            url: url,
            crossDomain: true,
            dataType: 'jsonp',
            jsonp: false,
            jsonpCallback: 'onJsonpCallback'
        });
        
        requestCrossDomain(url, function(results) {  
        //     console.log(results);
            // $buffer.html(results);
            // console.log($buffer.html());
            // song = $buffer.find('pre[itemprop="description"]').text();
            // $container.text(song);
       });

        return false;
    });
}(window, document, jQuery));
    