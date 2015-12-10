
var components;

var _new = function(cls) {
    if (!components) {
        throw "Components not loaded yet.";
        return undefined;
    }

    var node = components.find('#' + cls);
    if (node) {
        node.removeClass(cls);
        return node.clone();
    }

    return undefined;
}

$(document).ready(function() {
    $.get('js/components.html', function(data) {

    });
});