# 🚀 Business Intelligence Analytics Dashboard

> A professional, modern, and fully responsive Business Intelligence dashboard built for **TEYZIX CORE Internship Task (FEWD-1)**. This dashboard helps company management monitor revenue, sales performance, customer growth, and operational KPIs in real-time.

![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-State-orange?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite)

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Available Scripts](#-available-scripts)
- [API Endpoints](#-api-endpoints)
- [Bonus Features](#-bonus-features)
- [Task Requirements Checklist](#-task-requirements-checklist)
- [Author](#-author)

---

## 🎯 About the Project

This is a **Business Intelligence Analytics Dashboard** designed to simulate enterprise-grade products like **Power BI**, **Tableau**, **Zoho Analytics**, and **Google Looker Studio**.

The dashboard provides:
- 📊 Real-time KPI monitoring
- 📈 Interactive data visualizations
- 👥 Complete customer management (CRUD)
- 🛒 Order tracking & management
- 📑 Report generation with CSV export
- 🌓 Beautiful Dark & Light themes
- 📱 Fully responsive design (Desktop, Tablet, Mobile)

---

## ✨ Features

### 🎨 **Premium UI/UX**
- Modern, clean design with gradient accents
- Smooth animations and transitions
- Glassmorphism effects
- Custom scrollbars
- Inter font for professional typography

### 📊 **Dashboard Overview**
- 5 KPI Cards (Revenue, Customers, Orders, Growth, Conversion)
- Real-time data with hover effects
- Trending indicators (Up/Down badges)

### 📈 **4 Interactive Charts**
- **Revenue Trend** - Area chart with gradient fill
- **Sales Comparison** - Bar chart (This Year vs Last Year)
- **Customer Growth** - Line chart
- **Category Distribution** - Donut chart with legends

### 👥 **Customer Management (Full CRUD)**
- ✅ Add new customers via modal form
- ✅ Edit existing customers
- ✅ Delete with confirmation modal
- ✅ Search by name (real-time)
- ✅ Filter by status & region
- ✅ Sort by any column (ascending/descending)
- ✅ Pagination (5 rows per page)
- ✅ Beautiful avatars with initials
- ✅ Status badges (Active/Inactive)

### 🛒 **Orders Page**
- Order statistics cards
- Status badges (Delivered, Processing, Shipped, Pending, Cancelled)
- Search and filter functionality
- Customer & product details

### 📑 **Reports Page**
- Export customers as CSV
- Export orders as CSV
- Summary statistics
- Quick download buttons

### 🔍 **Working Search System**
- Real-time customer search in header
- Beautiful dropdown with results
- Click to navigate to customer page
- Mobile-optimized search

### 🔔 **Real-time Notifications**
- Live notification system
- Auto-triggered on Add/Edit/Delete/Export actions
- Unread count badge
- Mark as read / Mark all read functionality
- Persistent across page navigation (localStorage)
- Color-coded by notification type

### 🌓 **Theme System**
- Light & Dark modes
- Smooth color transitions
- Persists across page refreshes
- localStorage based

### ⚙️ **Settings Page**
- Theme switcher (Light/Dark)
- Account information
- Profile, Notifications, Language, Privacy settings

### ❓ **Help & Support Page**
- Contact options (Email, Live Chat, Documentation)
- FAQ section with common questions

### 🚪 **Logout System**
- Beautiful confirmation modal
- Toast notification on logout

### 📱 **Fully Responsive Design**
- **Desktop**: Full sidebar with all features
- **Tablet**: Optimized layout
- **Mobile**: Hamburger menu with slide-in sidebar
- Touch-friendly buttons
- Mobile-optimized search bar

---

## 🛠️ Tech Stack

### **Frontend**
- ⚛️ **React 18** - UI library
- 📘 **TypeScript** - Type safety
- ⚡ **Vite** - Fast build tool
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework
- 🎯 **Zustand** - Lightweight state management
- 🌐 **React Router DOM** - Client-side routing
- 📊 **Recharts** - Chart library
- 🌐 **Axios** - HTTP client
- 🎨 **Lucide React** - Icon library
- 🔔 **React Hot Toast** - Toast notifications

### **Backend (Mock API)**
- 📦 **JSON Server** - Fake REST API
- Data stored in `db.json`

### **Development Tools**
- 🔧 **ESLint** - Code linting
- 📦 **npm** - Package manager
- 🔀 **Git & GitHub** - Version control

---

## 📁 Project Structure

task1/
│
├── backend/
│ ├── db.json # Mock database
│ ├── package.json
│ └── node_modules/
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ │ ├── layout/
│ │ │ │ ├── Sidebar.tsx
│ │ │ │ ├── Header.tsx
│ │ │ │ └── Layout.tsx
│ │ │ ├── ui/
│ │ │ │ ├── Card.tsx
│ │ │ │ ├── Button.tsx
│ │ │ │ ├── Loader.tsx
│ │ │ │ ├── CustomerModal.tsx
│ │ │ │ └── ConfirmModal.tsx
│ │ │ ├── kpi/
│ │ │ │ └── KpiCard.tsx
│ │ │ ├── charts/
│ │ │ │ ├── RevenueChart.tsx
│ │ │ │ ├── SalesChart.tsx
│ │ │ │ ├── CustomerChart.tsx
│ │ │ │ └── CategoryChart.tsx
│ │ │ └── table/
│ │ │ └── DataTable.tsx
│ │ ├── pages/
│ │ │ ├── Dashboard.tsx
│ │ │ ├── Analytics.tsx
│ │ │ ├── Customers.tsx
│ │ │ ├── Orders.tsx
│ │ │ ├── Reports.tsx
│ │ │ ├── Settings.tsx
│ │ │ └── Help.tsx
│ │ ├── store/
│ │ │ ├── themeStore.ts
│ │ │ └── dataStore.ts
│ │ ├── services/
│ │ │ └── api.ts
│ │ ├── types/
│ │ │ └── index.ts
│ │ ├── utils/
│ │ │ └── helper.ts
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ └── index.css
│ ├── package.json
│ └── vite.config.ts
│
├── .gitignore
└── README.md


---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn
- Git

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/abdulrafay-0814/business-intelligence-dashboard.git
cd business-intelligence-dashboard

Step 2: Setup Backend
Open a terminal:

Bash

cd backend
npm install
npm start
✅ Backend will run on: http://localhost:3001

Step 3: Setup Frontend
Open a new terminal:

Bash

cd frontend
npm install
npm run dev
✅ Frontend will run on: http://localhost:5173

Step 4: Open in Browser
Visit: http://localhost:5173

🎉 Dashboard is now running!

📜 Available Scripts
Backend (/backend)
Bash

npm start          # Start JSON Server on port 3001
Frontend (/frontend)
Bash

npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
🌐 API Endpoints
The mock API provides the following REST endpoints:

Method	Endpoint	Description
GET	/kpis	Get KPI data
GET	/revenueTrend	Get revenue trend data
GET	/salesComparison	Get sales comparison data
GET	/customerGrowth	Get customer growth data
GET	/categoryDistribution	Get category distribution
GET	/customers	Get all customers
POST	/customers	Add new customer
PUT	/customers/:id	Update customer
DELETE	/customers/:id	Delete customer
GET	/orders	Get all orders
GET	/notifications	Get notifications
🎁 Bonus Features
✨ Implemented bonus challenges beyond requirements:

✅ CSV Export - Download customers/orders as CSV files
✅ Real-time Notifications - Auto-triggered by user actions
✅ Full CRUD Operations - Add, Edit, Delete customers
✅ Persistent State - Theme & notifications saved in localStorage
✅ Mark All Read - Bulk notification management
✅ Date in filename - Auto-generated CSV filenames with date
✅ Custom Toast Notifications - Beautiful action feedback
✅ Mobile Search - Dedicated mobile search experience
✅ Click Outside to Close - Dropdowns auto-close on outside click
✅ Logout Confirmation - Prevents accidental logout
✅ Empty States - Beautiful "no data" messages with icons
✅ Loading States - Spinner & error handling
✅ Time-based Greeting - Good Morning/Afternoon/Evening
✅ Live Clock - Real-time date in header
✅ Multiple Pages - 7 different pages with routing
🎨 Color Palette
text

Primary:   Indigo (#6366f1) → Purple (#9333ea)
Success:   Emerald (#10b981) → Teal (#0d9488)
Warning:   Amber (#f59e0b) → Orange (#ea580c)
Danger:    Red (#ef4444) → Rose (#e11d48)
Info:      Blue (#3b82f6) → Cyan (#06b6d4)
Pink:      Pink (#ec4899) → Rose (#f43f5e)
✅ Task Requirements Checklist
Dashboard Layout
✅ Sidebar Navigation
✅ Header Section
✅ KPI Cards
✅ Analytics Area
✅ Reports Section
KPI Overview
✅ Total Revenue
✅ Total Customers
✅ Total Orders
✅ Monthly Growth
✅ Conversion Rate
Interactive Charts
✅ Revenue Trend Chart (Area Chart)
✅ Sales Comparison Chart (Bar Chart)
✅ Customer Growth Chart (Line Chart)
✅ Category Distribution Chart (Donut Chart)
✅ Used Recharts library
Data Table
✅ Search functionality
✅ Sorting (all columns)
✅ Pagination (5 rows per page)
✅ Filtering (Status, Region)
✅ Customer Name, Revenue, Orders, Status, Region fields
Theme Management
✅ Light Mode
✅ Dark Mode
✅ Theme Persistence (localStorage)
State Management
✅ Used Zustand for state management
API Integration
✅ JSON Server (Mock API)
✅ Loading States
✅ Error States
✅ Empty States
Responsive Design
✅ Desktop view
✅ Tablet view
✅ Mobile view (Hamburger menu)
Technical Requirements
✅ Component-Based Architecture
✅ Reusable Components
✅ TypeScript Interfaces
✅ Proper Folder Structure
✅ Clean UI
👨‍💻 Author
Abdul Rafay

🎓 TEYZIX CORE Intern (June Batch)
🌐 GitHub: @abdulrafay-0814
📂 Repository: business-intelligence-dashboard
📄 License
This project is created for TEYZIX CORE Internship Task (FEWD-1).

🙏 Acknowledgments
TEYZIX CORE for the amazing internship opportunity
React Team for the awesome library
Tailwind CSS for the beautiful utility classes
Recharts for stunning chart components
Lucide for clean, modern icons
Zustand for simple state management
<div align="center">
⭐ If you like this project, please give it a star on GitHub!
Made with ❤️ by Abdul Rafay

Task ID: FEWD-1 | Domain: Frontend Web Development

</div> ```