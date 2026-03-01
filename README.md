# RaiseRealm - Crowdfunding Platform

<p align="center">
  <img src="/public/logo.png" alt="RaiseRealm Logo" width="120" />
</p>

<p align="center">
  <strong>Fuel Vision. Fund Future.</strong>
</p>

<p align="center">
  A milestone-driven crowdfunding platform built with React, Tailwind CSS, and ShadCN UI
</p>

---

## 📋 Project Description

RaiseRealm is a modern crowdfunding platform that connects creators with backers through a unique milestone-based funding system. Unlike traditional crowdfunding platforms, RaiseRealm ensures accountability and transparency by releasing funds in stages as project creators achieve their predefined milestones.

Whether you're launching a tech product, building a social initiative, developing a creative project, or shaping the next big startup, RaiseRealm provides the framework to bring your vision to life.

---

## ✨ Features

### Minimum Expected Features

- ✅ **User Authentication** - Secure registration and login with email/password and Google OAuth integration
- ✅ **Project Creation Tool** - Comprehensive form with title, description, funding goals, rewards, timeline, and milestones
- ✅ **Project Discovery & Search** - Browse projects with search, category filtering, and sorting options
- ✅ **Funding Mechanism** - Secure payment processing via Stripe integration
- ✅ **Progress Tracking** - Real-time progress bars showing funding status, backer count, and time remaining
- ✅ **Backer Rewards System** - Multiple reward tiers with minimum amounts and descriptions
- ✅ **Community Feedback** - Comment section for each project to foster engagement
- ✅ **Social Media Sharing** - One-click sharing to social platforms

### Unique Features

- ✅ **Milestone-Based Funding Releases** - Funds released in stages based on achieving specific goals
- ✅ **Impact Reporting Dashboard** - Creators can report on project impact with metrics and updates

### Challenging Features

- ✅ **AI-Powered Project Recommendations** - Personalized suggestions based on user behavior

### Additional Features

- ✅ **Analytics Dashboard for Creators** - Track funding progress, backer demographics, and engagement
- ✅ **Success Stories Section** - Testimonials from successful creators and backers
- ✅ **Responsive Design** - Fully optimized for all devices
- ✅ **Dark Mode** - Toggle between light and dark themes

---

## 🛠️ Tech Stack Used

| Category | Technology |
|----------|------------|
| **Framework** | React 18+ with Vite |
| **Styling** | Tailwind CSS |
| **UI Components** | ShadCN UI (Radix UI primitives) |
| **Routing** | React Router DOM |
| **HTTP Client** | Axios |
| **Icons** | Lucide React |
| **Payments** | Stripe |
| **State Management** | React Context API |
| **Forms** | React Hook Form |

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── chatbot/          # AI Chatbot component
│   │   ├── dashboard/        # Dashboard-specific components
│   │   ├── layout/           # Header, Footer
│   │   ├── payment/         # Payment-related components
│   │   ├── project/         # Project card components
│   │   └── ui/              # ShadCN UI components
│   ├── context/
│   │   ├── AuthContext.jsx  # Authentication state management
│   │   └── ThemeContext.jsx # Dark/Light mode management
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Projects.jsx
│   │   ├── CreateProject.jsx
│   │   ├── ProjectDetail.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ImpactDashboard.jsx
│   │   ├── HowItWorks.jsx
│   │   └── Trust.jsx
│   ├── services/
│   │   ├── api.js           # Axios instance with interceptors
│   │   ├── authService.js   # Authentication API calls
│   │   ├── projectService.js # Project CRUD operations
│   │   ├── contributionService.js
│   │   ├── commentService.js
│   │   ├── impactService.js
│   │   └── aiSuggestionService.js
│   ├── utils/
│   │   └── helpers.js       # Utility functions
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🚀 Installation Steps

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Step 1: Clone the Repository

```
bash
git clone <repository-url>
cd raiserealm-frontend
```

### Step 2: Install Dependencies

```
bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```
env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Google OAuth (Optional)
VITE_GOOGLE_CLIENT_ID=your-google-client-id

# Stripe Public Key (Optional)
VITE_STRIPE_PUBLIC_KEY=pk_test_your-stripe-key
```

### Step 4: Start Development Server

```
bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Step 5: Build for Production

```
bash
npm run build
```

The production build will be generated in the `dist` folder.

---

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure the environment variables
4. Deploy with a single click

**Live Deployment URL:** [Add your Vercel deployment URL here]

---

## 🔗 Backend API

The frontend is designed to work with a RESTful backend API.

**API Base URL:** `http://localhost:5000/api`

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | User login |
| GET | `/projects` | Get all projects |
| POST | `/projects` | Create new project |
| GET | `/projects/:id` | Get project details |
| POST | `/contributions` | Make a contribution |
| GET | `/comments/:projectId` | Get project comments |
| POST | `/comments` | Add comment |

---

## 🔑 Login Credentials

### Test Account

For testing purposes, you can create a new account using the registration form, or use the following credentials if pre-configured:

| Field | Value |
|-------|-------|
| Email | `demo@raiserealm.com` |
| Password | `Demo@123` |

### Google OAuth

If Google OAuth is configured, you can also sign in with your Google account.

---

## 📸 Screenshots

### Home Page
![Home Page](/public/screenshots/home.png)

### Projects Page
![Projects Page](/public/screenshots/projects.png)

### Project Detail
![Project Detail](/public/screenshots/project-detail.png)

### Dashboard
![Dashboard](/public/screenshots/dashboard.png)

### Create Project
![Create Project](/public/screenshots/create-project.png)

### Impact Dashboard
![Impact Dashboard](/public/screenshots/impact-dashboard.png)

---

## 🎥 Video Walkthrough

Watch a complete walkthrough of the RaiseRealm platform:

**[Video Walkthrough Link](#)** - Coming soon!

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vercel](https://vercel.com/)

---

<p align="center">
  Made with ❤️ by RaiseRealm Team
</p>
