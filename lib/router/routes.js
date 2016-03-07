Router.configure({
  layoutTemplate: 'masterLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'pageNotFound',
  yieldTemplates: {
    // straub ** disable the nav yield from auto inserting on every page
    // nav: {to: 'nav'},
    footer: {to: 'footer'},
  }
});

Router.map(function() {
  this.route('home', {
    path: '/',
    waitOn: function () {
      return Meteor.subscribe("bearchat");
    }
  });

  this.route('bearcommand', function () {
    // straub ** add conditional route for nav placeholder in master_layout.html
    this.render('nav', {to: 'nav'});
    this.render('bearcommand');
  });
});

Router.plugin('ensureSignedIn', {
  only: ['bearcommand']
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
