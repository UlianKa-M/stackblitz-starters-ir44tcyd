<template>
<v-app>
  <NavBar @toggle-sidebar="toggleSidebar" />
  <SideBar ref="sidebar" />
  <v-main :style="{ marginLeft: sidebarOpen ? '250px' : '0' }" class="main-content">
    <v-container>
      <router-view />
    </v-container>
  </v-main>
</v-app>
</template>

<script>
import NavBar from './components/UI/NavBar.vue';
import SideBar from './components/UI/SideBar.vue';

export default {
name: 'App',
components: { NavBar, SideBar },
data() {
  return { sidebarOpen: true };
},
mounted() {
  const saved = localStorage.getItem('sidebarCollapsed');
  if (saved !== null) this.sidebarOpen = saved === 'false';
  this.$watch(
    () => this.$refs.sidebar?.isCollapsed,
    (val) => { this.sidebarOpen = !val; }
  );
},
methods: {
  toggleSidebar() {
    this.$refs.sidebar?.toggleCollapse();
  },
},
};
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
.main-content { transition: margin-left 0.3s ease; padding-top: 60px; }
</style>