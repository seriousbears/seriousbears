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

    var audioElement = $('#bearstream');
    if (audioElement[0].paused) {
      audioElement[0].play();
    } else {
      audioElement[0].pause();
      audioElement[0].src = "http://radio.seriousbears.net:8000/seriousbears.mp3";
      audioElement[0].currentTime = 0;
    }

  },

  'suspend #bearstream': function(){
    $( "#btn_icon" ).removeClass();
    $( "#btn_icon" ).addClass("fa fa-volume-up");
  },
  'play #bearstream': function(){
    console.log("The play event fired..");
    $( "#btn_icon" ).removeClass();
    $( "#btn_icon" ).addClass("fa fa-refresh fa-spin");
  },
  'pause #bearstream': function(){
    console.log("The pause event fired..");
  },
  'canplay #bearstream': function(){
    console.log("The canplay event fired..");
    $( "#btn_icon" ).removeClass();
    $( "#btn_icon" ).addClass("fa fa-pause");
  }

});