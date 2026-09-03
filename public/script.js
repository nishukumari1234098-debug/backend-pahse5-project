const question = document.getElementById("question");
const sendButton = document.getElementById("submit");
const answerBox = document.getElementById("answer");
const answerText = document.getElementById("answer-text");
const buttonText = document.getElementById("button-text");

sendButton.addEventListener("click", async () => {
  const questionText = question.value.trim();

  if (!questionText) {
    answerBox.classList.add("visible");
    answerText.textContent = "Please write a question first.";
    return;
  }

  sendButton.disabled = true;
  buttonText.textContent = "Thinking...";
  answerBox.classList.add("visible");
  answerText.classList.remove("error");
  answerText.textContent = "Gemini is thinking...";

  try {
    const response = await fetch("/ask", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ question: questionText }),
    });

    const data = await response.json();
    answerText.textContent = data.answer;
    question.value = "";
  } catch (error) {
    answerText.classList.add("error");
    answerText.textContent = "Something went wrong. Please try again.";
  }

  sendButton.disabled = false;
  buttonText.textContent = "Send";
});
