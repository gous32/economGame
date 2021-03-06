console.log('Hi!');

var score = 0;
var $score = $('.score');
var $scoreVal = $('.score-body');

$('#user input').keypress(function() {
  let inputs = $('#user input');
  var active = true;
  for (var i = 0; i < inputs.length; i++) {
    active = active && $(inputs[i]).val();
  }

  if (!active) {
    $('#start-game').attr('disabled', 'disabled');
  } else {
    $('#start-game').removeAttr('disabled');
  }
});

$('.score').hide();

function correctAnswer() {
  score += 100;
  $scoreVal[0].innerHTML = score;
}

function incorrectAnswer() {
  score -= 100;
  $scoreVal[0].innerHTML = score;
  if (score < 0) {
    $score.removeClass('btn-success').addClass('btn-danger');
    $('.loose').modal('show');
  }
}

function doWin() {
  $('#rname')[0].innerHTML = $('#name').val();
  $('#rdepartment')[0].innerHTML = $('#department').val();
  $('#rcourse')[0].innerHTML = $('#year').val();
  $('#rgroup')[0].innerHTML = $('#group').val();
  $('#rscore')[0].innerHTML = score;
  $('#rcode')[0].innerHTML = '17DD0A93';

  $('.win').modal('show');
}

$('#start-game').click(function() {
  $('.score').show(500);
  $('.button-row').hide(1000);
  $('#common .content').collapse('hide')
  $('#user').hide(1000);

  setTimeout(showQuestions, 1000);
  setTimeout(startGame, 1700);
});

function showQuestions() {
  $('.imggg').show(500);
  $('.question:not(#text-example)').show(500);
}

function startGame() {
  $('#q1 .content').show(500);
}


function createAnswerFunction(idQuestion, node, correctNum, idNext, bigNum) {
  return function(ev) {
    var $question = $('#' + idQuestion);
    var $buttons = $('button', $question);
    $buttons.attr('disabled', 'disabled');

    if ($(this).attr('data-num') === '' + correctNum) {
      $question.removeClass('panel-default').addClass('panel-success');
      scores[bigNum] = true;
    } else {
      $question.removeClass('panel-default').addClass('panel-danger');
      scores[bigNum] = scores[bigNum] || false;
    }

    $buttons.filter('[data-num=' + correctNum + ']').addClass('btn-success');
    $buttons.filter(':not([data-num=' + correctNum + '])').addClass('btn-danger');
    $buttons.removeClass('btn-default');
    $('#' + idNext + ' .content').show(500);
    $('button', $('#' + idNext + ' .content')).removeAttr('disabled');
  }
}

var counter = 1;

function createTestQuestion(data, bigNum, isLast) {
  if (counter !== 1) {
    $('.imgg').remove();
  }
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
      .click(createAnswerFunction(id, $('button', $btnClone)[0], data.correct, 'q' + counter, bigNum));
    if (isLast) {
      $('button', $btnClone).click(function() {
        if (scores[bigNum] === true) {
          correctAnswer();
        } else {
          incorrectAnswer();
        }
      });
    }
  }
  $btn.remove();
  $clone.insertBefore($('#text-example'));
  $('.questions-container').append($clone);
}

