// define some globals for use throughout..
QUAKEIRC = {};
TWITCHIRC = {};

Meteor.startup(function () {

  // init reCaptcha
  reCAPTCHA.config({
    privatekey: '6LeuahoTAAAAAKHnENaDOI6KecpzLMmxsycVQdsc'
  });

  _addQuakeNetListener = function(callback) {
    QUAKEIRC = new irc.Client('irc.quakenet.org', 'williamBot', {
      channels: ['#seriousbears'],
    });

    QUAKEIRC.addListener('message', function (from, to, message) {
      console.log(from + ' => ' + to + ': ' + message);
      callback(from, to, message);
    });
  };

  _addTwitchListener = function(callback) {
    TWITCHIRC = new irc.Client('irc.twitch.tv', 'seriousbears', {
      port: 6667,
      localAddress: null,
      password: "oauth:i8bbl0i7wojnaeqswbinhb2yythlz3",
      debug: true,
      showErrors: true,
      autoRejoin: true,
      autoConnect: true,
      nick: 'seriousbears',
      userName: 'seriousbears',
      realName: 'SeriousBears IRC Boucner',
      channels: ['#seriousbears'],
      secure: false,
      selfSigned: false,
      certExpired: false,
      floodProtection: false,
      floodProtectionDelay: 1000,
      sasl: true,
      stripColors: false,
      channelPrefixes: "&#",
      messageSplit: 512,
      encoding: ''
    });

    TWITCHIRC.addListener('message', function (from, to, message) {
      console.log(from + ' => ' + to + ': ' + message);
      callback(from, to, message);
    });
  };

  var boundQuakeInsert = Meteor.bindEnvironment(function(from, to, message) {
    BearChat.insert({
      createdAt: new Date(),
      from: from,
      to: to,
      message: message,
    });
    // additionally.. execute IRC bounce in same scope..
    bounceTwitch(from, to, message);
  });

  var boundTwitchInsert = Meteor.bindEnvironment(function(from, to, message) {
    BearChat.insert({
      createdAt: new Date(),
      from: from,
      to: to,
      message: from + " (TTV) => " + message,
    });
    // additionally.. execute IRC bounce in same scope..
    bounceQuakeNet(from, to, message);
  });

  function bounceQuakeNet(from, to, message) {
    QUAKEIRC.say('#seriousbears', from + " (TTV) => " + message);
    return;
  }

  function bounceTwitch(from, to, message) {
    TWITCHIRC.say('#seriousbears', from + " (QUAKENET) => " + message);
    return;
  }

  _addQuakeNetListener(boundQuakeInsert);
  _addTwitchListener(boundTwitchInsert);

  Meteor.methods({

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
      QUAKEIRC.say('#seriousbears', "incoming " + formData.category + " from " + formData.name + ": " + formData.message);
      return true;
    }
  });

});