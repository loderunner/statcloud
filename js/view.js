
var displayAlert = function(message, type) {
    if (!type) {
        type = 'danger';
    }

    var alrt = _new('Alert');
    alrt.addClass('alert-' + type)
    alrt.find('.alert-text').text(message);

    alrt.find('button.close').click(function () { 
        $(this.parentNode).stop(true).fadeOut('fast', function() {
            $(this).remove();
        });
    });

    if (type === 'success') {
        alrt.delay(3000).fadeOut('slow', function() {
            $(this).remove();
        });
    }

    $('#alert-container .container').prepend(alrt);
}

$(document).ready(function() {

    $('#login-button').click(function() {
        login().then(function() {
            $('#favorite-button').removeClass('disabled');
        },
        function(reason) {
            displayAlert(reason);
        });
    });

    $('#favorite-button').click(function() {
        var spinner = new Spinner({
          lines: 11 // The number of lines to draw
        , length: 22 // The length of each line
        , width: 6 // The line thickness
        , radius: 25 // The radius of the inner circle
        , scale: 0.25 // Scales overall size of the spinner
        , corners: 1 // Corner roundness (0..1)
        , color: '#000' // #rgb or #rrggbb or array of colors
        , opacity: 0.25 // Opacity of the lines
        , rotate: 0 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 1.7 // Rounds per second
        , trail: 60 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '50%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning
        })
        .spin($('#favorite-button-span')[0]);

        $('#favorite-button').addClass('disabled');

        getFavorites().then(function(favorites) {
            spinner.stop();
            $('#favorite-button').removeClass('disabled');
            $('#stats-button').removeClass('disabled');

            displayAlert('Success', 'success');
        }, function(reason) {
            spinner.stop();
            $('#favorite-button').removeClass('disabled');
        });
    });

    $('#stats-button').click(function() {
        _.each(topGenres(), function(genre) {
            $('#main-container').append($('<div>' + genre + '</div>'));
        });
    });
});