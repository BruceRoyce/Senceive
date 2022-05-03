<template>
  <div class="senceiveInnerBox _r senceiveAlignSelfTop" style="flex-grow: 1">
    <Spinner :is-active="isModuleBusy" />
    <div v-if="usersReactive.users.per_page"
         v-for="(user, key, index) in listUsers"
         :key="user.id"
         v-show="filtered_ids.length == 0 || filtered_ids.includes(user.id)"
         class="senceiveListGrid">
      <div class="_gird_lineNumber">
        <input type="checkbox" class="senceiveInput" :id="user.id">
      </div><!-- grid line number -->
      <div class="_gird_info">
        <div class="_btns">
          <div class="btn _thin _wAuto" @click="delUser(user.id)">delete</div>
          <div class="btn _thin _wAuto" @click="emailUser(user.id)">Contact</div>
        </div>
        <div class="_textual">
          <div class="infoLine">
            <span class="icons _lined">fingerprint</span>
            <span class="text" v-html="user.id"></span>
          </div>
          <div class="infoLine">
            <span class="icons _lined">badge</span>
            <span class="text _tag">first</span>
            <span class="text" :class="{'marked': user.mark=== 'name'}"
                  v-html="user.first_name"></span>
            <span class="text _tag">last</span>
            <span class="text" :class="{'marked': user.mark=== 'name'}"
                  v-html="user.last_name"></span>
          </div>
        </div>
      </div><!-- grid info -->
      <div class="_grid_more" @click="showUser(user)"></div><!-- grid more -->
    </div>
    <div v-else class="flex _wFull _hFull _on_center _on_middle">
      <div class="text _bold">Nothing here yet! 🤔</div>
    </div>
  </div><!-- ojaInnerBox -->

  <div style="border: 1px solid silver; text-align: center; width: 70%; margin-top: 60px;" >
    <p style="font-size: 8pt">For development tests only</p>
    <button @click="emitError">Generate Api Error</button>
  </div>


</template>

<script>
import Spinner from "./Spinner.vue";
export default {
  name: "UserLister",
  components: {Spinner},
  props: {
    isModuleBusy : {
      type: Boolean,
      required: false,
      default: false
    },
    filtered_ids: {
      type: Object,
      required: false,
      default: []
    }
  },
  inject: ["usersReactive"],
  emits: ["error", "deleteUser", "emailUser", "makeGroup", "showUser"],
  methods: {
    emitError () {
      this.$emit("error");
    },
    delUser(user_id) {console.log("HEY");this.$emit("deleteUser", user_id)},
    emailUser(user_id) {this.$emit("emailUser", user_id)},
    showUser(user) {this.$emit("showUser", user)},
  },
  computed: {
    listUsers() { return this.usersReactive.users.data}
  },
  mounted () {
    console.log("Received: ", this.users)
  }
}
</script>

<style scoped>
.marked {
  background-color: yellowgreen !important;
}
</style>