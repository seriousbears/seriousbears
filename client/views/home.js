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
      audioElement[0].src = "http://radio.seriousbears.net:8000/seriousbears.mp3";
      audioElement[0].play();
    } else {
      audioElement[0].src = "";
      audioElement[0].load();
    }

  },

  'emptied #bearstream': function(){
    console.log("The emptied event fired..");
    $( "#btn_icon" ).removeClass();
    $( "#btn_icon" ).addClass("fa fa-volume-up");
  },
  'playing #bearstream': function(){
    console.log("The playing event fired..");
    $( "#btn_icon" ).removeClass();
    $( "#btn_icon" ).addClass("fa fa-pause");
  },
  'pause #bearstream': function(){
    console.log("The pause event fired..");
  },
  'waiting #bearstream': function(){
    console.log("The waiting event fired..");
    $( "#btn_icon" ).removeClass();
    $( "#btn_icon" ).addClass("fa fa-refresh fa-spin");
  },
  'canplay #bearstream': function(){
    console.log("The canplay event fired..");
  }

});