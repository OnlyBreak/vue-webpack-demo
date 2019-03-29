<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td, a {
  margin: 0;
  padding: 0;
}
input[type="button"], input[type="submit"], input[type="reset"], input[type="number"] {
  -webkit-appearance: none;
  border: none;
  outline: none;
}
textarea {  -webkit-appearance: none;}
html,body {
  font-family: 'PingFangSC-Regular';
  font-size: 12px;
  -webkit-overflow-scrolling: touch;
  position: relative;

  width: 100%;
  height: 100%;
  min-height: 100%;
  max-width: 768px;
  margin: 0 auto;
  user-select: none;
}
#app {
  height: 100%;
}
</style>
