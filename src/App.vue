<script setup>
  import Forehead from './components/Forehead.vue';
  import DataController from './components/DataController.vue';
  import { provide, reactive, ref } from 'vue';
  import UserLister from './components/UserLister.vue'
  import UserDetail from './components/UserDetail.vue'
  import BruceRoyce from './components/BruceRoyce.vue'
  import LoadUsers from './components/LoadUsers.vue'
  import axios from 'axios';
  import Spinner from './components/Spinner.vue'
  import FullScreen from './components/FullScreen.vue'
  import { sortBy }  from 'lodash';
  import ClearFilter from './components/ClearFilter.vue'
  // import SearchUser from './components/SearchUser.js'
  //
  const apiUrl = "https://reqres.in/api/users?page=1";
  // error handling
  let error = reactive({
    state: false,
    title: "Sorry!",
    msg: "This is just a test.<br>That is not implemented in this exercise!"
  })
  const usersReactive = reactive({ users: {} });
  const user = ref();
  const filtered_ids = reactive ({show: []});
  const modulesState = reactive({
    app: {
      active: true,
      busy: false
    },
    booter: {
      busy: false,
      active: true
    },
    dataController : {
      busy: false,
      active: false
    },
    lister : {
      busy: false,
      active: false
    },
    detailer : {
      busy: false,
      active: false
    },
    deactivateAll() {
      ['booter', 'dataController', 'lister', 'detailer'].forEach(mod=>{
        this.toggleActiveState(mod, false);
      });
    },
    toggleBusyState (module, state) {
      if (state) modulesState[module].busy = true;
      else {
        console.log("A bit of a fake delay to make the animation visible 😎");
        setTimeout(()=>{modulesState[module].busy = false},200)
      }
    },
    toggleActiveState (module, state) {
    return modulesState[module].active = state;
    }
  });
  function boot () {ajax(flowControl, "showlister");}
  function ajax (callback = null, callBackArgs = null) {
    modulesState.toggleBusyState("app", true);
    axios
        .get(apiUrl)
        .then((response) => {
          console.log("AJAX response ", response);
          if (typeof response.data === "object") {
            console.log("replacing new data");
            usersReactive.users = response.data;
          } else {
            usersReactive.users = {};
          }
        })
        .catch((err) => {
          console.log(err);
          apiError("listAll");
        })
        .finally((response) => {
          modulesState.toggleBusyState("app", false);
          if (callback !== null) {
            if (callBackArgs !== null) {
              callback(callBackArgs);
            } else {
              callback(response);
            }
          }
        })
  }
  function sortUsersBy(sortOrder) {
    console.debug(">> Attempting to sort by " + sortOrder);
    modulesState.toggleBusyState("lister", true);
    const users = usersReactive.users.data;
    let result;
    switch (sortOrder) {
      case "name":
        result = sortBy(users, ['first_name']);
        break;
      case "id":
        result = sortBy(users, ['id']);
        break;
    }
    console.debug(">> Sorted result: ", result);
    usersReactive.users.data = result;
    modulesState.toggleBusyState("lister", false);
  }
  function flowControl (action, data=null) {
    console.log(">> Action", action);
    console.debug("Data: ", data);
    modulesState.deactivateAll();
    switch (action) {
      case "showlister":
        modulesState.toggleActiveState("dataController", true);
        modulesState.toggleActiveState("lister", true);
        break;
      case "showDetailer":
        user.value = data;
        modulesState.toggleActiveState("detailer", true);
        break;
    }

  }
  function closeFullscreen () {
    error.state = false;
  }
  function deleteUser(user_id) {
    // shallow copy
    const users = JSON.parse(JSON.stringify(usersReactive.users.data));
    console.log("User to del: " + user_id,);
    let result = [];
    Object.keys(users).filter((user)=>{
      if (users[user].id != user_id) {
        result.push(users[user]);
      }
    });
    usersReactive.users.data = result;
    flowControl('showlister');
  }
  function searchUsers(searchTerm) {
    console.log("searching for: ", searchTerm);
    if (!searchTerm) showFilterResults('reset');
    searchTerm = searchTerm.toLowerCase();
    const users = JSON.parse(JSON.stringify(usersReactive.users.data));
    const result = [];
    Object.keys(users).forEach((row)=>{
      Object.keys(users[row]).forEach((key)=>{
        if ((users[row][key]+'').toLowerCase() == searchTerm) {
          result.push(users[row]);
        }
      });
    });
    console.log("Res:", result);
    showFilterResults(result);
  }
  function showFilterResults(result) {
    if (result==="reset") {
      filtered_ids.show = [];
      return true
    } else {
      result.forEach((row)=>{
        console.log("RR", row)
        filtered_ids.show.push(row.id);
      })
    }
  }
  function apiError(module) {
    switch (module) {
      case "api":
        error.title = "Oops!";
        error.msg = "There is an error communicating with the server.<br>Please try again later.";
        break;
      default:
        error.title = "This is an interview test!";
        error.msg = "This is just a test.<br>That is not implemented in this exercise!";
    }
    error.state = true;
  }

  provide("usersReactive", usersReactive);
  provide("apiUrl", apiUrl);


</script>

<template>
  <teleport v-if="error.state" to="#fullscreen">
    <full-screen
        @ok="closeFullscreen"
        :title="error.title" :msg="error.msg" />
  </teleport>
  <header>
    <Forehead />
  </header >
  <spinner :is-active="modulesState.app.busy" />
  <main>
    <load-users @load="boot"/>
    <data-controller
        v-if="modulesState.dataController.active"
        @sort-order="sortUsersBy"
        @filter-phrase = "searchUsers"
    />
    <clear-filter
        v-if="filtered_ids.show.length > 0"
        @clear-filter="showFilterResults('reset')"/>
    <user-lister
        :is-module-busy="modulesState.lister.busy"
        :filtered_ids="filtered_ids.show"
        v-if="modulesState.lister.active"
        @show-user="(user)=>{flowControl('showDetailer', user)}"
        @delete-user="deleteUser"
        @email-user="apiError"
        @error="apiError('api')"
    />
    <user-detail
        :user="user"
        @delete-user="deleteUser"
        @email-user="apiError"
        @show-list="flowControl('showlister')"
        v-if="modulesState.detailer.active" />
  </main>
  <footer>
    <bruce-royce />
  </footer>
</template>

<style>
@import './assets/senceive.css';
</style>
