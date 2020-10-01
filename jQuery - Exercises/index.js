// Styles
$('#btn1').click(function () {
  $('h1').css('font-family', 'sans-serif');
});

// Classes
$('#btn2').click(function () {
  $('h1').addClass('big-title');
});

// Text
$('#btn3').click(function () {
  $('h1').html('<em>Good Bye</em>');
});

// Attributes
$('#btn4').click(function () {
  $('a').attr('href', 'https://ryantoddgarza.com');
  $('a').text($('a').attr('href'));
});

// Event listeners
$(document).keydown(function ({ key }) {
  $('h1').text(key);
});

// Adding elements
$('#btn5').click(function () {
  $('h1').after('<h2>new element</h2>');
});

// Animate
$('#btn6').click(function () {
  $('h1').slideToggle();
});
