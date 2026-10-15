import express from 'express';
import tableService from '../services/TableService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try { res.json(await tableService.get('portfolio.json')); }
  catch (error) { res.status(500).json({ message: 'Ошибка получения портфолио' }); }
});

router.get('/byCategory', async (req, res) => {
  const { category } = req.query;
  if (!category) return res.status(400).json({ message: 'Не указана категория' });
  try {
    const data = await tableService.get('portfolio.json');
    const filtered = data.records.filter((r) => r.fields.Category === category);
    res.json({ records: filtered });
  } catch (error) { res.status(500).json({ message: 'Ошибка' }); }
});

export default router;