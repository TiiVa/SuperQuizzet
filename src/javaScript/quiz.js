class Question {
  constructor(statement, correctAnswer) {
    this.statement = statement;
    this.correctAnswer = correctAnswer;
  }
}
const questions = [];

async function getQuestions() {
  const triviaUrl =
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=boolean";

  const response = await fetch(triviaUrl);

  const results = await response.json();

  if (results["response_code"] != 0) {
    return;
  }
  console.log(results);

  for (const fråga of results["results"]) {
    let correctAnswer = fråga["correct_answer"] === "True";

    const q = new Question(fråga["question"], correctAnswer);
    questions.push(q);
  }

  displayQuestions();
}

getQuestions();

const questionsList = document.querySelector("#questions");
const score = document.querySelector("#score");

let scoreCount = 0;

console.log(questionsList);

function displayQuestions() {
  for (const question of questions) {
    const li = document.createElement("li");
    const card = document.createElement("div");
    const cardBody = document.createElement("div");
    const cardFooter = document.createElement("div");
    const cardTitle = document.createElement("h5");
    const trueBtn = document.createElement("button");
    const falseBtn = document.createElement("button");

    applyStyles(li, card, cardBody, cardFooter, cardTitle, trueBtn, falseBtn);

    trueBtn.innerText = "True";
    trueBtn.onclick = () => {
      answerButtonClick(cardTitle, cardBody, trueBtn, falseBtn, question, true);
    };

    falseBtn.innerText = "False";
    falseBtn.onclick = () => {
      answerButtonClick(
        cardTitle,
        cardBody,
        trueBtn,
        falseBtn,
        question,
        false
      );
    };

    cardTitle.innerText = question.statement;

    cardBody.appendChild(cardTitle);
    cardFooter.appendChild(trueBtn);
    cardFooter.appendChild(falseBtn);

    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    li.appendChild(card);

    questionsList.appendChild(li);
  }
}

function answerButtonClick(
  cardTitle,
  cardBody,
  trueBtn,
  falseBtn,
  question,
  answer
) {
  if (question.correctAnswer === answer) {
    console.log(`Tjohooo! Du gissade rätt`);
    scoreCount++;
    score.innerText = scoreCount;
    cardBody.classList.add("bg-success");
    cardTitle.classList.remove("text-info");
    cardTitle.classList.add("text-white");
  } else {
    console.log("HAHA FEL!");
    cardBody.classList.add("bg-danger");
    cardTitle.classList.remove("text-info");
    cardTitle.classList.add("text-white");
  }
  trueBtn.disabled = true;
  falseBtn.disabled = true;
}

function applyStyles(
  li,
  card,
  cardBody,
  cardFooter,
  cardTitle,
  trueBtn,
  falseBtn
) {
  li.classList.add("list-group-item", "bg-dark", "border-info");
  card.classList.add("card", "bg-dark", "container");
  cardBody.classList.add("card-body", "row");
  cardFooter.classList.add(
    "card-footer",
    "row",
    "container",
    "justify-content-center"
  );
  cardTitle.classList.add("card-title", "text-info", "text-center");
  trueBtn.classList.add("btn", "btn-success", "mx-1", "col-2");
  falseBtn.classList.add("btn", "btn-danger", "mx-1", "col-2");
}
