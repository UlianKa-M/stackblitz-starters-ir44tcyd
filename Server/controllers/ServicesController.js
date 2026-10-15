import express from 'express';
import tableService from '../services/TableService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try { res.json(await tableService.get('services.json')); }
  catch (error) { res.status(500).json({ message: 'Ошибка получения услуг' }); }
});

router.get('/getById', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: 'Не указан ID' });
  try {
    const data = await tableService.get('services.json');
    const found = data.records.find((r) => r.fields.ServiceId === parseInt(id));
    if (!found) return res.status(404).json({ message: 'Услуга не найдена' });
    res.json(found);
  } catch (error) { res.status(500).json({ message: 'Ошибка сервера' }); }
});

// GET — фильтр по категории
router.get('/byCategory', async (req, res) => {
  const { category } = req.query;
  if (!category) return res.status(400).json({ message: 'Не указана категория' });
  try {
    const data = await tableService.get('services.json');
    const filtered = data.records.filter((r) => r.fields.Category === category);
    res.json({ records: filtered });
  } catch (error) { res.status(500).json({ message: 'Ошибка фильтрации' }); }
});

export default router;