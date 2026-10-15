<template>
<v-container class="py-8">
  <h1 class="mb-2" style="color: #333;">Контакты</h1>
  <p class="text-grey mb-6">Свяжитесь с нами удобным способом</p>

  <v-row>
    <v-col cols="12" md="6">
      <v-card v-if="contacts" class="pa-6" elevation="3">
        <h3 class="mb-4">Наши координаты</h3>
        <div class="contact-item">
          <v-icon color="orange-darken-3" class="mr-3">mdi-map-marker</v-icon>
          <div>
            <b>Адрес:</b><br>
            {{ contacts.fields.Address }}
          </div>
        </div>
        <div class="contact-item">
          <v-icon color="orange-darken-3" class="mr-3">mdi-phone</v-icon>
          <div>
            <b>Телефон:</b><br>
            {{ contacts.fields.Phone }}<br>
            {{ contacts.fields.Mobile }}
          </div>
        </div>
        <div class="contact-item">
          <v-icon color="orange-darken-3" class="mr-3">mdi-email</v-icon>
          <div>
            <b>Email:</b><br>
            {{ contacts.fields.Email }}
          </div>
        </div>
        <div class="contact-item">
          <v-icon color="orange-darken-3" class="mr-3">mdi-clock-outline</v-icon>
          <div>
            <b>Режим работы:</b><br>
            {{ contacts.fields.WorkHours }}
          </div>
        </div>
        <v-divider class="my-4"></v-divider>
        <div class="social-links">
          <v-btn color="blue" variant="flat" :href="contacts.fields.SocialVK" target="_blank" class="mr-2">
            <v-icon start>mdi-vk</v-icon> ВКонтакте
          </v-btn>
          <v-btn color="blue-lighten-2" variant="flat" :href="contacts.fields.SocialTG" target="_blank">
            <v-icon start>mdi-telegram</v-icon> Telegram
          </v-btn>
        </div>
      </v-card>
    </v-col>

    <v-col cols="12" md="6">
      <ContactForm />
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import ContactForm from '../components/UI/ContactForm.vue';
import contactsService from '../plugins/api/services/ContactsService.js';

export default {
name: 'ContactsPage',
components: { ContactForm },
data() { return { contacts: null }; },
async mounted() {
  try {
    const data = await contactsService.getContacts();
    if (data.records && data.records.length > 0) {
      this.contacts = data.records[0];
    }
  } catch (e) { console.error(e); }
},
};
</script>

<style scoped>
.contact-item {
display: flex;
align-items: flex-start;
margin-bottom: 20px;
font-size: 15px;
}
.social-links {
display: flex;
gap: 10px;
flex-wrap: wrap;
}
</style>