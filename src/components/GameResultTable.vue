<template>
  <div class="grt-container">
    <table>
      <tr>
        <th>Task</th>
        <th>Your Answer</th>
        <th>Score</th>
      </tr>
      <tr v-for="item in tableData" :key="item.id">
        <td :class="{wrong: item.result !== item.answer}">{{ item.task }}</td>
        <td :class="{wrong: item.result !== item.answer}">{{ item.answer }}</td>
        <td :class="{wrong: item.result !== item.answer}">{{ item.answer === item.result ? "+1" : "-1" }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'GameResultTable',
  props: ["tableData"],
  methods: {

  }
}
</script>

<style scoped lang="scss">
  @import "../scss/_variables.scss";

  table {
    // left: 50%;
    // margin-right: -50%;
    // transform: translate(-50%, -50%);
    // position: absolute;
    margin-top: 20px;
    border-collapse: collapse;
  }

  tr {
    td {
      color: $game-green;
    }
    td, th {
      // border: 2px solid $table-border;
      border-bottom: 2px solid $table-border;
      border-spacing: 0;
      margin: 0;
      padding: 4px 8px;
    }
  }

  .wrong {
    color: $game-red;
  }

  .grt-container {
    text-align: center;
    display: flex;
    justify-content: center;
    // margin: 0 auto;

  }



</style>
