SC.initialize(config);

$(document).ready(function() {
    $('#login-button').click(function(event) {
        var n = SC.connect().then(function(){
            return SC.get('/me');
        }).then(function(me){
            console.log(me);
        });
    });
});