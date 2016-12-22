console.log('Hi!');

$('#start-game').click(function() {
  $('.button-row').hide(1000);
  $('#common .content').collapse('hide')
  $('#user').hide(1000);

  setTimeout(showQuestions, 1000);
  setTimeout(startGame, 1700);
});

function showQuestions() {
  $('#q1').show(500);
}

function startGame() {
  $('#q1 .content').show(500);

  var $buttons = $('#q1 button');
  for (var i = 0; i < $buttons.length; i++) {
    $($buttons[i]).click(createAnswerFunction('q1', $buttons[i], 1));
  }
}


function createAnswerFunction(idQuestion, node, correctNum) {
  return function(ev) {
    var $question = $('#' + idQuestion);
    var $buttons = $('button', $question);
    $buttons.attr('disabled', 'disabled');

    if (this === node) {
      $question.removeClass('panel-default').addClass('panel-success');
    } else {
      $question.removeClass('panel-default').addClass('panel-danger');
    }

    $buttons.filter('[data-num=' + correctNum + ']').addClass('btn-success');
    $buttons.filter(':not([data-num=' + correctNum + '])').addClass('btn-danger');
    $buttons.removeClass('btn-default');
  }
}