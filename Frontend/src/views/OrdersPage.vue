<template>
<v-container class="py-8">
  <h1 class="mb-6" style="color: #333;">Мои заказы</h1>

  <v-card v-if="orders.length > 0" elevation="2">
    <v-table>
      <thead>
        <tr>
          <th>№</th>
          <th>Услуга</th>
          <th>Адрес</th>
          <th>Комментарий</th>
          <th>Дата</th>
          <th>Статус</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="o in orders" :key="o.id">
          <td>{{ o.fields.OrderId }}</td>
          <td>{{ getServiceName(o.fields.ServiceId) }}</td>
          <td>{{ o.fields.Address }}</td>
          <td>{{ o.fields.Comment || '—' }}</td>
          <td>{{ formatDate(o.fields.CreatedAt) }}</td>
          <td>
            <v-chip :color="statusColor(o.fields.Status)" variant="flat">{{ o.fields.Status }}</v-chip>
          </td>
          <td>
            <v-btn size="small" color="blue" @click="updateStatus(o, 'В работе')" class="mr-1">В работу</v-btn>
            <v-btn size="small" color="green" @click="updateStatus(o, 'Завершён')" class="mr-1">Завершить</v-btn>
            <v-btn size="small" color="red" @click="deleteOrder(o.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>

  <v-alert v-else type="info" variant="tonal">
    У вас пока нет заказов. <v-btn color="orange-darken-3" variant="text" to="/services">Перейти к услугам</v-btn>
  </v-alert>
</v-container>
</template>

<script>
import ordersService from '../plugins/api/services/OrdersService.js';
import servicesService from '../plugins/api/services/ServicesService.js';

export default {
name: 'OrdersPage',
data() { return { orders: [], services: [] }; },
async mounted() {
  await this.loadOrders();
  try {
    const data = await servicesService.getAllServices();
    this.services = data.records || [];
  } catch (e) { console.error(e); }
},
methods: {
  async loadOrders() {
    try {
      const userId = sessionStorage.getItem('userId');
      const data = await ordersService.getAllOrders();
      this.orders = (data.records || []).filter(o => o.fields.ClientId === parseInt(userId));
    } catch (e) { console.error(e); }
  },
  getServiceName(id) {
    const s = this.services.find(x => x.fields.ServiceId === id);
    return s ? s.fields.Name : '—';
  },
  formatDate(d) {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('ru-RU');
  },
  statusColor(s) {
    const map = { 'Новый': 'blue', 'В работе': 'orange', 'Завершён': 'green', 'Отменён': 'red' };
    return map[s] || 'grey';
  },
  async updateStatus(order, status) {
    await ordersService.updateOrder(order.id, { Status: status });
    await this.loadOrders();
  },
  async deleteOrder(id) {
    if (!confirm('Удалить заказ?')) return;
    await ordersService.deleteOrder(id);
    await this.loadOrders();
  },
},
};
</script>