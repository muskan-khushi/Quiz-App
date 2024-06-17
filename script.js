const questions = [
    {
        question: "What is the capital city of Australia?",
        answers: [
            { text: "Sydney", correct: false },
            { text: "Melbourne", correct: false },
            { text: "Canberra", correct: true },
            { text: "Brisbane", correct: false }
        ]
    },

    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false },
            { text: "Sri Lanka", correct: false }
        ]
    },

    {
        question: "Who was the first President of the United States?",
        answers: [
            { text: "Abraham Lincoln", correct: false },
            { text: "George Washington", correct: true },
            { text: "Thomas Jefferson", correct: false },
            { text: "John Adams", correct: false }
        ]
    },

    {
        question: "Who wrote the novel 1984?",
        answers: [
            { text: "Aldous Huxley", correct: false },
            { text: "J.R.R. Tolkien", correct: false },
            { text: "George Orwell", correct: true },
            { text: "F. Scott Fitzgerald", correct: false }
        ]
    },

    {
        question: "Which is the longest river in the world?",
        answers: [
            { text: "Amazon River", correct: false },
            { text: "Nile River", correct: true },
            { text: "Yangtze River", correct: false },
            { text: "Mississippi River", correct: false }
        ]
    },

    {
        question: "Which movie won the Oscar for Best Picture in 2020?",
        answers: [
            { text: "1917", correct: false },
            { text: "Joker", correct: false },
            { text: "Parasite", correct: true },
            { text: "Once Upon a Time in Hollywood", correct: false }
        ]
    },

    {
        question: "Which band released the album \"Abbey Road\"?",
        answers: [
            { text: "The Rolling Stones", correct: false },
            { text: "The Beatles", correct: true },
            { text: "Led Zeppelin", correct: false },
            { text: "Pink Floyd", correct: false }
        ]
    },

    {
        question: "Who is known as the father of the computer?",
        answers: [
            { text: "Charles Babbage", correct: true },
            { text: "Alan Turing", correct: false },
            { text: "John von Neumann", correct: false },
            { text: "Bill Gates", correct: false }
        ]
    },

    {
        question: "In which year did the first modern Olympic Games take place?",
        answers: [
            { text: "1896", correct: true },
            { text: "1900", correct: false },
            { text: "1912", correct: false },
            { text: "1920", correct: false }
        ]
    },

    {
        question: "Question: Which famous artist painted the \"Mona Lisa\"?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Claude Monet", correct: false }
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
       const button = document.createElement("button");
       button.innerHTML = answer.text;
       button.classList.add("btn");
       answerButtons.appendChild(button);
       if(answer.correct){
        button.dataset.correct = answer.correct;
       }
       button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();


