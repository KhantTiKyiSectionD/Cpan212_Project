const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname)));

// Dummy menu data
const menuItems = [
  { id: 1, name: "Seared Scallops", description: "With pea purée and crispy pancetta.", price: 18 },
  { id: 2, name: "Foie Gras", description: "Served with fig jam and toasted brioche.", price: 22 },
  { id: 3, name: "Truffle Soup", description: "Rich and creamy with a hint of black truffle.", price: 15 },
  { id: 4, name: "Oysters Rockefeller", description: "Classic preparation with spinach and hollandaise.", price: 20 },
  { id: 5, name: "Beef Tartare", description: "Hand-cut beef with capers and quail egg.", price: 19 },
  { id: 6, name: "Crab Cakes", description: "With remoulade and microgreens.", price: 18 },
  { id: 7, name: "Escargot", description: "In garlic butter and parsley.", price: 16 },
  { id: 8, name: "Duck Liver Parfait", description: "With toasted brioche and apple chutney.", price: 21 },
  { id: 9, name: "Gazpacho", description: "Chilled tomato soup with a touch of basil.", price: 12 },
];

// Serve HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/menu", (req, res) => {
  res.sendFile(path.join(__dirname, "menu.html"));
});

app.get("/reservation", (req, res) => {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

app.get("/contact_us", (req, res) => {
  res.sendFile(path.join(__dirname, "contact_us.html"));
});

// Dummy API routes
app.get("/api/menu-items", (req, res) => {
  res.json(menuItems);
});

app.get("/api/menu-items/:id", (req, res) => {
  const item = menuItems.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

// Dummy reservation POST route
app.post("/api/reservation", (req, res) => {
  console.log("Reservation received:", req.body);
  res.json({ success: true, message: "Reservation received!", data: req.body });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
