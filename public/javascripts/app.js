(function($)
{
    var App = {
        resultBlock: $('.result'),
        amountSelect: $('.amount'),

        loadLines: function(amount) {
            var app = this;

            $.getJSON('/api/' + amount, function(json) {
                app.resultBlock.html(json.join(' '));
            });
        }
    };

    App.amountSelect.on('change', function() {
        App.loadLines($(this).val());
    }).change();
})
(jQuery);
