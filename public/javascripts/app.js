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
                app.resultBlock.css('height', ($that[0].scrollHeight + parseInt($that.css('padding-top')) + parseInt($that.css('padding-bottom'))) + 'px');
                app.resultBlock.select();
            });
        }
    };

    App.amountSelect.on('change', function() {
        App.resultBlock.css({
            'min-height': $that.css('height'),
            overflow: 'hidden'
        });

        App.loadLines($(this).val());
    }).change();
})
(jQuery);