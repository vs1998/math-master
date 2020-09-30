<template>
  <div class="home">
    <p>This is the home page</p>
    <p>Select a game</p>
    <ul>
      <li><router-link to="/solve-up">Solve up</router-link></li>
      <li><router-link to="/countdown-solver">Countdown Solver</router-link></li>
      <li><router-link to="/sum-it-up">Sum it Up</router-link></li>
      <li><router-link to="/memory">Memory</router-link></li>
      <li><router-link to="/memory-matrix">Memory Matrix</router-link></li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {

  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap');
@import "../scss/_variables.scss";

html, body {
  font-family: 'Fira Sans', sans-serif;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

</style>
