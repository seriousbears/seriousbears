Meteor.startup(function() {
  reCAPTCHA.config({
    publickey: '6LcqqRoTAAAAAFtyNXOCy9fkC0IGtw7XkVQMJGVk'
  });

  /*ValidateForm.config({
    debug: true,
    rootLayout: 'home',
  });
  */
});