


function Quiz() {
  this.questions = [];
  this.questionIndex = 0;
  this.score = 0
}

Quiz.prototype.next = function() {
  this.questionIndex++;
  if(this.nowPlayingIndex === this.questions.length) {
    //add something here
  }

};

Quiz.prototype.add = function(question) {
  this.questions.push(questions);
};


Playlist.prototype.renderIn = function() {

};