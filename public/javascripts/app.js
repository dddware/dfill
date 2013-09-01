window.App = {
    result: $('.result'),
    range: $('.amount'),
    counter: $('.lines'),
    lines: [],

    init: function() {
        var app = this;

        // API call
        $.ajax({
            url: '/api/' + app.range.attr('max'),
            dataType: 'json',
            async: false,

            success: function(lines) {
                app.lines = lines;
            }
        });

        // Elastic textarea setup
        app.result.css({
            'min-height': app.result.css('height'),
            overflow: 'hidden'
        });

        // Self-calling DOM listener
        app.range.on('change', function() {
            app.toggleLines(app.range.val());
        }).change();
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

        // Elsatic textarea update
        app.result.css('height', 0);
        app.result.css('height', (app.result[0].scrollHeight + parseInt(app.result.css('padding-top')) + parseInt(app.result.css('padding-bottom'))) + 'px');
        app.result.select();
    },
};

(function($, app)
{
    app.init();
})
(window.jQuery, window.App);