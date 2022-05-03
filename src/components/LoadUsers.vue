<template>
  <div class="appBoot" :class="{'fadeOut': isClicked }" ref="bootAnim">
    <div class="btn" @click="boot()">Load Users?</div>
  </div>
</template>

<script>
export default {
  name: 'LoadUsers',
  emits: ["load"],
  data () {return {
    isClicked: false
  }},
  methods: {
    boot(delay=550) {
      this.isClicked = true;
      setTimeout(()=>{
        this.$emit('load');
        console.debug("Done")
      },delay);
    }
  }
}
</script>

<style scoped>
  .appBoot {
    width: 70%;
    margin: 0 auto;
    min-width: 300px;
    opacity: 1;
    animation: scrollInVertical 1s cubic-bezier(0.29, 0.25, 0.01, 0.98) forwards;
  }
  .fadeOut {
    animation: fade 0.5s ease-in-out forwards;
  }
  @keyframes fade {
    0% {opacity: 1;}
    100% {opacity: 0;}
  }
</style>