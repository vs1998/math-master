const EMOJIS = Object.freeze([
  "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🦝", "🐻", "🐼", "🐨", "🐯",
  "🦁", "🐮", "🐷", "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇",
  "🍓", "🍈", "🍒", "🍑", "🍍", "🥭", "🥥", "🥝", "🍅", "🍆", "🥑",
  "🥦", "🥒", "🥬", "🌽", "🥕", "🥔", "🍠", "⚽️", "🏀", "🏈", "⚾️",
  "🏐", "🏉", "🎾", "🥏", "🎱", "🏓", "🏸"
])

function generateRandomMatrix(source, scale) {
  matrix = Array(scale).fill().map(()=>Array(scale).fill())
  list = _.shuffle(source).slice(0,scale*scale/2)
  list = _.shuffle(_.concat(list, list))
  console.log(list);
  counter = 0
  for (a in Array(scale).fill()) {
    for (b in Array(scale).fill()) {
      matrix[a][b] = list[counter++]
    }
  }
  console.log(matrix);
  return matrix
}

// register the grid component
Vue.component("memory-grid", {
  template: "#grid-template",
  props: {
    matrix: Array,
  },
  data: function() {
    s = {}
    for(n in this.matrix) {
      for(k in this.matrix[n]) {
        id = "item-"+n+"-"+k
        s[id] = {
          opacity: 1
        }
      }
    }
    return {
      activeItems: [],
      styles: s,
      timer: 5,
      finished: false,
    }
  },
  watch: {
    matrix: function() {
      for(style in this.styles) {
        this.styles[style].opacity = 1
      }
      console.log("[DEBUG] matrix changed");
      this.reset()
    }
  },
  created: function() {
    this.reset()
  },
  methods: {
    reset: function() {
      this.finished = false
      clearInterval(this.in)
      clearTimeout(this.to)
      this.resetTimer()
      this.fade()
    },
    fade: function() {
      this.to = setTimeout(function() {
        for(style in this.styles) {
          this.styles[style].opacity = 0
        }
      }.bind(this), 5000)
    },
    resetTimer: function() {
      this.timer = 5
      this.in = setInterval(function() {
        this.timer -= 1;
        if(this.timer == 0) {
          clearInterval(this.in)
        }
      }.bind(this), 1000)
    },
    check: function(event) {
      id = event.target.id
      if(this.styles[id].opacity !== 1) {
        if(this.activeItems.length < 2) {
          this.activeItems.push({
            id: id,
            text: event.target.innerText
          })
          this.styles[id].opacity = 1
        }
      }
      if(this.activeItems.length >= 2) {
        if(this.activeItems[0]['text'] == this.activeItems[1]['text']) {
          this.activeItems = []
          for(style in this.styles) {
            if(this.styles[style].opacity == 0) {
              console.log("[DEBUG] memory unfinished");
              return
            }
          }
          console.log("[DEBUG] memory finished");
          this.finished = true
        } else {
          setTimeout(function() {
            for(item of this.activeItems) {
              this.styles[item["id"]].opacity = 0
            }
            this.activeItems = []
          }.bind(this), 500)
        }
      }
    }
  }
});

let app = new Vue({
  el: "#app",
  data: {
    memoryMatrix: generateRandomMatrix(EMOJIS, 4),
  },
  methods: {
    changeMatrix: function() {
      this.memoryMatrix = generateRandomMatrix(EMOJIS, 4)
    }
  }
});
