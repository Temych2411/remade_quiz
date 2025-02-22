let question = document.querySelector(".question")
let answers = document.querySelectorAll(".answer")
let startScreen = document.getElementById("start-screen");
let quizScreen = document.getElementById("quiz-screen");
let startBtn = document.getElementById("start-btn");
let resultMessage = document.querySelector(".result-message");

function shuffle(array){
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]] 
    }
    return array
}

function randint (min,max) {
    return Math.round(Math.random() * (max - min) + min)
}
let operators = ["+", "-", "*", "/"];

function getRandomSign() {
    return operators[randint(0,3)];
}

class Question {
    constructor(){
        let a = randint(1,30);
        let b = randint(1,30);
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`;
        if(sign == "+"){this.correct = a + b}
        else if(sign == "-"){this.correct = a - b}
        else if(sign == "/"){this.correct = Math.round(a / b)}
        else if(sign == "*"){this.correct = a * b}
        this.answers = [
            randint(this.correct - 15, this.correct + 15),
            randint(this.correct - 15, this.correct + 15),
            this.correct,
            randint(this.correct - 15, this.correct + 15),
            randint(this.correct - 15, this.correct + 15),
        ]
        shuffle(this.answers)
    }
  
    display() {
        question.innerHTML = this.question
        for(let i in this.answers){
            answers[i].innerHTML = this.answers[i]
        }
    }
}    

let correctAnswers = 0; 
let question_counter = 0;
let current_question = new Question()
// let quizTimer = null;
current_question.display()

for(let i = 0; i < answers.length; i++){
    answers[i].addEventListener("click", () => {
        question_counter++
       if(answers[i].innerHTML == +current_question.correct){
            correctAnswers++;
            answers[i].style.background = '#00FF00'
            anime({
                targets: answers[i],
                backgroundColor: '#FFFFFF',
                duration: 500,
                easing: 'easeInOutQuad'
            });
        } else {
            answers[i].style.background = '#FF0000'
            anime({
                targets: answers[i],
                backgroundColor: '#FFFFFF',
                duration: 500,
                easing: 'easeInOutQuad'
            });
        }

        
        current_question = new Question();
        current_question.display();
    })
}
  

startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    quizScreen.style.display = "block";

    startQuiz();
});

function startQuiz() {
    correctAnswers = 0;
    question_counter = 0;
    setTimeout(() => {
        quizScreen.style.display = "none"; 
        startScreen.style.display = "block"; 

        resultMessage.innerHTML = `Ви дали ${correctAnswers} правильних відповідей із ${question_counter}.<br>
        Точність - ${Math.round((correctAnswers / question_counter) * 100) || 0}%`;
    }, 10000);
}
