import express from 'express';
import tableService from '../services/TableService.js';

const router = express.Router();

// GET — все заказы
router.get('/', async (req, res) => {
  try { res.json(await tableService.get('orders.json')); }
  catch (error) { res.status(500).json({ message: 'Ошибка получения заказов' }); }
});

// GET — заказы клиента
router.get('/byClient', async (req, res) => {
  const { clientId } = req.query;
  if (!clientId) return res.status(400).json({ message: 'Не указан clientId' });
  try {
    const data = await tableService.get('orders.json');
    const filtered = data.records.filter((r) => r.fields.ClientId === parseInt(clientId));
    res.json({ records: filtered });
  } catch (error) { res.status(500).json({ message: 'Ошибка' }); }
});

// POST — создать заказ
router.post('/', async (req, res) => {
  try {
    const { clientId, serviceId, address, comment, status } = req.body;
    if (!clientId || !serviceId || !address)
      return res.status(400).json({ message: 'Не заполнены обязательные поля' });
    const orders = await tableService.get('orders.json');
    const newId = orders.records.length > 0
      ? Math.max(...orders.records.map((r) => r.fields.OrderId || 0)) + 1 : 1;
    const newOrder = await tableService.create('orders.json', {
      OrderId: newId, ClientId: clientId, ServiceId: serviceId,
      Address: address, Comment: comment || '',
      Status: status || 'Новый',
      CreatedAt: new Date().toISOString(),
    });
    res.status(201).json(newOrder);
  } catch (error) { res.status(500).json({ message: 'Ошибка создания заказа' }); }
});

// PUT — обновить заказ
router.put('/:id', async (req, res) => {
  try {
    const updated = await tableService.put('orders.json', req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Заказ не найден' });
    res.json(updated);
  } catch (error) { res.status(500).json({ message: 'Ошибка обновления' }); }
});

// DELETE — удалить заказ
router.delete('/:id', async (req, res) => {
  try {
    await tableService.delete('orders.json', req.params.id);
    res.json({ message: 'Заказ удалён' });
  } catch (error) { res.status(500).json({ message: 'Ошибка удаления' }); }
});

export default router;