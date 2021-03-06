
var components;

/**
 * Creates a new component.
 * @param {String} cls Component's class name
 * @return {Object} new jQuery-style DOM element
 */
var _new = function(cls) {
    if (!components) {
        throw new Error("Components not loaded yet.");
    }

    var node = components.find('#' + cls);
    if (node) {
        node = node.clone();
        node.removeAttr('id');
        return node;
    }

    return;
}

$(document).ready(function() {
    $.get('js/components.html', function(data) {
        components = $(data);
    });
});