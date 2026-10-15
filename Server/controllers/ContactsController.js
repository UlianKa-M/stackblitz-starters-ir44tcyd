import express from 'express';
import tableService from '../services/TableService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try { res.json(await tableService.get('contacts.json')); }
  catch (error) { res.status(500).json({ message: 'Ошибка получения контактов' }); }
});

// POST — отправить сообщение через форму
router.post('/message', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ message: 'Не заполнены обязательные поля' });
    const messages = await tableService.get('messages.json');
    const newId = messages.records.length + 1;
    const newMessage = await tableService.create('messages.json', {
      MessageId: newId, Name: name, Email: email,
      Phone: phone || '', Subject: subject || '',
      Message: message, CreatedAt: new Date().toISOString(),
    });
    res.status(201).json(newMessage);
  } catch (error) { res.status(500).json({ message: 'Ошибка отправки' }); }
});

export default router;