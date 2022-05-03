<template>
  <div class="senceiveInnerBox _r senceiveAlignSelfTop" style="flex-grow: 1">
    <spinner :is-active="isModuleBusy" />
    <div class="senceiveDetailGrid">
      <div class="_back" @click="showList"></div>
      <div class="_info">
        <div class="_avatar"
             :style="{ backgroundImage: 'url(' + user.avatar + ')' }">
          <div class="_decoRot"></div>
        </div>
        <div class="infoLine">
          <span class="icons _lined">badge</span>
          <div class="textual">
            <span class="text _tag">first</span>
            <span class="text _bold"
                  v-html="user.first_name"></span>
            <span class="text _tag">last</span>
            <span class="text _bold"
                  v-html="user.last_name"></span>
          </div>

        </div>
        <div class="infoLine">
          <span class="icons _lined">email</span>
          <span class="text _bold" v-html="user.email"></span>
        </div>
      </div>

      <div class="_btns">
        <div class="btn _wAuto" @click="delUser(user.id)">delete</div>
        <div class="btn _wAuto" @click="emailUser(user.id)">Contact</div>
      </div>
    </div><!-- end main grid -->


  </div>
</template>

<script>

import Spinner from './Spinner.vue'
import { reactive } from 'vue'
export default {
  name: 'UserDetail',
  components: { Spinner },
  props: ['user', 'isModuleBusy'],
  // inject: ["users"],
  emits: ["deleteUser", "emailUser", "showList"],
  setup (props, {emit}) {
    console.log("-- USER", props.user);
    const user_id = props.user.id;
    function delUser(user_id) {emit("deleteUser", user_id)};
    function emailUser(user_id) {emit("emailUser", user_id)};
    function showList(user) {emit("showList")};
    function getAvatar() {
      return {
        backgroundImage: `url(${props.user.avatar})`
      }
    }

    return {
      user_id,
      delUser,
      emailUser,
      showList,
      getAvatar
    }
  }
}
</script>

<style scoped>

</style>