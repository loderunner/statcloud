var activities = [];

var login = function() {
    if (window.localStorage.access_token) {
        config.oauth_token = window.localStorage.access_token;
    }
    SC.initialize(config);
    return SC.connect().then(function(res) {
        if (res.oauth_token) {
            window.localStorage.access_token = res.oauth_token;
        }
    });
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