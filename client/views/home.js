Template.home.rendered = function () {
  $(document).ready(function(){
    $('ul.tabs').tabs();
    // good lord.. it finally works
    $('.primary-viewport, .outer-container').height($(window).height() - 120);
    $( window ).resize(function() {
      $('.primary-viewport, .outer-container').height($(window).height() - 120);
    });
  });
};

Template.home.events({
  'click #btn_bearstream': function(){
    console.log("You clicked the bearstream button.");

    var audioElement = document.getElementById("bearstream");
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
      audioElement.src = "http://radio.seriousbears.net:8000/seriousbears.mp3";
      audioElement.currentTime = 0;
    }

  }
});