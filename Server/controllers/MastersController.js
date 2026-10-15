import express from 'express';
import tableService from '../services/TableService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try { res.json(await tableService.get('masters.json')); }
  catch (error) { res.status(500).json({ message: 'Ошибка получения мастеров' }); }
});

router.get('/getById', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: 'Не указан ID' });
  try {
    const data = await tableService.get('masters.json');
    const found = data.records.find((r) => r.fields.MasterId === parseInt(id));
    if (!found) return res.status(404).json({ message: 'Мастер не найден' });
    res.json(found);
  } catch (error) { res.status(500).json({ message: 'Ошибка сервера' }); }
});

export default router;