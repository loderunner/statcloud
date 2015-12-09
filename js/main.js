var activities = [];

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

var _getActivities = function(params, resolve, reject) {
    SC.get('/me/activities', params)
        .then(function(value) {
            activities = activities.concat(value.collection);
            if (value.hasOwnProperty('next_href')) {
                _getActivities(getQuery(value.next_href), resolve, reject);
            } else {
                resolve(activities);
            }
        }, function(reason) {
            reject(reason);
        });
}

var getActivities = function() {
    var p = new Promise(function(resolve, reject) {
        _getActivities({limit : 200}, resolve, reject);
    });

    return p;
};

$(document).ready(function() {
    window.addEventListener('storage', tokenChanged);

    $('#login-button').click(function() {
        login();
    });

    $('#activity-button').click(function() {
        var spinner = new Spinner({
            position : 'relative'
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