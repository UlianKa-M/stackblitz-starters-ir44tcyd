import express from 'express';
import tableService from '../services/TableService.js';

const router = express.Router();

// GET — все отзывы
router.get('/', async (req, res) => {
  try { res.json(await tableService.get('reviews.json')); }
  catch (error) { res.status(500).json({ message: 'Ошибка получения отзывов' }); }
});

// POST — создать отзыв
router.post('/', async (req, res) => {
  try {
    const { clientId, clientName, rating, text, serviceName } = req.body;
    if (!clientName || !rating || !text)
      return res.status(400).json({ message: 'Не заполнены обязательные поля' });
    const reviews = await tableService.get('reviews.json');
    const newId = reviews.records.length > 0
      ? Math.max(...reviews.records.map((r) => r.fields.ReviewId || 0)) + 1 : 1;
    const newReview = await tableService.create('reviews.json', {
      ReviewId: newId, ClientId: clientId || 0, ClientName: clientName,
      Rating: parseInt(rating), Text: text, ServiceName: serviceName || '',
      Date: new Date().toISOString().split('T')[0],
    });
    res.status(201).json(newReview);
  } catch (error) { res.status(500).json({ message: 'Ошибка создания отзыва' }); }
});

// PUT — обновить отзыв
router.put('/:id', async (req, res) => {
  try {
    const updated = await tableService.put('reviews.json', req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Отзыв не найден' });
    res.json(updated);
  } catch (error) { res.status(500).json({ message: 'Ошибка обновления' }); }
});

// DELETE — удалить отзыв
router.delete('/:id', async (req, res) => {
  try {
    await tableService.delete('reviews.json', req.params.id);
    res.json({ message: 'Отзыв удалён' });
  } catch (error) { res.status(500).json({ message: 'Ошибка удаления' }); }
});

export default router;