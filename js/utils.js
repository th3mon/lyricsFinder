(function (g, d, $, u){
    var
        utils = {},

        loadStyleSheet = function(url) {
            var
                linkElement = d.createElement('link');
                linkElement.setAttribute('rel', 'stylesheet');
                linkElement.setAttribute('href', url);

            document.getElementsByTagName('head')[0].appendChild(linkElement);
        },

        loadScript = function(url) {
            var
                scriptElement = d.createElement('script');
                scriptElement.setAttribute('src', url);

            document.getElementsByTagName('body')[0].appendChild(scriptElement);
        };

    utils.load = function(url) {
        if ((/\.css$/ig).test(url)) {
            loadStyleSheet(url);
        }

        if ((/\.js$/ig).test(url)) {
            loadScript(url);
        };
    };

    g.utils = utils;
}(window, document, jQuery));
    