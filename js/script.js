let running = false

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    newTask()
    document.getElementById("answer-1").addEventListener('click', buttonEvaluate, false)
    document.getElementById("answer-2").addEventListener('click', buttonEvaluate, false)
    document.getElementById("new-game").classList.toggle("hidden")
    document.getElementById("new-game").addEventListener('click', newGame, false)
});

function newGame() {
  newTask()
  running = false
  document.getElementById("r-counter").textContent = 0
  document.getElementById("w-counter").textContent = 0
  document.getElementById("answer-1").classList.toggle("hidden")
  document.getElementById("answer-2").classList.toggle("hidden")
  document.getElementById("new-game").classList.toggle("hidden")
}

function endRound() {
  document.getElementById('task').innerHTML = "GAME OVER"
  document.getElementById("answer-1").classList.toggle("hidden")
  document.getElementById("answer-2").classList.toggle("hidden")
  document.getElementById("new-game").classList.toggle("hidden")

  record = document.getElementById("record").textContent
  rights = document.getElementById("r-counter").textContent
  wrongs = document.getElementById("w-counter").textContent
  if ((rights-wrongs) > record){
    document.getElementById("record").textContent = (rights - wrongs)
  }
}

function resetCountdown() {
  document.getElementById("timer").textContent = 60
  var seconds = document.getElementById("timer").textContent;
  running = true
  var countdown = setInterval(function() {
    seconds--;
    document.getElementById("timer").textContent = seconds;
    if (seconds <= 0) {
      clearInterval(countdown);
      running = !running
      endRound()
    }
  }, 1000);
}

function newTask() {
  let task = generateRandomTask()
  let wrongTask = [task.split(" ")[0], task.split(" ")[1],(parseInt(task.split(" ")[2]) + getRandomInt(1,4))].join(" ")
  let wrongTaskAnswer = evaluateTask(wrongTask)
  let taskAnswer = evaluateTask(task)
  let rand = Math.random()
  document.getElementById('task').innerHTML = task
  document.querySelector("#answer-1 p").innerHTML = rand > 0.5 ? taskAnswer : wrongTaskAnswer;
  document.querySelector("#answer-2 p").innerHTML = rand > 0.5 ? wrongTaskAnswer : taskAnswer;
}

function buttonEvaluate() {
  let num;
  let task = document.getElementById('task').innerText
  let solution = evaluateTask(task)
  let right = document.getElementById("r-counter")
  let wrong = document.getElementById("w-counter")
  if (solution == parseInt(this.innerText)) {
    num = parseInt(right.innerText)
    right.innerText = num + 1
  } else {
    num = parseInt(wrong.innerText)
    wrong.innerText = num + 1
  }
  newTask()
  if (!running) {
    resetCountdown()
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomTask() {
  num1 = getRandomInt(1,11)
  num2 = getRandomInt(1,11)
  op = randomArithmeticOperator()
  return `${num1} ${op} ${num2}`
}

function evaluateTask(task) {
  parts = task.split(" ")
  num1 = parseInt(parts[0])
  num2 = parseInt(parts[2])
  switch(parts[1]) {
  case "+":
    return num1 + num2
  case "-":
    return num1 - num2
  case "*":
    return num1 * num2
  }
}

function randomArithmeticOperator() {
  return ["+","-","*"][Math.floor(Math.random() * 3)]
}
