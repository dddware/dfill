var autoResizeTextareas = function() {
    $('textarea').each(function() {
        ($that = $(this)).autoResize = function(first) {
            if (first === true) {
                $that.css({
                    'min-height': $that.css('height'),
                    overflow: 'hidden'
                });
            }

            $that.css('height', '0px');
            $that.css('height', ($that[0].scrollHeight + parseInt($that.css('padding-top')) + parseInt($that.css('padding-bottom'))) + 'px');
            
            return $that;
        };

        $that.autoResize(true).on('keyup', function() {
            $that.autoResize();
        });
    });
};