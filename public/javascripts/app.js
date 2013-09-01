(function($)
{
    var App = {
        resultBlock: $('.result'),
        amountSelect: $('.amount'),

        loadLines: function(amount) {
            var app = this;

            $.getJSON('/api/' + amount, function(json) {
                app.resultBlock.html(json.join(' '));
                app.resultBlock.css('height', '0px');
                app.resultBlock.css('height', (app.resultBlock[0].scrollHeight + parseInt(app.resultBlock.css('padding-top')) + parseInt(app.resultBlock.css('padding-bottom'))) + 'px');
                app.resultBlock.select();
                $('.lineNumber').html(amount+' line' + (amount > 1 ? 's' : ''));
            });
        }
    };

    App.amountSelect.on('change', function() {
        App.resultBlock.css({
            'min-height': $(this).css('height'),
            overflow: 'hidden'
        });

        App.loadLines($(this).val());
    }).change();
})
(jQuery);