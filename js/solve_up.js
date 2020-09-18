let app = new Vue({
  el: '#app',
  data: {
    btnText: "",
    taskChain: [],
    text: 0,
    index: -1,
    solution: 0,
    endGame: false,
    solutions: [1,2,3,4]
  },
  created: function () {
    this.reset()
  },
  methods: {
    reset: function () {
      this.index = -1
      this.btnText = "Next"
      this.endGame = false
      this.text = _.random(1,11)
      this.taskChain = Array.from({length: _.random(8,15)},a => " " + ["+","-"][Math.floor(Math.random() * 2)] + " " + _.random(1,11))
      this.solution = this.taskChain.reduce((acc,cur) => {
        let s = cur.split(" ")
        switch(s[1]) {
          case "+": return acc + parseInt(s[2])
          case "-": return acc - parseInt(s[2])
        }
      }, this.text)
      // TODO more dynamic solutions here
      s = this.solution
      ws = _.shuffle([s+1,s-1,s+2,s-2,s+3,s-3])
      this.solutions = _.shuffle([s,ws[0],ws[1],ws[2]])
    },
    go: function () {
      if (this.btnText === "Retry") {
        this.reset()
        return
      }
      if (this.index === this.taskChain.length - 1) {
        this.endGame = !this.endGame
        this.text = "How much is it now?"
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
      this.endGame = !this.endGame
    }
  }
})
