

const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3002'

// Menu Items API
export async function getMenuItems(params = {}) {
  try {
    const queryString = new URLSearchParams(params).toString()
    const url = `${BASE}/api/menu-items${queryString ? `?${queryString}` : ''}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch menu items')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching menu items:', error)
    throw error
  }
}

export async function getMenuItemById(id) {
  try {
    const response = await fetch(`${BASE}/api/menu-items/${id}`)
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch menu item')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching menu item:', error)
    throw error
  }
}

export async function getMenuItemsByCategory(category) {
  try {
    const response = await fetch(`${BASE}/api/menu-items/category/${category}`)
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch menu items by category')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching menu items by category:', error)
    throw error
  }
}

// Reservations API
export async function createReservation(data) {
  try {
    const response = await fetch(`${BASE}/api/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to create reservation')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error creating reservation:', error)
    throw error
  }
}

export async function getReservations() {
  try {
    const response = await fetch(`${BASE}/api/reservations`)
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch reservations')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching reservations:', error)
    throw error
  }
}

export async function getReservationsByDate(date) {
  try {
    const response = await fetch(`${BASE}/api/reservations/date/${date}`)
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch reservations by date')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching reservations by date:', error)
    throw error
  }
}

// Contacts API
export async function createContact(data) {
  try {
    const response = await fetch(`${BASE}/api/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to send contact message')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error creating contact:', error)
    throw error
  }
}

export async function getContacts() {
  try {
    const response = await fetch(`${BASE}/api/contacts`)
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch contacts')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching contacts:', error)
    throw error
  }
}

export async function getContactsByStatus(status) {
  try {
    const response = await fetch(`${BASE}/api/contacts/status/${status}`)
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch contacts by status')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching contacts by status:', error)
    throw error
  }
}

// Health check
export async function checkApiHealth() {
  try {
    const response = await fetch(`${BASE}/test`)
    
    if (!response.ok) {
      throw new Error('API is not responding')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error checking API health:', error)
    throw error
  }
}

// Test email service
export async function testEmailService() {
  try {
    const response = await fetch(`${BASE}/api/test-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to test email service')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error testing email service:', error)
    throw error
  }
}

// Test database connection
export async function testDatabaseConnection() {
  try {
    const response = await fetch(`${BASE}/api/test-db`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to test database connection')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error testing database connection:', error)
    throw error
  }
}

// Export all functions
export default {
  // Menu
  getMenuItems,
  getMenuItemById,
  getMenuItemsByCategory,
  
  // Reservations
  createReservation,
  getReservations,
  getReservationsByDate,
  
  // Contacts
  createContact,
  getContacts,
  getContactsByStatus,
  
  // Health checks
  checkApiHealth,
  testEmailService,
  testDatabaseConnection
}