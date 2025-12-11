import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../../../data/reservations.json');

const readData = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading reservations data:', error);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing reservations data:', error);
    return false;
  }
};

// GET all reservations
export const getAllReservations = () => {
  return readData();
};

// GET reservation by ID
export const getReservationByID = (id) => {
  const reservations = readData();
  return reservations.find(res => res.id === parseInt(id));
};

// POST - Add new reservation
export const addNewReservation = (data) => {
  const reservations = readData();
  const newId = reservations.length > 0 ? Math.max(...reservations.map(r => r.id)) + 1 : 1;
  
  const newReservation = {
    id: newId,
    ...data,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };
  
  reservations.push(newReservation);
  
  if (writeData(reservations)) {
    return newReservation;
  }
  return null;
};

// PUT - Update reservation
export const updateReservation = (id, data) => {
  const reservations = readData();
  const index = reservations.findIndex(res => res.id === parseInt(id));
  
  if (index === -1) return null;
  
  reservations[index] = { 
    ...reservations[index], 
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  if (writeData(reservations)) {
    return reservations[index];
  }
  return null;
};

// DELETE - Delete reservation
export const deleteReservation = (id) => {
  const reservations = readData();
  const index = reservations.findIndex(res => res.id === parseInt(id));
  
  if (index === -1) return false;
  
  reservations.splice(index, 1);
  
  return writeData(reservations);
};

// GET reservations by date (for checking availability)
export const getReservationsByDate = (date) => {
  const reservations = readData();
  return reservations.filter(res => res.date === date && res.status !== 'cancelled');
};