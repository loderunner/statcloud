SC.initialize({
    client_id : 'd8fed5233037c3f307ebdc1e0da29e4e',
    redirect_uri : 'http://loderunner.github.io/statcloud/callback.html'
  });

$(document).ready(function() {
    $('#login-button').click(function(event) {
        var n = SC.connect().then(function(){
            return SC.get('/me');
        }).then(function(me){
            console.log(me);
        });
    });
});