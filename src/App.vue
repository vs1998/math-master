<template>
  <div id="nav-wrapper">
    <div id="nav">
      <router-link to="/">🧠</router-link>
    </div>
  </div>
  <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap');
@import "./scss/_variables.scss";

html, body {
  font-family: 'Fira Sans', sans-serif;
  background-color: $bg-color;
  color: $font-color;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Fira Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  top: -10px;
  padding: 20px;
  // width: 100%;
  background-color: $header-bg-color;
}

#nav a {
  font-size: 5em;
  font-weight: bold;
  text-decoration: none;
}

#nav-wrapper {
  display: inline-block;
  min-width: 100%
}
</style>
