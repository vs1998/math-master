<template>
  <div>
    <!-- <p>Time until start: {{ timer }}</p> -->
    <GameText>Time until start: {{ timer }}</GameText>
    <table>
      <tbody>
        <tr v-for="n in matrix.length"> <!-- eslint-disable-line vue/require-v-for-key -->
          <td v-for="k in matrix[n-1].length" style="background: #eee"> <!-- eslint-disable-line vue/require-v-for-key -->
            <MemoryCard :flipped="flipped[n-1][k-1]" :id="'item-' + (n-1) + '-' + (k-1)" @click="check">{{matrix[n-1][k-1]}}</MemoryCard>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="finished">Memory finished!</p>
    <!-- <memory-grid :matrix="memoryMatrix"></memory-grid> -->
    <GameButton @click="newMatrix">New Matrix</GameButton>
    <!-- <button @click="newMatrix">New Matrix (Debug)</button> -->
  </div>
</template>

<script>
// @ is an alias to /src
import GameButton from "@/components/GameButton.vue"
import GameText from "@/components/GameText.vue"
import MemoryCard from "@/components/MemoryCard.vue"

const _ = require('lodash');
const EMOJIS = Object.freeze([
  "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🦝", "🐻", "🐼", "🐨", "🐯",
  "🦁", "🐮", "🐷", "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇",
  "🍓", "🍈", "🍒", "🍑", "🍍", "🥭", "🥥", "🥝", "🍅", "🍆", "🥑",
  "🥦", "🥒", "🥬", "🌽", "🥕", "🥔", "🍠", "⚽️", "🏀", "🏈", "⚾️",
  "🏐", "🏉", "🎾", "🥏", "🎱", "🏓", "🏸"
])

function generateRandomMatrix(source, height, width) {
  let list = _.shuffle(source).slice(0,height*width/2)
  list = _.shuffle(_.concat(list, list))
  return _.chunk(list, width)
}

export default {
  name: 'Memory',
  components: {
    GameButton,
    GameText,
    MemoryCard
  },
  data() {
    return {
      matrix: generateRandomMatrix(EMOJIS, 6, 6),
      flipped: undefined,
      timer: 5,
      in: undefined,
      to: undefined,
      finished: false,
      activeItems: []
    }
  },
  created: function() {
    this.reset()
  },
  watch: {
    matrix: function() {
      this.flipped = this.matrix.map(arr => arr.map(() => {return false}))
      this.reset()
    }
  },
  methods: {
    reset() {
      this.flipped = this.matrix.map(arr => arr.map(() => {return false}))
      this.finished = false
      clearInterval(this.in)
      clearTimeout(this.to)
      this.to = setTimeout(function() {
        for(let n in this.flipped) {
          for(let k in this.flipped[n]) {
            this.flipped[n][k] = true;
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
    check(event) {
      let n = event.target.id.split("-")[1]
      let k = event.target.id.split("-")[2]
      console.log(event);
      if(this.flipped[n][k]) {
        if(this.activeItems.length < 2) {
          this.activeItems.push({
            n: n,
            k: k,
            text: event.target.innerText
          })
          this.flipped[n][k] = false
        }
      }
      if(this.activeItems.length >= 2) {
        if(this.activeItems[0]['text'] == this.activeItems[1]['text']) {
          this.activeItems = []
          for(n in this.flipped) {
            for(k in this.flipped[n]) {
              if(this.flipped[n][k]) {
                console.log("[DEBUG] memory unfinished");
                return
              }
            }
          }
          console.log("[DEBUG] memory finished");
          this.finished = true
        } else {
          setTimeout(function() {
            for(let item of this.activeItems) {
              this.flipped[item["n"]][item["k"]] = true
            }
            this.activeItems = []
          }.bind(this), 500)
        }
      }
    },
    newMatrix() {
      this.matrix = generateRandomMatrix(EMOJIS, 4, 4)
    }
  }
}
</script>

<style lang="scss" scoped>

  table {
    border-spacing: 5px;
  }

  td {
    background: none !important;
  }

  // td {
  //   margin: 5px;
  //   padding: 5px;
  // }

</style>
