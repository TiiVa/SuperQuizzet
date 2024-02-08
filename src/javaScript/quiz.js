class Question {
  constructor(statement, correctAnswer) {
    this.statement = statement;
    this.correctAnswer = correctAnswer;
  }
}

const json = `
{
    "response_code": 0,
    "results": [
        {
            "type": "boolean",
            "difficulty": "easy",
            "category": "Science: Computers",
            "question": "Pointers were not used in the original C programming language; they were added later on in C++.",
            "correct_answer": "False",
            "incorrect_answers": [
                "True"
            ]
        },
        {
            "type": "boolean",
            "difficulty": "easy",
            "category": "Science: Computers",
            "question": "The programming language &quot;Python&quot; is based off a modified version of &quot;JavaScript&quot;.",
            "correct_answer": "False",
            "incorrect_answers": [
                "True"
            ]
        },
        {
            "type": "boolean",
            "difficulty": "easy",
            "category": "Science: Computers",
            "question": "The Python programming language gets its name from the British comedy group &quot;Monty Python.&quot;",
            "correct_answer": "True",
            "incorrect_answers": [
                "False"
            ]
        },
        {
            "type": "boolean",
            "difficulty": "easy",
            "category": "Science: Computers",
            "question": "The logo for Snapchat is a Bell.",
            "correct_answer": "False",
            "incorrect_answers": [
                "True"
            ]
        },
        {
            "type": "boolean",
            "difficulty": "easy",
            "category": "Science: Computers",
            "question": "The Windows 7 operating system has six main editions.",
            "correct_answer": "True",
            "incorrect_answers": [
                "False"
            ]
        },
        {
            "type": "boolean",
            "difficulty": "easy",
            "category": "Science: Computers",
            "question": "RAM stands for Random Access Memory.",
            "correct_answer": "True",
            "incorrect_answers": [
                "False"
            ]
        },
        {
            "type": "boolean",
            "difficulty": "easy",
            "category": "Science: Computers",
            "question": "Linux was first created as an alternative to Windows XP.",
            "correct_answer": "False",
            "incorrect_answers": [
                "True"
            ]
        },
        {
            "type": "boolean",
            "difficulty": "easy",
            "category": "Science: Computers",
            "question": "The Windows ME operating system was released in the year 2000.",
            "correct_answer": "True",
            "incorrect_answers": [
                "False"
            ]
        },
        {
            "type": "boolean",
            "difficulty": "easy",
            "category": "Science: Computers",
            "question": "Linus Torvalds created Linux and Git.",
            "correct_answer": "True",
            "incorrect_answers": [
                "False"
            ]
        },
        {
            "type": "boolean",
            "difficulty": "easy",
            "category": "Science: Computers",
            "question": "Time on Computers is measured via the EPOX System.",
            "correct_answer": "False",
            "incorrect_answers": [
                "True"
            ]
        }
    ]
}
`;

const response = JSON.parse(json);

const q2 = response["results"];

const questions = [
  new Question("Hej", true),
  new Question("Då", false),
  new Question("Är CSS kul?", false),
];

for (const fråga of q2) {
  let correctAnswer = fråga["correct_answer"] === "True";

  const q = new Question(fråga["question"], correctAnswer);
  questions.push(q);
}

console.log(q2);

console.log(questions);

const questionsList = document.querySelector("#questions");
const score = document.querySelector("#score");

let scoreCount = 0;

console.log(questionsList);

displayQuestions();

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
  li.classList.add("list-group-item", "bg-dark", "border-danger");
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
