jQuery.noConflict();
jQuery(window).resize(function () {
    app.onResize()
});
jQuery(document).ready(app.startIntro());