# **Food Delivery Platform**

A **full-stack MERN application** connecting customers, restaurants, and delivery services. The platform provides a seamless experience for ordering food online, managing restaurants, and tracking orders in real time.

This repository contains:

* **fd-frontend** – React.js frontend
* **fd-backend** – Node.js + Express backend
* **Shared database** – MongoDB

---

## **Features**

* User authentication (Sign up / Sign in)
* Browse  menus
* Place orders and track status
* Admin panel to manage users, restaurants, and orders
* Responsive design for web and mobile

---

## **📁 Project Structure**

```
food-delivery/
│
├─ fd-frontend/        # React.js frontend
│   ├─ src/
│   ├─ public/
│   └─ package.json
│
├─ fd-backend/         # Node.js + Express backend
|   ├─ config/
│   ├─ controllers/
|   ├─ middleware/
│   ├─ models/
│   ├─ routes/
│   ├─ utils/
|   └─ .env
|   └─ app.js
│   └─ package.json
|   └─ server.js
│
└─ README.md
```

---

## **🛠️ Setup & Installation**

Since this is a **MERN project**, you can install dependencies and run both frontend and backend separately, but here’s a simple guide to get started:

### **1. Clone the repository**

```bash
git clone https://github.com/your-username/food-delivery.git
cd food-delivery
```

### **2. Install dependencies**

You can install for **frontend and backend** in their respective folders:

```bash
# Backend
cd fd-backend
npm install

# Frontend
cd ../fd-frontend
npm install
```

---

### **3. Environment Variables**

Create `.env` files in both **frontend** and **backend** if needed. For example:

**Backend (.env)**

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Frontend (.env)**

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

### **4. Run the project**

```bash
# Backend
cd fd-backend
npm run dev  # or node server.js

# Frontend
cd ../fd-frontend
npm start
```

The app will be accessible at `http://localhost:3000`.

---

## **💾 Database**

* MongoDB (local or Atlas)
* Collections: Users, Restaurants, Orders, Menu Items
* Make sure your **MongoDB connection string** is updated in the backend `.env`

---

## **🛠️ Tech Stack**

* **Frontend:** React.js, HTML, CSS, Bootstrap
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JWT
* **Other Tools:** Git, Postman, Axios

---

## **📌 Notes**

* Ensure **Node.js (v14+)** and **npm** are installed.
* MongoDB should be running before starting the backend.
* You can deploy frontend and backend separately if desired.

---




