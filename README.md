# AcxiomCRM-MERN - Customer Relationship Management System

A full-stack MERN application for managing customers, leads, and opportunities with role-based authentication.

## 🚀 GitHub
https://github.com/ssamantaray666-cpu/AcxiomCRM-MERN

## ✨ Features
- JWT Authentication & Role-Based Access
- Customer Management (CRUD)
- Lead Tracking & Follow-ups
- Opportunity Pipeline
- Audit Logs & Dashboard

## 🛠️ Tech Stack
- Frontend: React.js, Axios, React Router
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Auth: JWT, bcrypt

## 📁 Structure
client/ - React Frontend
server/ - Node Backend
  models/ - Customer, Lead, User, Opportunity
  routes/ - auth, Customer, leads
  middleware/ - Auth

## ⚙️ Installation
git clone https://github.com/ssamantaray666-cpu/AcxiomCRM-MERN.git
cd server && npm install
cd ../client && npm install

Create .env in server:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000

Run:
npm start (server)
npm start (client)

Developed by Swagatika - MERN Project 2026