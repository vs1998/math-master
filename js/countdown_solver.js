let running = false
let wrongResults = []
let countdown


document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    newTask()
    document.getElementById("answer-1").addEventListener('click', buttonEvaluate, false)
    document.getElementById("answer-2").addEventListener('click', buttonEvaluate, false)
    document.getElementById("retry").addEventListener('click', endRound,false)
    document.getElementById("new-game").classList.toggle("hidden")
    document.getElementById("new-game").addEventListener('click', newGame, false)
    hideTable()
});

const newGame = () => {
  hideTable()
  newTask()
  running = false
  document.getElementById("r-counter").textContent = 0
  document.getElementById("w-counter").textContent = 0
  document.getElementById("answer-1").classList.toggle("hidden")
  document.getElementById("answer-2").classList.toggle("hidden")
  document.getElementById("new-game").classList.toggle("hidden")
}

const clearTable = () => {
  tbody = document.getElementById("results").tBodies[0]
  while(tbody.rows.length > 0) {
    tbody.deleteRow(0)
  }
}

const fillTable = () => {
  tbody = document.getElementById("results").tBodies[0]
  for (item of wrongResults) {
    row = tbody.insertRow(-1)
    taskCell = row.insertCell(0).innerHTML = item.task
    choiceCell = row.insertCell(1).innerHTML = item.choice
  }
}

const hideTable = () => {
  document.getElementById("results").classList.add("hidden")
  document.getElementById("table-text").classList.add("hidden")
}

const showTable = () => {
  document.getElementById("results").classList.remove("hidden")
  document.getElementById("table-text").classList.remove("hidden")
}


const resetWrongResults = () => {
  wrongResults = []
}

const endRound = () => {
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
  clearTable()
  fillTable()
  showTable()
  resetWrongResults()
  clearInterval(countdown)
  document.getElementById("timer").textContent = "";
}

const resetCountdown = () => {
  document.getElementById("timer").textContent = 60
  let seconds = document.getElementById("timer").textContent;
  running = true
  countdown = setInterval(function() {
    seconds--;
    document.getElementById("timer").textContent = seconds;
    if (seconds <= 0) {
      clearInterval(countdown);
      running = !running
      endRound()
    }
  }, 1000);
}



const newTask = () => {
  let task = generateRandomTask()
  let wrongTask = [task.split(" ")[0], task.split(" ")[1],(parseInt(task.split(" ")[2]) + getRandomInt(1,4))].join(" ")
  let wrongTaskAnswer = evaluateTask(wrongTask)
  let taskAnswer = evaluateTask(task)
  let rand = Math.random()
  document.getElementById('task').innerHTML = task
  document.querySelector("#answer-1 p").innerHTML = rand > 0.5 ? taskAnswer : wrongTaskAnswer;
  document.querySelector("#answer-2 p").innerHTML = rand > 0.5 ? wrongTaskAnswer : taskAnswer;
}

const buttonEvaluate = (el) => {
  let num;
  let task = document.getElementById('task').innerText
  let solution = evaluateTask(task)
  let right = document.getElementById("r-counter")
  let wrong = document.getElementById("w-counter")
  if (solution == parseInt(el.path[0].innerText)) {
    num = parseInt(right.innerText)
    right.innerText = num + 1
  } else {
    num = parseInt(wrong.innerText)
    wrong.innerText = num + 1
    wrongResults.push({
      task: task,
      choice: el.path[0].innerText
    })
  }
  newTask()
  if (!running) {
    resetCountdown()
  }
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateRandomTask = () => {
  let num1 = getRandomInt(1,11)
  let num2 = getRandomInt(1,11)
  let op = randomArithmeticOperator()
  return `${num1} ${op} ${num2}`
}

const evaluateTask = (task) => {
  let parts = task.split(" ")
  let num1 = parseInt(parts[0])
  let num2 = parseInt(parts[2])
  switch(parts[1]) {
  case "+":
    return num1 + num2
  case "-":
    return num1 - num2
  case "*":
    return num1 * num2
  }
}

const randomArithmeticOperator = () => {
  return ["+","-","*"][Math.floor(Math.random() * 3)]
}
