<template>
  <div class="container">
    <div id="game-wrapper">
      <!-- <GameTimer></GameTimer> -->
      <GameText>{{ seconds }}</GameText>
      <GameText>{{ task }}</GameText>
      <div id="button-wrapper">
        <GameButton v-if="!gameIsOver" @click="submitAnswer" >{{ answer[0] }}</GameButton>
        <GameButton v-if="!gameIsOver" @click="submitAnswer" >{{ answer[1] }}</GameButton>
        <GameButton v-if="gameIsOver" @click="reset" >New Game</GameButton>
      </div>
      <hr v-if="gameIsOver" class="solid">
      <GameResultTable v-if="gameIsOver" :tableData="tasks"></GameResultTable>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GameButton from "@/components/GameButton.vue"
import GameText from "@/components/GameText.vue"
import GameResultTable from "@/components/GameResultTable.vue"

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomTask() {
  let num1 = getRandomInt(1,11)
  let num2 = getRandomInt(1,11)
  let op = randomArithmeticOperator()
  return `${num1} ${op} ${num2}`
}

function randomArithmeticOperator() {
  return ["+","-","*"][Math.floor(Math.random() * 3)]
}

function evaluateTask(task) {
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

export default {
  name: 'CountdownSolver',
  components: {
    GameButton,
    GameText,
    GameResultTable
  },
  data() {
    return {
      gameIsOver: false,
      answer: [0,0],
      task: "",
      result: 0,
      tasks: [],
      seconds: 60
    }
  },
  created() {
    this.reset()
  },
  methods: {
    newGame: function () {

    },
    submitAnswer: function (event) {
      let task = {}
      task["id"] = this.taskId;
      task["task"] = this.task
      task["result"] = this.result
      if (event.target.innerText === this.result) {
        task["answer"] = parseInt(this.result)
      } else {
        task["answer"] = parseInt(event.target.innerText)
      }
      this.tasks = [...this.tasks, task]
      this.taskId++;
      this.newTask()
    },
    newTask: function() {
      this.task = generateRandomTask()
      let wrongTask = [this.task.split(" ")[0], this.task.split(" ")[1],(parseInt(this.task.split(" ")[2]) + getRandomInt(1,4))].join(" ")
      let wrongTaskResult = evaluateTask(wrongTask)
      this.result = evaluateTask(this.task)
      let ri = Math.round(Math.random())
      this.answer[0] = ri == 1 ? wrongTaskResult : this.result
      this.answer[1] = ri == 1 ? this.result : wrongTaskResult
    },
    reset: function() {
      this.gameIsOver = false
      this.answer = [0,0]
      this.result = 0
      this.tasks = []
      this.taskId = 0;
      this.newTask()
      this.seconds = 5
      let countdown = setInterval(() => {
        this.seconds--
        if(this.seconds <= 0) {
          this.gameIsOver = true
          this.task = "Game Over"
          clearInterval(countdown)
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../scss/_variables.scss";
  @import "../scss/_functions.scss";
  //TODO sometimes app is goint too high
  .container {
    height: 78vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  hr {
    margin-top: 40px;
    width: 400px;
    border: 1px solid $font-color;
    box-shadow: makelongshadow($button-shadow,8);
  }
</style>
