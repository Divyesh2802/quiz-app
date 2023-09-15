const questions = [
  {
    question: "Identify the next number in this sequence: 2, 4, 6, 8, __.",
    answers: [
      { text: "10", correct: true},
      { text: "12", correct: false},
      { text: "14", correct: false},
      { text: "16", correct: false}
    ]
  },
  {
    question: "How many sides does a triangle possess?",
    answers: [
      { text: "2", correct: false},
      { text: "3", correct: true},
      { text: "4", correct: false},
      { text: "5", correct: false}
    ]
  },
  {
    question: "Among the options, which number is the largest prime number?",
    answers: [
      { text: "2", correct: false},
      { text: "15", correct: false},
      { text: "17", correct: false},
      { text: "31", correct: true}
    ]
  },
  {
    question: "Determine the perimeter of a square with sides measuring 5 units.",
    answers: [
      { text: "5 units", correct: false},
      { text: "10 units", correct: false},
      { text: "15 units", correct: false},
      { text: "20 units", correct: true}
    ]
  },
  {
    question: "If a rectangle has a length of 8 units and a width of 3 units, what is its area?",
    answers: [
      { text: "11 square units", correct: false},
      { text: "16 square units", correct: false},
      { text: "24 square units", correct: true},
      { text: "64 square units", correct: false}
    ]
  },
  {
    question: "What is 20% of 150?",
    answers: [
      { text: "20", correct: false},
      { text: "10", correct: false},
      { text: "40", correct: false},
      { text: "30", correct: true}
    ]
  },
  {
    question: "Solve the equation: 2x + 5 = 11.",
    answers: [
      { text: "x = 1", correct: false},
      { text: "x = 3", correct: true},
      { text: "x = 6", correct: false},
      { text: "x = 8", correct: false}
    ]
  },
  {
    question: "If you have a dozen eggs, and you take away 3 eggs, how many eggs do you have left?",
    answers: [
      { text: "15", correct: false},
      { text: "0", correct: false},
      { text: "3", correct: false},
      { text: "9", correct: true}
    ]
  },
  {
    question: "If you have 4 quarters, how much money do you have in total?",
    answers: [
      { text: "$0.10", correct: false},
      { text: "$0.25", correct: false},
      { text: "$0.40", correct: false},
      { text: "$1.00", correct: true}
    ]
  },
  {
    question: "If a circle has a diameter of 10 units, what is its circumference (rounded to the nearest whole number)?",
    answers: [
      { text: "10 units", correct: false},
      { text: "16 units", correct: false},
      { text: "31 units", correct: true},
      { text: "63 units", correct: false}
    ]
  }
];

const questionEl = document.getElementById('question');
const answerBtns = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');

let curr = 0;
let score = 0;

function startQuiz() {
  curr = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currQues = questions[curr];
  let quesNo = curr + 1;
  questionEl.innerHTML = quesNo + ". " + currQues.question;

  currQues.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer["text"];
    button.classList.add("btn");
    answerBtns.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while(answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }
  else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerBtns.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

nextBtn.addEventListener('click', () => {
  if (curr < questions.length) {
    handleNextBtn();
  }
  else {
    startQuiz();
  }
});

function handleNextBtn() {
  curr++;
  if (curr < questions.length) {
    showQuestion();
  }
  else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionEl.innerHTML = `You scored ${score} out of ${questions.length}!`;
  if (score >= questions.length / 2) {
    questionEl.innerHTML += ` You have passed the quiz!`;
  }
  else {
    questionEl.innerHTML += ` You have failed the quiz!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
  }
}

startQuiz();
