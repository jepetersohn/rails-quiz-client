//-----QUESTION MODULE-----
var Question = (function() {
  var _render = function(question) {
    var handlebarTemplate = $('#question').html();
    var template = Handlebars.compile(handlebarTemplate);
    return template(question);
    // return question.question + "<form method='post' action='/questions/" + question.question_id + "/answers.json'>" + Choice.renderAll(question.choices) + "<input type='submit' value='Submit answer'><input type='hidden' name='session_key' value='" + sessionKey + "'></form>";
  }

  var _appendQuestion = function(json) {
    quizId = json.question.choices[0].quiz_id;
    $("#quiz" + quizId + " .question").html(_render(json));
  }

  var _appendError = function() {
    $(".errors").append("Question not found!");
    setInterval(function() { $(".errors").empty() }, 3000)
  }

  return {
    getNextQuestion: function(quizId) {
      $.ajax({
        type: 'get',
        url: "/quizzes/" + quizId + "/questions/next.json",
        data: { session_key: sessionKey }
      })
      .done(_appendQuestion)
      .fail(_appendError)
    }
  }
})()