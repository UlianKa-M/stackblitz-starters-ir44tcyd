<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-tabs v-model="tab" color="orange-darken-3">
        <v-tab value="login">Войти</v-tab>
        <v-tab value="register">Регистрация</v-tab>
      </v-tabs>
      <v-card-text>
        <v-text-field
          v-model="email"
          label="Email *"
          variant="outlined"
          class="mt-4"
        />
        <v-text-field
          v-model="password"
          label="Пароль *"
          type="password"
          variant="outlined"
        />
        <div v-if="tab === 'register'">
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="name" label="Имя *" variant="outlined" />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="surname"
                label="Фамилия *"
                variant="outlined"
              />
            </v-col>
          </v-row>
          <v-text-field
            v-model="patronymic"
            label="Отчество"
            variant="outlined"
          />
          <v-text-field v-model="phone" label="Телефон" variant="outlined" />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="close">Отмена</v-btn>
        <v-btn color="orange-darken-3" @click="submit">
          {{ tab === 'login' ? 'Войти' : 'Зарегистрироваться' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import loginService from '../../plugins/api/services/LoginService.js';
import userService from '../../plugins/api/services/UserService.js';

export default {
  name: 'LoginDialog',
  props: { modelValue: Boolean },
  emits: ['update:modelValue', 'logged-in'],
  data() {
    return {
      tab: 'login',
      email: '',
      password: '',
      name: '',
      surname: '',
      patronymic: '',
      phone: '',
    };
  },
  computed: {
    dialog: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },
  methods: {
    close() {
      this.dialog = false;
    },
    async submit() {
      if (!this.email || !this.password) {
        alert('Email и пароль обязательны!');
        return;
      }
      try {
        if (this.tab === 'login') {
          const result = await loginService.authorizationUser(
            this.email,
            this.password
          );
          if (result.recordId) {
            sessionStorage.setItem('recordId', result.recordId);
            sessionStorage.setItem('userId', result.userId);
            sessionStorage.setItem('userEmail', this.email);
            const currentUser = await userService.getUserById(result.userId);
            if (currentUser && currentUser.fields) {
              const fullName = `${currentUser.fields.Surname || ''} ${
                currentUser.fields.Name || ''
              }`.trim();
              sessionStorage.setItem('userFullName', fullName);
            }
          }
        } else {
          if (!this.name || !this.surname) {
            alert('Заполните имя и фамилию!');
            return;
          }
          await loginService.registerUser({
            email: this.email,
            password: this.password,
            name: this.name,
            surname: this.surname,
            patronymic: this.patronymic,
            phone: this.phone,
          });
          alert('Регистрация успешна! Теперь войдите.');
          this.tab = 'login';
          return;
        }
        this.$emit('logged-in');
        this.close();
      } catch (error) {
        alert(error.message || 'Ошибка');
      }
    },
  },
};
</script>
