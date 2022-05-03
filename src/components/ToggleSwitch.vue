<template>
  <div class="flex  _on_middle _gaped5">
    <label for="remember" :class="['lbl', {isRequired : '_required'}]">{{ label }}</label>
    <input type="checkbox"
           class="tSwitch_s"
           ref="filterButton"
           id="remember"
           name="remember"
           value="1"
           :checked="isChecked"
           @change="toggle">
    <label class="llb" for="remember">
      <span class="_slider"></span>
    </label>
  </div>
</template>

<script>
export default {
  emits: {switch : Boolean},
  props: {
    isRequired: {
      type: Boolean,
      required: false,
      default: false
    },
    isChecked: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: true,
      default: "Select"
    }
  },
  name: 'ToggleSwitch',
  methods: {
    toggle: function (state) {
      this.$emit("switch", state.target.checked);
    }
  }
}
</script>