<template>
  <div class="filterWrapper">
    <div class="_static">Filter By</div>
    <div class="filterBy">
      <input type="text" class="_filter" name="filter" placeholder="Filter" v-model="currentFilter">
      <div class="_filterPost _lined" @click="filter" @keyup="filter('change')">filter_alt</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterButton',
  props: ["currentFilter"],
  emits: ["filterPhrase"],
  methods: {
    filter() {
      this.$emit("filterPhrase", this.currentFilter);
    },
    filterUpdate() {
      this.$emit("change", this.currentFilter);
    }
  }
}

</script>

<style scoped>

</style>