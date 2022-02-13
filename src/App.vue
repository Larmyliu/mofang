<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Rubik from './components/Rubik'

export default {
  name: 'App',
  components: {
    Rubik
  }
}
</script>

<style>
@import "../static/css/main.css";
@import "../static/css/color-dark.css";     /*深色主题*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
