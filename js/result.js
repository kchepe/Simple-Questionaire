window.addEventListener("load", () => {
  const correctAnswer = localStorage.getItem("count");
  const numberOfQuestions = localStorage.getItem("numberOfQuestions");

  if (correctAnswer && numberOfQuestions) {
    document.getElementById(
      "count"
    ).innerText = `${correctAnswer}/${numberOfQuestions}`;
  } else {
    document.location = "/question.html";
  }
});
