function Question(question, options,answer) {
  this.question = question;
  this.options = options;
  this.answer = answer;

}

Question.prototype.correctAnswer = function(option) {
  return (this.answer === option);
};
