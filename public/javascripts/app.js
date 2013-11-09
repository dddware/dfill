window.App = {
    result: $('.result'),
    range: $('.amount'),
    reload: $('.refresh'),
    counter: $('.lines'),
    link: $('.apiLink'),
    lines: [],

    loadLines: function() {
        var app = this;

        $.ajax({
            url: '/api/' + app.range.attr('max'),
            dataType: 'json',
            async: false,

            success: function(lines) {
                app.lines = lines;
            }
        });
    },

    toggleLines: function(amount) {
        var app = this,
            lines = app.lines;

        if (amount < lines.length) {
            lines = lines.slice(0, amount);
        }

        // DOM updates
        app.result.html(lines.join(' '));
        app.counter.html(amount + ' line' + (amount > 1 ? 's' : '') + (amount == 100 ? '!' : ''));
        app.link.attr('href', app.link.data('href') + amount).text(app.link.attr('href'));

        // Result selection
        if (document.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(app.result[0]);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();            
            var range = document.createRange();
            range.selectNodeContents(app.result[0]);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    },

    init: function() {
        var app = this;

        // DOM listeners
        app.range.on('change click', function() {
            app.toggleLines(app.range.val());
        });

        app.reload.on('click', function() {
            app.loadLines();
            app.range.change();
        }).click();
    }
};

(function($, app)
{
    app.init();
})
(window.jQuery, window.App);