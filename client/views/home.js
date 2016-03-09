Template.home.rendered = function () {
  $(document).ready(function(){
    // init materialize forms on shout page
    $('select').material_select();
    $('ul.tabs').tabs();
    // good lord.. it finally works
    $('.primary-viewport, .outer-container').height($(window).height() - 98);
    $( window ).resize(function() {
      $('.primary-viewport, .outer-container').height($(window).height() - 98);
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
      Materialize.toast('Our live audio stream is now loading, please wait... <3', 5000);
    } else {
      audioElement[0].src = "";
      audioElement[0].load();
    }

  },

  'submit form': function(e) {
    e.preventDefault();

    var formData = {
      //get the data from your form fields
    };

    //get the captcha data
    var captchaData = grecaptcha.getResponse();

    Meteor.call('formSubmissionMethod', formData, captchaData, function(error, result) {
      // reset the captcha
      grecaptcha.reset();

      if (error) {
        console.log('There was an error: ' + error.reason);
      } else {
        console.log('Success!');
      }
    });
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