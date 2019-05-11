<template>
  <div id="app">
    <div class="container">
      <div class="row col-md-12 d-flex justify-content-center">
        <div class="row col-md-12 d-flex justify-content-center">
          {{ testProperty }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'app',
    props: ['testProperty'],
    components: {},
  }
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>