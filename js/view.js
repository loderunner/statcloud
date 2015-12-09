
$(document).ready(function() {
    $('.alert-container .alert button.close').click(function(e) {
        $(this.parentNode).fadeOut('fast');
    });

    $('#login-button').click(function() {
        login().then(function() {
            $('#activity-button').removeClass('disabled');
        },
        function(reason) {
            $('#alert-container').hidden = false;
            $('#alert-text').text(reason);
        });
    });

    $('#activity-button').click(function() {
        var spinner = new Spinner({
              lines: 9 // The number of lines to draw
            , length: 11 // The length of each line
            , width: 9 // The line thickness
            , radius: 15 // The radius of the inner circle
            , scale: 0.5 // Scales overall size of the spinner
            , corners: 1 // Corner roundness (0..1)
            , color: '#000' // #rgb or #rrggbb or array of colors
            , opacity: 0.25 // Opacity of the lines
            , rotate: 30 // The rotation offset
            , direction: 1 // 1: clockwise, -1: counterclockwise
            , speed: 1 // Rounds per second
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
        .spin($('#stats-button').get(0));

        getActivities().then(function(activities) {
            spinner.stop();
            $('#stats-button').removeClass('disabled');
        }, function() {
            spinner.stop();
        });
    });

    $('#stats-button').click(function() {
        console.log(activities);
    });
});