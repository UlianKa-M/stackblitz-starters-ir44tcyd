<template>
<div class="sidebar" v-show="!isCollapsed">
  <router-link to="/" class="sidebar-item" active-class="active">
    <div class="icon home-icon"><i class="mdi mdi-home"></i></div>
    <span>Главная</span>
  </router-link>
  <router-link to="/services" class="sidebar-item" active-class="active">
    <div class="icon services-icon"><i class="mdi mdi-wrench"></i></div>
    <span>Услуги</span>
  </router-link>
  <router-link to="/masters" class="sidebar-item" active-class="active">
    <div class="icon masters-icon"><i class="mdi mdi-account-hard-hat"></i></div>
    <span>Мастера</span>
  </router-link>
  <router-link to="/portfolio" class="sidebar-item" active-class="active">
    <div class="icon portfolio-icon"><i class="mdi mdi-image-multiple"></i></div>
    <span>Наши работы</span>
  </router-link>
  <router-link to="/reviews" class="sidebar-item" active-class="active">
    <div class="icon reviews-icon"><i class="mdi mdi-star"></i></div>
    <span>Отзывы</span>
  </router-link>
  <router-link to="/orders" class="sidebar-item" active-class="active">
    <div class="icon orders-icon"><i class="mdi mdi-clipboard-list"></i></div>
    <span>Мои заказы</span>
  </router-link>
  <router-link to="/contacts" class="sidebar-item" active-class="active">
    <div class="icon contacts-icon"><i class="mdi mdi-phone"></i></div>
    <span>Контакты</span>
  </router-link>
</div>
</template>

<script>
export default {
name: 'SideBar',
data() { return { isCollapsed: false }; },
mounted() {
  const saved = localStorage.getItem('sidebarCollapsed');
  if (saved !== null) this.isCollapsed = saved === 'true';
},
methods: {
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem('sidebarCollapsed', this.isCollapsed);
  },
},
};
</script>

<style scoped>
.sidebar {
position: fixed;
left: 0;
top: 60px;
width: 250px;
height: calc(100% - 60px);
background-color: white;
border-right: 1px solid #e0e0e0;
overflow-y: auto;
z-index: 900;
}
.sidebar-item {
display: flex;
align-items: center;
padding: 14px 20px;
cursor: pointer;
transition: background-color 0.2s;
text-decoration: none;
color: #333;
}
.sidebar-item:hover { background-color: #fff3e0; }
.sidebar-item.active { background-color: #ffe0b2; border-right: 3px solid #e65100; }
.icon {
width: 32px; height: 32px;
display: flex; align-items: center; justify-content: center;
border-radius: 8px; margin-right: 12px;
}
.icon i { color: white; font-size: 18px; }
.home-icon { background-color: #e65100; }
.services-icon { background-color: #f57c00; }
.masters-icon { background-color: #ef6c00; }
.portfolio-icon { background-color: #e65100; }
.reviews-icon { background-color: #ffb300; }
.orders-icon { background-color: #9e9e9e; }
.contacts-icon { background-color: #757575; }
</style>