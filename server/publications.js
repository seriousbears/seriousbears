Meteor.startup(function () {
  Meteor.publish("bearchat", function () {
    return BearChat.find({}, {sort: {createdAt: -1}, limit: 50});
  });
}); 