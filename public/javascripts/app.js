(function($)
{
    var App = {
        resultBlock: $('.result'),
        amountSelect: $('.amount'),

        loadLines: function(amount) {
            var app = this;

            $.getJSON('/api/' + amount, function(json) {
                app.resultBlock.html(json.join(' '));
                autoResizeTextareas();
                $('.result').select();
            });
        }
    };

    App.amountSelect.on('change', function() {
        App.loadLines($(this).val());
    }).change();
})
(jQuery);