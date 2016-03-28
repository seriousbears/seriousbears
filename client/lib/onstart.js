Meteor.startup(function() {
  reCAPTCHA.config({
    publickey: '6LcqqRoTAAAAAFtyNXOCy9fkC0IGtw7XkVQMJGVk'
  });

  /*ValidateForm.config({
    debug: true,
    rootLayout: 'home',
  });
  */
  Meteor.Spinner.options = {
    lines: 17, // The number of lines to draw
    length: 10, // The length of each line
    width: 9, // The line thickness
    radius: 40, // The radius of the inner circle
    corners: 0.7, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#F8F8F8', // #rgb or #rrggbb
    speed: 2, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: true, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
  };
});