// PageManager v1.0.0
(function (g, d, u){
    var PageManager = function(pages) {
        this.hash = [];
        this.all = $();

        _.forEach(pages, function(page, name) {
            this[name] = page;
            this.hash.push(name);
            this.all = this.all.add(page)
        }, this);
        console.log(this.all);
    };

    PageManager.prototype.show = function(show) {
        var
            self = this,
            current = this.all.filter(':visible').attr('id');

        if (current !== this.previous) {
            this.previous = current;
        }

        console.log(this.previous);

        _.forEach(this.hash, function(name) {
            if (show !== name) {
                this[name].animate({
                    opacity: 0
                }, function() {
                    $(this).addClass('hidden');
                    self[show].removeClass('hidden').animate({
                        opacity: 1
                    });
                });
            }
        }, this);
    };

    g.PageManager = PageManager;
}(window, document));
