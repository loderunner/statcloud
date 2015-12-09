var getQuery = function(url) {
    var params = {};
    var m = url.match(/\?(.*)#?/);
    if (m && m.length === 2) {
        var query = m[1];
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
    }
    return params;
}