<template>
<nav class="navbar">
  <div class="navbar-container">
    <div class="left-section">
      <button class="menu-btn" @click="toggleSidebar">
        <i class="mdi mdi-menu"></i>
      </button>
      <div class="logo">
        <i class="mdi mdi-welding"></i>
        <span>СваркаПро</span>
      </div>
    </div>
    <div class="right-section">
      <button v-if="!isLoggedIn" class="login-btn" @click="dialog = true">Войти</button>
      <div v-else class="user-info">
        <i class="mdi mdi-account-circle"></i>
        <span>{{ userDisplayName }}</span>
        <button class="logout-btn" @click="logout">
          <i class="mdi mdi-logout"></i>
        </button>
      </div>
    </div>
  </div>
  <LoginDialog v-model="dialog" @logged-in="onLoggedIn" />
</nav>
</template>

<script>
import LoginDialog from './LoginDialog.vue';
import userService from '../../plugins/api/services/UserService.js';

export default {
name: 'NavBar',
components: { LoginDialog },
data() {
  return {
    dialog: false,
    isLoggedIn: false,
    userEmail: '',
    userDisplayName: '',
  };
},
mounted() { this.checkAuthStatus(); },
methods: {
  toggleSidebar() { this.$emit('toggle-sidebar'); },
  checkAuthStatus() {
    const recordId = sessionStorage.getItem('recordId');
    const userEmail = sessionStorage.getItem('userEmail');
    const userFullName = sessionStorage.getItem('userFullName');
    if (recordId && userEmail) {
      this.isLoggedIn = true;
      this.userEmail = userEmail;
      this.userDisplayName = userFullName || userEmail;
      if (!userFullName) this.loadCurrentUser();
    } else {
      this.isLoggedIn = false;
      this.userDisplayName = '';
    }
  },
  async loadCurrentUser() {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;
    try {
      const user = await userService.getUserById(userId);
      if (user && user.fields) {
        const fullName = `${user.fields.Surname || ''} ${user.fields.Name || ''}`.trim();
        this.userDisplayName = fullName || this.userEmail;
        sessionStorage.setItem('userFullName', this.userDisplayName);
      }
    } catch (e) { console.error(e); }
  },
  onLoggedIn() { this.checkAuthStatus(); },
  logout() {
    ['recordId', 'userId', 'userEmail', 'userFullName', 'userName', 'userSurname', 'userPatronymic']
      .forEach(k => sessionStorage.removeItem(k));
    this.isLoggedIn = false;
    this.userDisplayName = '';
  },
},
};
</script>

<style scoped>
.navbar { position: fixed; top: 0; left: 0; right: 0; background-color: #e65100; color: white; height: 60px; z-index: 1000; }
.navbar-container { display: flex; justify-content: space-between; align-items: center; height: 100%; padding: 0 20px; }
.left-section, .right-section { display: flex; align-items: center; gap: 20px; }
.menu-btn, .logout-btn { background: none; border: none; color: white; cursor: pointer; }
.menu-btn { font-size: 24px; }
.logout-btn { font-size: 20px; }
.logo { display: flex; align-items: center; gap: 8px; font-size: 20px; font-weight: bold; }
.login-btn { background: white; color: #e65100; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: bold; }
.user-info { display: flex; align-items: center; gap: 8px; }
.user-info i { font-size: 24px; }
</style>