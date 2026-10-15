import express from 'express';
import tableService from '../services/TableService.js';

const router = express.Router();

// GET — авторизация
router.get('/auth', async (req, res) => {
  const { email, password } = req.query;
  if (!email || !password)
    return res.status(400).json({ message: 'Не заполнены обязательные поля' });
  try {
    const data = await tableService.get('login.json');
    const found = data.records.find(
      (r) => r.fields.Email === email && r.fields.Password === password
    );
    if (!found) return res.status(401).json({ message: 'Неверный email или пароль', userId: 0 });
    res.status(200).json({
      message: 'Успешная авторизация',
      userId: found.fields.UserId,
      recordId: found.id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// POST — регистрация
router.post('/register', async (req, res) => {
  const { email, password, name, surname, patronymic, phone } = req.body;
  if (!email || !password || !name || !surname)
    return res.status(400).json({ message: 'Не заполнены обязательные поля' });
  try {
    const logins = await tableService.get('login.json');
    if (logins.records.find((r) => r.fields.Email === email))
      return res.status(400).json({ message: 'Email уже зарегистрирован' });
    const users = await tableService.get('users.json');
    const newUserId = users.records.length > 0
      ? Math.max(...users.records.map((r) => r.fields.UserId)) + 1 : 1;
    await tableService.create('users.json', {
      UserId: newUserId, Name: name, Surname: surname,
      Patronymic: patronymic || '', Phone: phone || '',
      DateRegistration: new Date().toISOString(),
    });
    await tableService.create('login.json', {
      LoginId: logins.records.length + 1,
      UserId: newUserId, Login: email.split('@')[0],
      Password: password, Email: email,
    });
    res.status(201).json({ message: 'Регистрация успешна', userId: newUserId });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка регистрации' });
  }
});

export default router;