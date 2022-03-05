const fetchData = async function () {
  const response = await fetch("./questions/questions.json");
  const data = await response.json();
  const questions = data.Questions;
  let sliceStart = 0;
  let sliceEnd = 1;
  let countCorrectAnswer = 0;
  let answer = "";
  let questionNumber = 0;

  let questionsContainer = document.getElementById("container");

  const hanldeFindIndex = (question) => {
    return questions.findIndex((element) => element.question === question) + 1;
  };

  const handleQuestionsStepper = (start, end) => {
    return `
    <div class="questionContainer">
    <ul class="progressBar">
    ${questions
      .map((_, index) => {
        let isActive = questionNumber > index && "active";
        return `<li key={${index}} class="${isActive}"></li>`;
      })
      .join("")}
    </ul>
    ${questions.slice(start, end).map((question, index) => {
      answer = question.answer;
      questionNumber = hanldeFindIndex(question.question);
      return `<div key={${index}}>
        <div class="question">    
        <span>Question ${questionNumber} of ${questions.length} </span>
          <h2 class="textQuestion">${question.question}</h2>
        </div>
        ${question.choices
          .map((choice, index) => {
            return `
          <li key={${index}}>
          <button class="choiceButton" id="choice">${choice}</button>
          </li>`;
          })
          .join("")}
      </div>`;
    })}
  </div>`;
  };

  questionsContainer.addEventListener("click", function (e) {
    e.preventDefault();
    let choice = e.target.id === "choice";
    if (choice) {
      sliceStart = sliceStart + 1;
      sliceEnd = sliceEnd + 1;

      if (answer === e.target.innerText) {
        countCorrectAnswer = countCorrectAnswer + 1;
        console.log(countCorrectAnswer);
      }

      if (questionNumber === questions.length) {
        localStorage.setItem("count", countCorrectAnswer);
        localStorage.setItem("numberOfQuestions", questions.length);
        if (countCorrectAnswer < 6) {
          document.location = "play_again.html";
        } else {
          document.location = "congrats.html";
        }
      }

      questionsContainer.innerHTML = handleQuestionsStepper(
        sliceStart,
        sliceEnd
      );
    }
  });

  questionsContainer.innerHTML = handleQuestionsStepper(sliceStart, sliceEnd);
};

fetchData();
