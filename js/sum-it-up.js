function getRandomInt(min,max,exclude) {
  let s
  do {
    s = Math.floor(Math.random() * (max - min)) + min
    if(!exclude) return s
  } while(s == exclude)
  return s
}

function generateRandomNumberMatrix(width) {
  list = Array(width*width).fill(0).map(v => getRandomInt(1,11))
  matrix = _.chunk(list, width)
  return matrix
}

let app = new Vue({
  el: "#app",
  data: {
    matrix: generateRandomNumberMatrix(4),
    n: 2,
    finished: false,
    styles: undefined,
    solutions: [],
    solution: 0,
    timer: 0,
    interval: undefined,
    stage: 0
  },
  created: function() {
    this.start()
  },
  watch: {
    matrix: function() {
      this.reset()
    },
    finished: function() {
      if(this.finished) console.log("game over");
    }
  },
  methods: {
    start: function() {
      clearInterval(this.interval)
      this.finished = false
      this.timer = 60
      this.stage = 1
      this.interval = setInterval(function() {
        this.timer -= 1
        if(this.timer <= 0) {
          clearInterval(this.interval)
          this.finished = true
        }
      }.bind(this),1000)
      this.n = 2
      this.generateNewMartix()
      this.reset()
    },
    stop: function() {
      clearInterval(this.interval)
      this.timer = 0
      this.finished = true
    },
    reset: function() {
      this.styles = this.matrix.map(arr => arr.map(v => {return {width:"50px", height:"50px"}}))
      this.solution = _.flatten(this.matrix).reduce((a,c) => {
        return parseInt(a) + parseInt(c)
      }, 0)
      this.solutions = _.shuffle([this.solution,getRandomInt(this.solution-5,this.solution+5, this.solution)])

    },
    generateNewMartix: function() {
      this.matrix = generateRandomNumberMatrix(this.n)
    },
    solve: function(event) {
      if(event.target.innerText == this.solution) {
        this.stage += 1
        this.n = Math.floor(this.stage / 5) + 2
        console.log(this.n);
        this.generateNewMartix()
        this.reset()
      } else {
        this.stop()
      }
    }
  }
});
