import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../../../data/contacts.json');

const readData = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts data:', error);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing contacts data:', error);
    return false;
  }
};

// GET all contacts
export const getAllContacts = () => {
  return readData();
};

// GET contact by ID
export const getContactByID = (id) => {
  const contacts = readData();
  return contacts.find(contact => contact.id === parseInt(id));
};

// POST - Add new contact
export const addNewContact = (data) => {
  const contacts = readData();
  const newId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
  
  const newContact = {
    id: newId,
    ...data,
    status: 'new',
    createdAt: new Date().toISOString()
  };
  
  contacts.push(newContact);
  
  if (writeData(contacts)) {
    return newContact;
  }
  return null;
};

// PUT - Update contact
export const updateContact = (id, data) => {
  const contacts = readData();
  const index = contacts.findIndex(contact => contact.id === parseInt(id));
  
  if (index === -1) return null;
  
  contacts[index] = { 
    ...contacts[index], 
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  if (writeData(contacts)) {
    return contacts[index];
  }
  return null;
};

// DELETE - Delete contact
export const deleteContact = (id) => {
  const contacts = readData();
  const index = contacts.findIndex(contact => contact.id === parseInt(id));
  
  if (index === -1) return false;
  
  contacts.splice(index, 1);
  
  return writeData(contacts);
};

// GET contacts by status
export const getContactsByStatus = (status) => {
  const contacts = readData();
  return contacts.filter(contact => contact.status === status);
};