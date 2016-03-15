// define some globals for use throughout..
QUAKEIRC = {};
TWITCHIRC = {};

Meteor.startup(function () {

  // init reCaptcha
  reCAPTCHA.config({
    privatekey: _privateGlobalCaptchaKEY // redacted from git repo.. string value for Google reCaptcha private key
  });

  _addQuakeNetListener = function(callback) {
    QUAKEIRC = new irc.Client('irc.quakenet.org', _QuakeNetNickname, {
      debug: false,
      showErrors: true,
      channels: _QuakeNetChannelArray,
    });

    // add listener for QuakeNet messages
    QUAKEIRC.addListener('message', function (from, to, message) {
      console.log(from + ' => ' + to + ': ' + message);
      callback(from, to, message);
    });

    // catch any errors created by QuakeNet
    QUAKEIRC.addListener('error', function(message) {
      console.log('error: ', message);
    });

  };

  _addTwitchListener = function(callback) {
    TWITCHIRC = new irc.Client('irc.twitch.tv', _TwitchNickname, {
      port: 6667,
      localAddress: null,
      password: _privateGlobalTwitchOAUTH, // redacted from git repo.. string value of Twitch OAUTH
      debug: false,
      showErrors: true,
      autoRejoin: true,
      autoConnect: true,
      nick: _TwitchNickname,
      userName: _TwitchNickname,
      realName: 'SeriousBears IRC Boucner',
      channels: _TwitchChannelArray,
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

    // catch any errors created by Twitch
    TWITCHIRC.addListener('error', function(message) {
      console.log('error: ', message);
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
      message: "(TTV) " + from + ": " + message,
    });
    // additionally.. execute IRC bounce in same scope..
    bounceQuakeNet(from, to, message);
  });

  function bounceQuakeNet(from, to, message) {
    QUAKEIRC.say(_QuakeNetChannelString, "(TTV) " + from + ": " + message);
    return;
  }

  function bounceTwitch(from, to, message) {
    TWITCHIRC.say(_TwitchChannelString, "(QNET) " + from + ": " + message);
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
      QUAKEIRC.say(_QuakeNetChannelString, "incoming " + formData.category + " from " + formData.name + ": " + formData.message);
      return true;
    }
  });

});