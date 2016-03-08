IRC = {};

/*
Meteor.startup(function () {

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
    }
  });

});

*/