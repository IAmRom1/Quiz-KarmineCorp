class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer(choices) {
    return choices === this.answer;
  }
}

const questions = [
  new Question(
    "Quelle est la date de création de la Karmine Corp ?",
    ["16 novembre 2020", "30 mars 2020", "23 décembre 2020", "05 février 2021"],
    "16 novembre 2020"
  ),
  new Question(
    "Qui n'est pas l'un des CEO de la structure ?",
    ["Kamel Kebir", "Amine Mekri", "Xavier Oswald", "Arthur Perticoz"],
    "Xavier Oswald"
  ),
  new Question(
    "Contre quelle équipe la Karmine Corp a réalisé une remontada en demi-finale des EUMaster ?",
    ["Fnatic", "Vitality", "LDLC", "Solary"],
    "Vitality"
  ),
  new Question(
    "Sur quel jeu l'équipe a remporté le plus de *trophées* ?",
    ["League of Legend", "Rocket League", "Teamfight Tactics", "Valorant"],
    "League of Legend"
  ),
];

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

const display = {
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choices: function () {
    let choices = quiz.getCurrentQuestion().choices;

    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp();
      };
    };
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function () {
    this.elementShown(
      "progress",
      `Question ${quiz.currentQuestionIndex + 1} sur ${quiz.questions.length}`
    );
  },
  endQuiz: function () {
    let endQuizHTML = `<h1>Quiz terminé !</h1
    <h3>Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
    this.elementShown("quiz", endQuizHTML);
  },
};

quizApp = () => {
  if (quiz.hasEnded()) {
    display.endQuiz();
  } else {
    display.question();
    display.choices();
    display.progress();
  }
};

let quiz = new Quiz(questions);
quizApp();
/***************************************
 * HTTPS://QUIZKCORP.ROMAINSAVIGNY.BE/ *
 *      HTTPS://ROMAINSAVIGNY.BE/      *
 ***************************************/