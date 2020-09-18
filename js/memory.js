const EMOJIS = Object.freeze([
  "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🦝", "🐻", "🐼", "🐨", "🐯",
  "🦁", "🐮", "🐷", "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇",
  "🍓", "🍈", "🍒", "🍑", "🍍", "🥭", "🥥", "🥝", "🍅", "🍆", "🥑",
  "🥦", "🥒", "🥬", "🌽", "🥕", "🥔", "🍠", "⚽️", "🏀", "🏈", "⚾️",
  "🏐", "🏉", "🎾", "🥏", "🎱", "🏓", "🏸"
])

function generateRandomMatrix(source, height, width) {
  list = _.shuffle(source).slice(0,height*width/2)
  list = _.shuffle(_.concat(list, list))
  return _.chunk(list, width)
}

let app = new Vue({
  el: "#app",
  data: {
    matrix: generateRandomMatrix(EMOJIS, 4, 4),
    styles: undefined,
    timer: 5,
    in: undefined,
    to: undefined,
    finished: false,
    activeItems: []
  },
  created: function() {
    this.reset()
  },
  watch: {
    matrix: function() {
      this.styles = this.matrix.map(arr => arr.map(v => {return {opacity: 1}}))
      this.reset()
    }
  },
  methods: {
    reset: function() {
      this.styles = this.matrix.map(arr => arr.map(v => {return {opacity: 1}}))
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
    check: function(event) {
      let n = event.target.id.split("-")[1]
      let k = event.target.id.split("-")[2]
      if(this.styles[n][k].opacity !== 1) {
        if(this.activeItems.length < 2) {
          this.activeItems.push({
            n: n,
            k: k,
            text: event.target.innerText
          })
          this.styles[n][k].opacity = 1
        }
      }
      if(this.activeItems.length >= 2) {
        if(this.activeItems[0]['text'] == this.activeItems[1]['text']) {
          this.activeItems = []
          for(n in this.styles) {
            for(k in this.styles[n]) {
              if(this.styles[n][k].opacity == 0) {
                console.log("[DEBUG] memory unfinished");
                return
              }
            }
          }
          console.log("[DEBUG] memory finished");
          this.finished = true
        } else {
          setTimeout(function() {
            for(item of this.activeItems) {
              this.styles[item["n"]][item["k"]].opacity = 0
            }
            this.activeItems = []
          }.bind(this), 500)
        }
      }
    },
    newMatrix: function() {
      this.matrix = generateRandomMatrix(EMOJIS, 4, 4)
    }
  }
});
