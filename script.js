console.log('Hi!');

$('#start-game').click(function() {
  $('.button-row').hide(1000);
  $('#common .content').collapse('hide')
  $('#user').hide(1000);

  setTimeout(showQuestions, 1000);
  setTimeout(startGame, 1700);
});

function showQuestions() {
  $('.question:not(#text-example)').show(500);
}

function startGame() {
  $('#q1 .content').show(500);
}


function createAnswerFunction(idQuestion, node, correctNum, idNext) {
  return function(ev) {
    var $question = $('#' + idQuestion);
    var $buttons = $('button', $question);
    $buttons.attr('disabled', 'disabled');

    if ($(this).attr('data-num') === '' + correctNum) {
      $question.removeClass('panel-default').addClass('panel-success');
    } else {
      $question.removeClass('panel-default').addClass('panel-danger');
    }

    $buttons.filter('[data-num=' + correctNum + ']').addClass('btn-success');
    $buttons.filter(':not([data-num=' + correctNum + '])').addClass('btn-danger');
    $buttons.removeClass('btn-default');
    $('#' + idNext + ' .content').show(500);
  }
}

var counter = 1;

function createTestQuestion(data) {
  var $clone = $('#text-example').clone();
  var id = 'q' + counter;
  counter++;
  $clone.attr('id', id);
  $('a', $clone).attr('aria-controls', '#' + id + ' .content');
  $('a', $clone)[0].innerHTML = data.head;
  $('.content', $clone).attr('aria-labelledby', '#' + id + ' .label');

  var texts = '<p>' + data.texts.join('</p><p>') + '</p>';
  $('.test-text', $clone)[0].innerHTML = texts;

  var $btn = $('.test-btn', $clone);
  for (var i = 0; i < data.answers.length; i++) {
    var $btnClone = $btn.clone().insertBefore($btn);
    $('button', $btnClone)[0].innerHTML = data.answers[i];
    $('button', $btnClone).attr('data-num', i);

    $('button', $btnClone)
      .click(createAnswerFunction(id, $('button', $btnClone)[0], data.correct, 'q' + counter));
  }
  $btn.remove();
  $clone.insertBefore($('#text-example'));
}


datas = [
  {
    head: "Вопрос 1.1",
    texts: [
      "Какой из принципов оценки является основным при проведении оценки бизнеса доходным подходом?",
      "а) замещения",
      "б) конкуренции",
      "в) ожидания",
      "г) наилучшего и наиболее эффективного использования",
    ],
    answers: [
      "а",
      "б",
      "в",
      "г",
    ],
    correct: 2
  },

  {
    head: "Вопрос 1.2",
    texts: [
      "Согласно методу стоимости чистых активов стоимость предприятия равна:",
      "а) суммарной стоимости активов предприятия очищенной от задолженности;",
      "б) суммарной стоимости кредиторской и дебиторской задолженности предприятия;",
      "в) суммарной стоимости капитала предприятия;",
      "г) стоимости пассивов предприятия."
    ],
    answers: [
      "а",
      "б",
      "в",
      "г",
    ],
    correct: 0
  },

  {
    head: "Вопрос 1.3",
    texts: [
      "Когда целесообразно использовать метод дисконтирования денежных потоков:",
      "а) будущие денежные потоки невозможно точно оценить;",
      "б) имеется достаточное количество данных по сопоставимым предприятиям;",
      "в) можно с достаточной долей достоверности оценить будущие денежные потоки предприятия; ",
      "г) компания является новым предприятием. "
    ],
    answers: [
      "а",
      "б",
      "в",
      "г",
    ],
    correct: 2
  },

  {
    head: "Вопрос 1.4",
    texts: [
      "Различие между денежным потоком, рассчитанным для собственного капитала, и денежным потоком для инвестированного капитала заключается в следующем:",
      "а) учитываются заемные средства или нет;",
      "б) учитывается инфляция или нет;",
      "в) как рассчитывается ставка дисконтирования;",
      "г) а) и б);",
      "д) а) и в).",
    ],
    answers: [
      "а",
      "б",
      "в",
      "г",
      "д"
    ],
    correct: 4
  },

  {
    head: "Вопрос 1.5",
    texts: [
      "При расчете ставки дисконтирования по модели средневзвешенной стоимости капитала используются нижеперечисленные данные за исключением:",
      "а) доля заемного капитала;",
      "б) ставка налога на прибыль;",
      "в) коэффициент b;",
      "г) ставка дохода на собственный капитал;",
      "д) все данные необходимы для расчета."
    ],
    answers: [
      "а",
      "б",
      "в",
      "г",
      "д",
    ],
    correct: 4
  },
]

createTestQuestion(datas[0]);
createTestQuestion(datas[1]);
createTestQuestion(datas[2]);
createTestQuestion(datas[3]);
createTestQuestion(datas[4]);
