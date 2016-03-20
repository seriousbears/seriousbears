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
});

//Routes
//AccountsTemplates.configureRoute('changePwd');
//AccountsTemplates.configureRoute('enrollAccount');
//AccountsTemplates.configureRoute('forgotPwd');
//AccountsTemplates.configureRoute('resetPwd');
//AccountsTemplates.configureRoute('signIn');
//AccountsTemplates.configureRoute('signUp');
//AccountsTemplates.configureRoute('verifyEmail');
