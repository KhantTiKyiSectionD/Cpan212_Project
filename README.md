# 🍽️ Boho Bistro Web App

Groupmates:
Aliana Santos (N01649330)
Khant Ti Kyi (N01709727)

Boho Bistro is a restaurant website project that was originally built with static **HTML, CSS, and Bootstrap**.  
We are converting it into a **React.js frontend** with a **Node.js + Express backend** to make it more dynamic and modular.

---

## 🚀 Features

- React frontend with multiple pages (`Home`, `Menu`, `Reservation`, `Contact Us`)
- Node.js + Express backend serving API routes
- Dummy API endpoints for menu items and reservations
- Responsive design using Bootstrap

---

# Boho Bistro - Phase 2 Submission

## Project Overview

Boho Bistro is a full-stack web application for a restaurant, featuring a React frontend and Express.js backend with modular architecture.

## Phase 2: Modular Architecture Implementation

### ✅ Completed Tasks

#### 1. Data Structure Implementation

- Created JSON data files for all entities:
  - `server/data/menuItems.json` - 36 menu items across 4 categories
  - `server/data/reservations.json` - Reservation system data
  - `server/data/contacts.json` - Contact form submissions

#### 2. Modular Express.js Architecture

- Implemented feature-based module structure:
  - `server/modules/menu-items/`
  - `server/modules/reservations/`
  - `server/modules/contacts/`

#### 3. Module Structure (Each module contains):

- **Models** - Business logic and CRUD operations
- **Routes** - Express Router with independent routes
- **Middlewares** - Validation rules and route-level middleware

#### 4. Application-Level Middlewares

- `express.json()` - Body parsing middleware
- `express.urlencoded()` - URL-encoded data parsing
- `cors()` - Cross-Origin Resource Sharing
- Custom request logger
- 404 Not Found handler
- Global error-handling middleware

#### 5. CRUD Operations Implementation

**Menu Items Module:**

- `getAllMenuItems()` - Fetch all menu items
- `getMenuItemsByCategory(category)` - Filter by category
- `getMenuItemByID(id)` - Get single item by ID
- `addNewMenuItem(data)` - Create new menu item
- `updateExistingMenuItem(id, data)` - Update menu item
- `deleteMenuItem(id)` - Delete menu item

**Reservations Module:**

- `getAllReservations()` - Fetch all reservations
- `getReservationByID(id)` - Get reservation by ID
- `addNewReservation(data)` - Create new reservation
- `updateReservation(id, data)` - Update reservation
- `deleteReservation(id)` - Delete reservation

**Contacts Module:**

- `getAllContacts()` - Fetch all contact submissions
- `getContactByID(id)` - Get contact by ID
- `addNewContact(data)` - Create new contact submission
- `updateContact(id, data)` - Update contact
- `deleteContact(id)` - Delete contact

#### 6. Route-Level Middlewares

- **express-validator** implementation for all POST/PUT routes
- Validation rules for required fields, data types, and constraints
- Custom validation error handling

#### 7. HTTP Response Standards

- **200 OK** - Successful GET/PUT/DELETE operations
- **201 Created** - Successful POST operations
- **400 Bad Request** - Validation errors
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server errors
- Consistent JSON response format

#### 8. API Endpoints Implemented

**Menu Items:**

- `GET /api/menu-items` - Get all menu items
- `GET /api/menu-items/category/:category` - Get items by category
- `GET /api/menu-items/:id` - Get single menu item
- `POST /api/menu-items` - Create new menu item
- `PUT /api/menu-items/:id` - Update menu item
- `DELETE /api/menu-items/:id` - Delete menu item

**Reservations:**

- `GET /api/reservations` - Get all reservations
- `POST /api/reservations` - Create new reservation
- `GET /api/reservations/:id` - Get reservation by ID
- `PUT /api/reservations/:id` - Update reservation
- `DELETE /api/reservations/:id` - Delete reservation

**Contacts:**

- `GET /api/contacts` - Get all contact submissions
- `POST /api/contacts` - Create new contact
- `GET /api/contacts/:id` - Get contact by ID
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

#### 9. Testing

- All routes tested using Postman
- CRUD operations verified for all entities
- Validation and error handling confirmed
- HTTP status codes validated

### 🛠 Technical Stack

- **Backend:** Node.js, Express.js
- **Validation:** express-validator
- **Architecture:** Modular, Feature-based
- **Data Storage:** JSON files
- **CORS:** Enabled for frontend-backend communication

### 🚀 How to Run

1. Navigate to server directory: `cd server`
2. Install dependencies: `npm install`
3. Start server: `node index.js`
4. Server runs on: `http://localhost:3002`

### 📁 Project Structure

boho-bistro-react/
├── server/
│ ├── modules/
│ │ ├── menu-items/
│ │ ├── reservations/
│ │ └── contacts/
│ ├── data/
│ ├── middlewares/
│ └── index.js
├── src/ (React frontend)
└── README.md

## Team Contributions

### Aliana Santos

- **Middleware Development**: Created all validation middlewares using express-validator
- **Error Handling**: Implemented global error handling and 404 middleware
- **Data Models**: Developed all model files with CRUD operations
- **Server Configuration**: Contributed to server/index.js setup and configuration
- **API Testing**: Tested all endpoints using Postman

### Khant Ti Kyi

- **Route Development**: Created all Express routes with proper HTTP methods
- **API Endpoints**: Implemented GET, POST, PUT, DELETE endpoints for all modules
- **Route Structure**: Organized route files with Express Router
- **Server Integration**: Contributed to server/index.js route imports and setup
- **Module Coordination**: Ensured routes properly connected to models and middlewares

### Collaborative Work

- **Both team members** worked together on:
  - Project planning and architecture design
  - server/index.js configuration and debugging
  - Testing and validating API endpoints
  - Code review and quality assurance

---
