<template>

  <div class="sortWrapper">
    <div class="sortBy">
      <div class="by _static">Sort by</div>
      <label for="sortBy_1" class="by">
        <span>Name</span>
        <input type="radio" id="sortBy_1" name="sortOrder" value="name" v-model="sortOrder">
      </label>
      <label for="sortBy_2" class="by">
        <span>Id</span>
        <input type="radio" id="sortBy_2" name="sortOrder" value="id" v-model="sortOrder">
      </label>
      <div class="sortSlider" :class="sliderPlacement"></div>
    </div>
  </div>


</template>

<script>
export default {
  name: 'SorterButton',
  props: ["sortOrder"],
  data() {
    return {
      allowedSortCategories: ["name", "id"],
      sliderPlacement: ''
    }
  },
  methods: {
    // placeSlider method moves the sort order slider to the correct position
    // by setting an appropriate class name (pure CSS animation! Yay!)
    placeSlider(sortOrder) {
      const id = this.allowedSortCategories.indexOf(sortOrder);
      const sliderPlacement = `sliderPos_${id}`;
      this.sliderPlacement = sliderPlacement;
      return sliderPlacement;
    },
    // emitSortOrder reports the sort order changes back to the parent comp
    emitSortOrder(sortOrder=null) {
      this.$emit("sortOrder", sortOrder? sortOrder : this.sortOrder);
    },
  },
  watch : {
    // watches the changes in sort order caused by the user interaction
    // to adjust the visuals (slider) and triggers the emitter
    sortOrder : function(newSorter) {
      this.placeSlider(newSorter);
      this.emitSortOrder();
    }
  },
  mounted () {
    // initializing the state of the sorter
    console.debug("Sorter Mounted");
    if (!this.sortOrder) {
      // if default sort order is unset, set the default to the first category
      // changing sortBy triggers the watchers that subsequently updates the
      // slider and emits the sort category name
      this.sortBy = this.allowedSortCategories[0];
    }
    else
      // because the default is given, we update the slider placement only
      this.placeSlider(this.sortOrder);
  }

}
</script>

<style scoped>

</style>