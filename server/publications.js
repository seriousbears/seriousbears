Meteor.startup(function () {
  Meteor.publish("bearchat", function () {
    return BearChat.find();
  });
}); 