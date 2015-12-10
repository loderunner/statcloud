var favorites = [];

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

var _getFavorites = function(params, resolve, reject) {
    SC.get('/me/favorites', params)
        .then(function(value) {
            favorites = favorites.concat(value.collection);
            if (value.hasOwnProperty('next_href')) {
                _getfavorites(getQuery(value.next_href), resolve, reject);
            } else {
                resolve(favorites);
            }
        }, function(reason) {
            reject(reason);
        });
}

var getFavorites = function() {
    return new Promise(function(resolve, reject) {
        _getFavorites({limit : 200, linked_partitioning : 1}, resolve, reject);
    });
};