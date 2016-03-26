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
    $(".primary-viewport").mCustomScrollbar({
      autoHideScrollbar: true, 
      scrollInertia: 0,
      autoDraggerLength: false,
      documentTouchScroll: true,
      theme:"minimal-dark",
      mouseWheel:{
        deltaFactor: 20,
        scrollAmount: 40,
        normalizeDelta: false
      }
    });
  });
};

Template.home.events({

  'click #infotab': function(){
    console.log("You clicked the information tab.");
    $("body").css("background", "none");
  },

  'click #shouttab': function(){
    console.log("You clicked the shout tab.");
    $("body").css("background", "none");
  },

  'click #livetab': function(){
    console.log("You clicked the live tab.");
    $("body").css("background", "url('/imgs/WILLBG90.png') no-repeat center center fixed");
  },

  'click #followtab': function(){
    console.log("You clicked the follow tab.");
    $("body").css("background", "none");
  },

  'submit form': function(e) {
    e.preventDefault();
    var isValid = ValidateForm.validate('#shoutform');
    if (!isValid){
      console.log("submission blocked..");
      swal("Bear with us!", "Please complete all of the fields above prior to submission.", "error");
      return;
    }else if (isValid){

      var formData = {
        // Get values from form element
        name: e.target.bear_name.value,
        category: e.target.bear_category.value,
        message: e.target.bear_message.value
      };

      //get the captcha data
      var captchaData = grecaptcha.getResponse();

      Meteor.call('formSubmissionMethod', formData, captchaData, function(error, result) {
        // reset the captcha
        grecaptcha.reset();

        if (error) {
          console.log('There was an error: ' + error.reason);
          swal("Bear with us!", "The human verification was unsuccessful. Check the reCaptcha box and try again.", "error");
        } else {
          console.log('Success!');
          e.target.bear_name.value = "";
          e.target.bear_category.value = "";
          e.target.bear_message.value = "";
          $('#bear_category').material_select();
          $('ul.tabs').tabs('select_tab', 'live');
        }
      });

    }else{console.log("**VALIDATION** something bad happened.")}

  },

  'click #btn_bearstream': function(){
    console.log("You clicked the bearstream button.");

    var audioElement = $('#bearstream');

    if (audioElement[0].paused) {
      audioElement[0].play();
      Materialize.toast('Our live audio stream is now loading, please wait... <3', 5000);
    } else {
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