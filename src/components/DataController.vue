<template>
  <div class="flex _on_center _on_middle _gaped10 _mv10 _mb30">
    <FilterButton
        :current-filter="currentFilter"
        @filter-phrase="handelFilterPhrase"
        @change="handelFilterPhraseChange">
    </FilterButton>
    <SorterButton
        :sort-order="sortOrder"
        @sort-order="handleSortOrderChoice">
    </SorterButton>
    <div class="flex _wFull _on_center _on_middle">
      <toggle-switch
          label="Remember my choices"
          :is-required = "false"
          :is-checked="memorized"
          @switch="handleRememberChoices"
      />
    </div>
  </div>
</template>

<script>
import FilterButton from './FilterButton.vue'
import SorterButton from './SorterButton.vue'
import ToggleSwitch from './ToggleSwitch.vue'
import { onMounted, toRefs, reactive, watch } from 'vue'

export default {
  name: 'DataController',
  components: { ToggleSwitch, SorterButton, FilterButton },
  emits: ["filterPhrase","sortOrder"],
  setup(props, { emit } ) {
    // init saved choices
    let dataControlStatus = reactive({
      memorized: false,
      updatedFilter: '',
      currentFilter: '',
      sortOrder:''
    });
    onMounted(() => {
      if (dataControl.hasSavedChoices()) {
        console.debug(">> Discovered saved choices");
        console.debug("saves", dataControl.loadChoices());
        const {filter, orderBy} = dataControl.loadChoices();
        dataControlStatus.memorized = true;
        dataControlStatus.currentFilter = filter;
        dataControlStatus.sortOrder = orderBy;
      } else {
        console.debug(">> No saved choices")
        dataControlStatus.memorized = false;
        dataControlStatus.currentFilter = '';
        dataControlStatus.sortOrder = '';
      }
    });
    function handelFilterPhraseChange(update) {
      console.debug(update.target.value);
      dataControlStatus.updatedFilter = update.target.value;
    }
    function handelFilterPhrase(filterPhrase) {
      dataControlStatus.currentFilter = filterPhrase;
      reEmit("filterPhrase", filterPhrase);
    }
    function handleSortOrderChoice(orderBy) {
      dataControlStatus.sortOrder = orderBy;
      reEmit("sortOrder", orderBy);
    }
    function reEmit (emitter, emitted) {
      emit(emitter, emitted);
      console.debug("Value: ", emitted, " Emitter: ", emitter);
    }
    function handleRememberChoices(state) {
      console.debug(">> Memorizing State: ", state)
      handelFilterPhrase(dataControlStatus.updatedFilter)
      dataControl.toggleMemory(state);
    }
    const dataControl= {
      memoryKeyName: "dataControlChoice",
      toggleMemory: function (state) {
        if (state) {
          this.saveChoices();
          return true;
        } else {
          this.clearChoices();
        }
      },
      clearChoices() {
        window.localStorage.removeItem(this.memoryKeyName);
      },
      saveChoices() {
        const dataControlChoice = JSON.stringify({
          memorized: true,
          filter: dataControlStatus.currentFilter,
          orderBy: dataControlStatus.sortOrder
        });
        window.localStorage.setItem(this.memoryKeyName, dataControlChoice);
      },
      hasSavedChoices() {
        return !!window.localStorage.getItem(this.memoryKeyName);
      },
      loadChoices() {
        if (this.hasSavedChoices()) {
          return JSON.parse(window.localStorage.getItem(this.memoryKeyName));
        }
      }
    }
    // if saving last choices, update the saves choice as they change
    watch(dataControlStatus, (newVal, oldVal)=>{
      if (dataControlStatus.memorized) {
        dataControl.toggleMemory(true)
      }
    });
    return {
      ...toRefs(dataControlStatus),
      reEmit,
      handelFilterPhraseChange,
      handelFilterPhrase,
      handleSortOrderChoice,
      handleRememberChoices,
    }
  } // end setup
  
}
</script>

<style scoped>

</style>