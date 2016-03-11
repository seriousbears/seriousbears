IRC = {};

Meteor.startup(function () {

  // init reCaptcha
  reCAPTCHA.config({
    privatekey: '6LeuahoTAAAAAKHnENaDOI6KecpzLMmxsycVQdsc'
  });

  _addListener = function(callback) {
    IRC = new irc.Client('irc.quakenet.org', 'WilliamtonBear', {
      channels: ['#seriousbears'],
    });

    IRC.addListener('message', function (from, to, message) {
      console.log(from + ' => ' + to + ': ' + message);
      callback(from, to, message);
    });
  };

  var boundFunction = Meteor.bindEnvironment(function(from, to, message) {
    BearChat.insert({
      createdAt: new Date(),
      from: from,
      to: to,
      message: message
    });
  });

  _addListener(boundFunction);


  Meteor.methods({
    youClickedMe: function () {
      IRC.say('#seriousbears', "WHY WOULD YOU PRESS THE BUTTON?!!??!");
      return;
    }, 

    formSubmissionMethod: function(formData, captchaData) {

      var getClientIP = this.connection.clientAddress;
      var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData);

      if (!verifyCaptchaResponse.success) {
        console.log('reCAPTCHA check failed!', verifyCaptchaResponse);
        console.log(getClientIP);

        throw new Meteor.Error(422, 'reCAPTCHA Failed: ' + verifyCaptchaResponse.error);
      } else
        console.log('reCAPTCHA verification passed!'); console.log(getClientIP);

      //do stuff with your formData
      console.log(formData.name);
      console.log(formData.category);
      console.log(formData.message);
      IRC.say('#seriousbears', "incoming " + formData.category + " from " + formData.name + ": " +  formData.message);
      return true;
    }
  });

});