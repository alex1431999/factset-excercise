<template>
  <div id="app">
    <CurrencyConverter :currencies="currencies"/>
  </div>
</template>

<script>
import CurrencyConverter from '@/components/CurrencyConverter.vue'
import currencies from '@/data/currencies.json'

export default {
  name: 'App',
  components: {
    CurrencyConverter,
  },

  data() {
    return {
      currencies,
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
