<template>
  <div class="container">
    <div id="game-wrapper">
      <GameText>{{ text }}</GameText>
      <GameButton v-if="!gameIsOver" @click="next" >{{ btnText }}</GameButton>
      <div id="button-wrapper">
        <GameButton v-if="gameIsOver" @click="solve" >{{ solutions[0] }}</GameButton>
        <GameButton v-if="gameIsOver" @click="solve" >{{ solutions[1] }}</GameButton>
        <GameButton v-if="gameIsOver" @click="solve" >{{ solutions[2] }}</GameButton>
        <GameButton v-if="gameIsOver" @click="solve" >{{ solutions[3] }}</GameButton>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GameButton from "@/components/GameButton.vue"
import GameText from "@/components/GameText.vue"
const _ = require('lodash');

export default {
  name: 'SolveUp',
  components: {
    GameButton,
    GameText
  },
  data() {
    return {
      btnText: "",
      taskChain: [],
      text: 0,
      index: -1,
      solution: 0,
      gameIsOver: false,
      solutions: [1,2,3,4]
    }
  },
  created() {
    this.reset()
  },
  methods: {
    reset: function () {
      this.index = -1
      this.btnText = "Next"
      this.gameIsOver = false
      this.text = _.random(1,11)
      this.taskChain = Array.from({length: _.random(8,15)},() => " " + ["+","-"][Math.floor(Math.random() * 2)] + " " + _.random(1,11))
      this.solution = this.taskChain.reduce((acc,cur) => {
        let s = cur.split(" ")
        switch(s[1]) {
          case "+": return acc + parseInt(s[2])
          case "-": return acc - parseInt(s[2])
        }
      }, this.text)
      // TODO more dynamic solutions here
      let s = this.solution
      let ws = _.shuffle([s+1,s-1,s+2,s-2,s+3,s-3])
      this.solutions = _.shuffle([s,ws[0],ws[1],ws[2]])
    },
    next: function () {
      if (this.btnText === "Retry") {
        this.reset()
        return
      }
      if (this.index === this.taskChain.length - 1) {
        this.gameIsOver = !this.gameIsOver
        this.text = "Result:"
      } else {
        this.index = this.index + 1 < this.taskChain.length ? this.index + 1 : this.index
        this.text = this.taskChain[this.index]
      }
    },
    solve: function(event) {
      if (event.target.innerText == this.solution) {
        this.text = "Right answer"
        this.btnText = "Retry"
      } else {
        this.text = "Wrong answer"
      }
      this.gameIsOver = !this.gameIsOver
    }
  }
}
</script>

<style scoped lang="scss">
  .container {
    height: 78vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
