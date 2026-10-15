import express from 'express';
import tableService from '../services/TableService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const records = await tableService.get('users.json');
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка получения пользователей' });
  }
});

router.get('/getById', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: 'Не указан ID' });
  try {
    const data = await tableService.get('users.json');
    const foundUser = data.records.find((r) => r.fields.UserId === parseInt(id));
    if (!foundUser) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json(foundUser);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;