// register the grid component
Vue.component("memory-grid", {
  template: "#grid-template",
  props: {
    matrix: Array,
  },
  data: {},
  methods: {
    sortBy: function(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    }
  }
});

let app = new Vue({
  el: "#app",
  data: {
    memoryMatrix: [],
    emojis: [🐶, 🐱, 🐭, 🐹, 🐰, 🦊, 🦝, 🐻, 🐼, 🐨, 🐯, 🦁, 🐮, 🐷, 🍏, 🍎, 🍐, 🍊, 🍋, 🍌, 🍉, 🍇, 🍓, 🍈, 🍒, 🍑, 🍍, 🥭, 🥥, 🥝, 🍅, 🍆, 🥑, 🥦, 🥒, 🥬, 🌶, 🌽, 🥕, 🥔, 🍠, ⚽️, 🏀, 🏈, ⚾️, 🥎, 🏐, 🏉, 🎾, 🥏, 🎱, 🏓, 🏸]
  },
  created: function () {
    this.reset()
  },
  methods: {
    reset: function () {
      this.generateMatrix()
    },
    generateMatrix: function () {
      emojiList = _.slice(_.shuffle(this.emojis), end=8)
      emojiList = _.shuffle(_.concat(emojiList, emojiList))
      counter = 0
      for (a in Array(4).fill()) {
        for (b in Array(4).fill()) {
          this.memoryMatrix[a][b] = emojiList[counter++]
        }
      }
    }
  }

});
