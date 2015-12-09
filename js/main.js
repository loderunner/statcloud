
var initSoundcloud = function() {
    config.oauth_token = window.localStorage.getItem('access_token');
    SC.initialize(config);
}

var tokenChanged = function(e) {
    if (e.key === 'access_token') {
        initSoundcloud();
    }
};

var login = function() {
    initSoundcloud();
    SC.connect();
}

var activities;

var getActivities = function(params) {
    if (!params) {
        params = {limit : 200};
    }

    SC.get('/me/activities', params)
    .then(function(value) {
        if (value.hasOwnProperty('next_href')) {
            getActivities(getQuery(value.next_href));
        } else {
            $('#stats-button').removeClass('disabled');
        }
    });
};

$(document).ready(function() {
    window.addEventListener('storage', tokenChanged);

    $('#login-button').click(function() {
        login();
    });

    $('#activity-button').click(function() {
        getActivities();
    });
});