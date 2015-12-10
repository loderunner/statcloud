
var components;

var _new = function(cls) {
    if (!components) {
        throw new Error("Components not loaded yet.");
        return undefined;
    }

    var node = components.find('#' + cls);
    if (node) {
        node = node.clone();
        node.removeAttr('id');
        return node;
    }

    return undefined;
}

$(document).ready(function() {
    $.get('js/components.html', function(data) {
        components = $(data);
    });
});