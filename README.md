# 💰 Expense Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing personal expenses and income transactions with advanced analytics and filtering capabilities.

## 🚀 Features

### 📊 Transaction Management

- **Add Transactions**: Record income and expense transactions with detailed information
- **Edit/Update**: Modify existing transactions
- **Delete**: Remove unwanted transactions
- **Filter & Sort**: Advanced filtering by date range, transaction type, and category
- **Search**: Quick search functionality for transactions

### 📈 Analytics Dashboard

- **Visual Charts**: Interactive charts and graphs for expense analysis
- **Category-wise Breakdown**: Analyze spending patterns by categories
- **Income vs Expense**: Track your financial balance over time
- **Date Range Analysis**: View financial data for specific time periods

### 🔐 User Authentication

- **Secure Registration**: User signup with validation
- **Login System**: JWT-based authentication
- **Protected Routes**: Secure access to user-specific data
- **Session Management**: Automatic token handling

### 🎨 Modern UI/UX

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Ant Design Components**: Professional and clean interface
- **Tailwind CSS**: Modern styling and responsive layout
- **Interactive Elements**: Smooth user interactions and animations

## 🛠️ Technology Stack

### Frontend

- **React.js** - Component-based UI library
- **Redux** - State management
- **React Router DOM** - Client-side routing
- **Ant Design** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Moment.js** - Date manipulation library

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Parse HTTP request cookies

## 📁 Project Structure

```
Expense-Management/
├── package.json                 # Root package configuration
├── README.md                   # Project documentation
├── back/                       # Backend application
│   ├── index.js               # Main server file
│   ├── config/
│   │   └── mongodb.js         # Database configuration
│   ├── controllers/           # Request handlers
│   │   ├── transactionController.js
│   │   └── userController.js
│   ├── middlewares/           # Custom middleware
│   │   └── auth.js           # Authentication middleware
│   ├── models/               # Database models
│   │   ├── transactionModel.js
│   │   └── userModel.js
│   ├── routers/              # API routes
│   │   ├── transactionRoute.js
│   │   └── userRoute.js
│   └── utils/                # Utility functions
│       ├── checkLogin.js
│       ├── errorHandler.js
│       └── sendToken.js
└── front/                     # Frontend application
    ├── package.json          # Frontend dependencies
    ├── tailwind.config.js    # Tailwind configuration
    ├── public/               # Static files
    └── src/
        ├── App.js           # Main React component
        ├── index.js         # Entry point
        ├── components/      # Reusable components
        │   ├── analytics.js
        │   ├── header.js
        │   ├── home.js
        │   ├── protectRoute.js
        │   └── updateTrans.js
        ├── pages/           # Page components
        │   ├── login.js
        │   ├── not.js
        │   └── sign.js
        └── redux/           # State management
            ├── store.js
            ├── actions/
            ├── constants/
            └── reducers/
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/rohitp-18/expense_tracker.git
cd Expense-Management
```

2. **Install backend dependencies**

```bash
npm install
```

3. **Install frontend dependencies**

```bash
cd front
npm install
cd ..
```

4. **Environment Setup**
   Create a `.env` file in the `back` directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-management
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

5. **Start MongoDB**
   Make sure MongoDB is running on your system or configure MongoDB Atlas connection.

### 🏃‍♂️ Running the Application

#### Development Mode

1. **Start Backend Server**

```bash
npm run back
```

The backend server will start on `http://localhost:5000`

2. **Start Frontend Development Server**

```bash
npm run front
```

The frontend will start on `http://localhost:3000`

#### Production Mode

1. **Build Frontend**

```bash
cd front
npm run build
cd ..
```

2. **Start Production Server**

```bash
npm start
```

## 📱 Usage

1. **Register/Login**: Create a new account or login with existing credentials
2. **Add Transactions**: Click the "Add New Transaction" button to record income or expenses
3. **View Dashboard**: Monitor your financial overview on the main dashboard
4. **Analytics**: Switch to analytics view for detailed charts and insights
5. **Filter Data**: Use date pickers and filters to view specific transaction periods
6. **Manage Transactions**: Edit or delete transactions as needed

## 🔧 API Endpoints

### Authentication

- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/logout` - User logout
- `GET /api/v1/user/getuser` - Get current user

### Transactions

- `GET /api/v1/transaction/get-transaction` - Get all user transactions
- `POST /api/v1/transaction/add-transaction` - Add new transaction
- `PUT /api/v1/transaction/edit-transaction/:id` - Update transaction
- `DELETE /api/v1/transaction/delete-transaction/:id` - Delete transaction

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Rohit Patel**

- GitHub: [@rohitp-18](https://github.com/rohitp-18)

## 🙏 Acknowledgments

- [Ant Design](https://ant.design/) for the beautiful UI components
- [Chart.js](https://www.chartjs.org/) for analytics visualizations
- [MongoDB](https://www.mongodb.com/) for the database solution
- [Express.js](https://expressjs.com/) for the robust backend framework

---

⭐ If you found this project helpful, please give it a star on GitHub!