function createBigQuestion(correct, bigNum, isLast) {
  var $node = $('#q' + counter);
  var $input = $('input', $node);
  var $btn = $('button', $node);
  var next = counter + 1;
  counter++;

  $btn.click(function() {
    var val = $input.val();
    if ('' + val === '' + correct) {
      $node.removeClass('panel-default').addClass('panel-success');
      $btn.removeClass('btn-default').addClass('btn-success');
      correctAnswer();
    } else {
      $node.removeClass('panel-default').addClass('panel-danger');
      $btn.removeClass('btn-default').addClass('btn-danger');
      incorrectAnswer();
    }

    $btn.attr('disabled', 'disabled');
    $('#q' + next + ' .content').show(500);

    if (isLast && score >= 0) {
      doWin();
    }
  });
  $('.questions-container').append($node);
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

datas2 = [
  {
    head: "Вопрос 3.1",
    texts: [
      "Если объект приносит нестабильно изменяющийся поток доходов, то какой метод целесообразно использовать для его оценки:",
      "а) метод избыточных прибылей;",
      "б) метод капитализации дохода;",
      "в) метод чистых активов;",
      "г) метод дисконтированных денежных потоков.",
    ],
    answers: [
      "а",
      "б",
      "в",
      "г",
    ],
    correct: 3
  },

  {
    head: "Вопрос 3.2",
    texts: [
      "Что из ниже перечисленного не соответствует определению ликвидационной стоимости?",
      "а) стоимость, рассчитанная на основе реализации активов предприятия по отдельности;",
      "б) это разность между выручкой от продажи активов предприятия и издержками по ликвидации;",
      "в) стоимость, рассчитанная на конкретную дату;",
      "г) стоимость, учитывающая индивидуальные требования конкретного инвестора."
    ],
    answers: [
      "а",
      "б",
      "в",
      "г",
    ],
    correct: 3
  },

  {
    head: "Вопрос 3.3",
    texts: [
      "Преимущества сравнительного подхода, применяемого к оценке бизнеса, заключается в том, что подход:",
      "а) учитывает ожидаемые доходы;",
      "б) может быть использован для оценки объектов специального назначения, не имеющих аналогов;",
      "в) основан на оценке остаточной стоимости существующих активов;",
      "г) не требует разносторонней финансовой информации; ",
      "д) учитывает соотношение реального спроса и предложения на конкретные объекты.",
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

  {
    head: "Вопрос 3.4",
    texts: [
      "К недостатку метода дисконтированных денежных потоков относится:",
      "а) игнорирование перспектив развития бизнеса; ",
      "б) трудности при разработке прогнозов доходов; ",
      "в) трудности с получением данных о продажах сопоставимых предприятий;",
      "г) трудности, обусловленные сложностью расчета рыночных мультипликаторов."
    ],
    answers: [
      "а",
      "б",
      "в",
      "г",
    ],
    correct: 1
  },

  {
    head: "Вопрос 3.5",
    texts: [
      "Из нижеперечисленных укажите данные, которые не требуются для расчета ставки дисконтирования по модели оценки капитальных активов. ",
      "а) безрисковая ставка дохода; ",
      "б) страновой риск;",
      "в) коэффициент b;",
      "г) доля собственного капитала;",
      "д) все данные необходимы для расчета."
    ],
    answers: [
      "а",
      "б",
      "в",
      "г",
      "д"
    ],
    correct: 3
  },

  {
    head: "Вопрос 3.6",
    texts: [
      "Какие показатели из нижеперечисленных учитываются со знаком “плюс” при расчёте денежного потока, приносимого собственным капиталом?",
      "а) уменьшение товарно-материальных запасов;",
      "б) увеличение дебиторской задолженности;",
      "в) уменьшение кредиторской задолженности;",
      "г) увеличение капитальных вложений;",
      "д) все ответы неверны.",
    ],
    answers: [
      "а",
      "б",
      "в",
      "г",
      "д"
    ],
    correct: 0
  },
]

datas3 = [
  {
    head: "Вопрос 6.1",
    texts: [
      "Какие показатели из нижеперечисленных учитываются со знаком “плюс” при расчёте денежного потока, приносимого собственным капиталом?",
      "а) уменьшение товарно-материальных запасов;",
      "б) увеличение дебиторской задолженности;",
      "в) уменьшение кредиторской задолженности;",
      "г) увеличение капитальных вложений;",
      "д) все ответы неверны.",
    ],
    answers: [
      "а",
      "б",
      "в",
      "г",
      "д"
    ],
    correct: 0
  },

  {
    head: "Вопрос 6.2",
    texts: [
      "К недостаткам затратного метода можно отнести:",
      "а) метод не может быть применен для объектов любого типа;",
      "б) трудности с получением данных о продажах сопоставимых объектов;",
      "в) метод не может быть использован для оценки новых объектов;",
      "г) метод не учитывает перспектив развития объекта и будущие доходы. ",
    ],
    answers: [
      "а",
      "б",
      "в",
      "г",
    ],
    correct: 3
  },

  {
    head: "Вопрос 6.3",
    texts: [
      'Развитие оценочной деятельности с 1990 по 1996 год было вызвано, в основном:',
      'а) решениями  Правительства Российской Федерации о развитии оценочной. деятельности,',
      'б) массовой приватизацией и переходом страны на рыночный путь развития.',
      'в) применением учеными новейших методических разработок в области оценки.',
    ],
    answers: [
      "а",
      "б",
      "в",
    ],
    correct: 1
  },

  {
    head: "Вопрос 6.4",
    texts: [
      'Собственность – это:',
      'а) право лица пользоваться объектом материального мира.',
      'б)  система отношений лиц к объектам материального мира в процессе производства, распределения, обмена и потребления.',
      'в) система взаимоотношений лиц применительно к материальным и нематериальным объектам в процессе производства, распределения, обмена и потребления, выраженная в форме юридических норм, правил поведения и морали.',
      'г\  система взаимоотношений лиц применительно к объектам материального мира в процессе производства, распределения, обмена и потребления, выраженная в форме моральных навыков. '
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
    head: "Вопрос 6.5",
    texts: [
      "Из нижеперечисленных укажите данные, которые не требуются для расчета ставки дисконтирования по модели оценки капитальных активов. ",
      "а) безрисковая ставка дохода; ",
      "б) страновой риск;",
      "в) коэффициент b;",
      "г) доля собственного капитала;",
      "д) все данные необходимы для расчета."
    ],
    answers: [
      "а",
      "б",
      "в",
      "г",
      "д"
    ],
    correct: 3
  }
]

datas4 = [
  {
    head: "Вопрос 9.1",
    texts: [
      'Какой из методов оценки в наилучшей степени подходит при определении стоимости промышленного предприятия, акции которого не котируются на фондовом рынке? ',
      'А) дисконтированного денежного потока;',
      'Б) рынка капитала;',
      'В) накопления активов.',
    ],
    answers: [
      "а",
      "б",
      "в",
    ],
    correct: 2
  },

  {
    head: "Вопрос 9.2",
    texts: [
      'Внутренняя (фундаментальная, истинная ) стоимость зависит от того, насколько внутренние характеристики инвестиций:',
      'А)  соответствуют целям конкретного инвестора;',
      'Б)  соответствуют целям потенциального инвестора;',
      'В) трактуются тем или иным аналитиком;',
      'Г) соответствуют целям собственника бизнеса.',
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
    head: "Вопрос 9.3",
    texts: [
      'Датой оценки бизнеса может быть: ',
      'А) конкретная дата;',
      'Б) несколько дат;',
      'В) событие, время свершения которого еще не определено;',
      'Г) событие будущего периода.',
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
    head: "Вопрос 9.4",
    texts: [
      'Инвестиционная стоимость может быть:',
      'А) больше рыночной стоимости;',
      'Б) меньше рыночной стоимости;',
      'В) равна рыночной стоимости;',
      'Г) либо больше, либо меньше, либо равна – в зависимости от условий инвестирования.',
    ],
    answers: [
      "а",
      "б",
      "в",
      "г",
    ],
    correct: 3
  },

  {
    head: "Вопрос 9.5",
    texts: [
      'Тремя наиболее распространенными подходами к оценке бизнеса являются: ',
      'А) по балансовой стоимости, по скорректированной балансовой стоимости, рыночный;',
      'Б) доходный, по балансовой стоимости, рыночный;',
      'В) затратный, сравнительный, по избыточной прибыли;',
      'Г) доходный, затратный, сравнительный;',
      'Д) по балансовой стоимости, затратный, рыночный.',
    ],
    answers: [
      "а",
      "б",
      "в",
      "г",
      "д"
    ],
    correct: 3
  }
]

var scores = [];


createTestQuestion(datas[0], 0);
createTestQuestion(datas[1], 0);
createTestQuestion(datas[2], 0);
createTestQuestion(datas[3], 0);
createTestQuestion(datas[4], 0, true);

createBigQuestion(17177, 1);

createTestQuestion(datas2[0], 2);
createTestQuestion(datas2[1], 2);
createTestQuestion(datas2[2], 2);
createTestQuestion(datas2[3], 2);
createTestQuestion(datas2[4], 2);
createTestQuestion(datas2[5], 2, true);

createBigQuestion(68875, 4);
createBigQuestion(939, 5);

createTestQuestion(datas3[0], 6);
createTestQuestion(datas3[1], 6);
createTestQuestion(datas3[2], 6);
createTestQuestion(datas3[3], 6);
createTestQuestion(datas3[4], 6, true);

createBigQuestion(927, 7);
createBigQuestion(310, 8);

createTestQuestion(datas4[0], 9);
createTestQuestion(datas4[1], 9);
createTestQuestion(datas4[2], 9);
createTestQuestion(datas4[3], 9);
createTestQuestion(datas4[4], 9, true);

createBigQuestion(6, 10, true);
