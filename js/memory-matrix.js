function generateRandomBinaryMatrix(height, width, n) {
  list = _.shuffle([...Array((width*height)-n).fill(0),...Array(n).fill(1)])
  matrix = _.chunk(list, width)
  console.log(matrix);
  return matrix
}

let app = new Vue({
  el: "#app",
  data: {
    matrix: generateRandomBinaryMatrix(4, 4, 4),
    timer: 5,
    finished: false,
    styles: undefined,
    in: undefined,
    to: undefined
  },
  created: function() {
    this.reset()
  },
  watch: {
    matrix: function() {
      this.reset()
    }
  },
  methods: {
    reset: function() {
      this.styles = this.matrix.map(arr => arr.map(v => {return {opacity: v, width:"50px", height:"50px", background:"#70a7ff"}}))
      this.finished = false
      clearInterval(this.in)
      clearTimeout(this.to)
      this.to = setTimeout(function() {
        for(n in this.styles) {
          for(k in this.styles[n]) {
            this.styles[n][k].opacity = 0
          }
        }
      }.bind(this), 5000)
      this.timer = 5
      this.in = setInterval(function() {
        this.timer -= 1;
        if(this.timer == 0) {
          clearInterval(this.in)
        }
      }.bind(this), 1000)
    },
    changeMatrix: function() {
      this.matrix = generateRandomBinaryMatrix(4, 4, 4)
    },
    check: function(event) {
      if(this.timer > 0) return
      id = event.target.id
      let n = event.target.id.split("-")[1]
      let k = event.target.id.split("-")[2]
      this.styles[n][k].opacity = this.styles[n][k].opacity ? 0 : 1
    },
    solve: function() {
      for(n in this.styles) {
        for(k in this.styles[n]) {
          console.log(this.styles[n][k].opacity, this.matrix[n][k]);
          if(this.styles[n][k].opacity !== this.matrix[n][k]) {
            console.log("in here");
            this.styles[n][k].background = "#ff5e5e"
            this.styles[n][k].opacity = 1
          } else {
            if(this.matrix[n][k]) {
              this.styles[n][k].background = "#99ff9c"
            }
          }
        }
      }
    }
  }
});
