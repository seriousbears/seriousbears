Template.home.rendered = function () {
  $(document).ready(function(){
    $('ul.tabs').tabs();
    // good lord.. it finally works (this line will )
    $('.primary-viewport, .outer-container').height($(window).height() - 120);
    $( window ).resize(function() {
      $('.primary-viewport, .outer-container').height($(window).height() - 120);
    });
  });
};