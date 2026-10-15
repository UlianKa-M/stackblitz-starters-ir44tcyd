import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class TablesService {
  _readFile(fileName) {
    const filePath = path.join(__dirname, '..', 'data', fileName);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }
  _writeFile(fileName, data) {
    const filePath = path.join(__dirname, '..', 'data', fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  }
  async get(fileName) { return this._readFile(fileName); }
  async getById(fileName, recordId) {
    const data = this._readFile(fileName);
    return data.records.find((r) => r.id === recordId) || null;
  }
  async create(fileName, record) {
    const data = this._readFile(fileName);
    const newId = `rec_${fileName.replace('.json', '')}_${Date.now()}`;
    const newRecord = { id: newId, fields: record };
    data.records.push(newRecord);
    this._writeFile(fileName, data);
    return newRecord;
  }
  async put(fileName, recordId, data) {
    const file = this._readFile(fileName);
    const index = file.records.findIndex((r) => r.id === recordId);
    if (index === -1) return null;
    file.records[index] = { id: recordId, fields: { ...file.records[index].fields, ...data } };
    this._writeFile(fileName, file);
    return file.records[index];
  }
  async delete(fileName, recordId) {
    const data = this._readFile(fileName);
    const filtered = data.records.filter((r) => r.id !== recordId);
    this._writeFile(fileName, { records: filtered });
    return { success: true };
  }
  async getByField(fileName, field, value) {
    const data = this._readFile(fileName);
    return data.records.filter((r) => r.fields[field] === value);
  }
}

export default new TablesService();