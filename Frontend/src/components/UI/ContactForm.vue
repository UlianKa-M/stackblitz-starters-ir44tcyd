<template>
<v-card class="contact-form-card" elevation="3">
  <v-card-title class="text-h5">
    <v-icon color="orange-darken-3" class="mr-2">mdi-email-outline</v-icon>
    Напишите нам
  </v-card-title>
  <v-card-text>
    <v-form ref="form" @submit.prevent="submit">
      <v-text-field v-model="form.name" label="Ваше имя *" variant="outlined" :rules="[v => !!v || 'Обязательное поле']" />
      <v-text-field v-model="form.email" label="Email *" type="email" variant="outlined" :rules="[v => !!v || 'Обязательное поле']" />
      <v-text-field v-model="form.phone" label="Телефон" variant="outlined" />
      <v-text-field v-model="form.subject" label="Тема" variant="outlined" />
      <v-textarea v-model="form.message" label="Сообщение *" variant="outlined" rows="4" :rules="[v => !!v || 'Обязательное поле']" />
      <v-btn type="submit" color="orange-darken-3" size="large" block :loading="loading">
        <v-icon start>mdi-send</v-icon> Отправить
      </v-btn>
    </v-form>
  </v-card-text>
</v-card>
</template>

<script>
import contactsService from '../../plugins/api/services/ContactsService.js';

export default {
name: 'ContactForm',
data() {
  return {
    loading: false,
    form: { name: '', email: '', phone: '', subject: '', message: '' },
  };
},
methods: {
  async submit() {
    if (!this.$refs.form.validate()) return;
    this.loading = true;
    try {
      await contactsService.sendMessage(this.form);
      alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
      this.form = { name: '', email: '', phone: '', subject: '', message: '' };
      this.$refs.form.reset();
    } catch (e) {
      alert('Ошибка: ' + e.message);
    } finally {
      this.loading = false;
    }
  },
},
};
</script>

<style scoped>
.contact-form-card {
padding: 20px;
}
</style>