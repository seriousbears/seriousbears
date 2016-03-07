Template.bearchat.helpers({
  livefeed: function () {
    // this helper returns a cursor of
    // all of the posts in the collection
    return BearChat.find();
    //{sort: {createdAt: -1}}
  }
});