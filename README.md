<div align="center">
  
  # 💡 IdeaVault

  **A platform to capture, explore, and manage startup concepts.**

  [![Live Site](https://img.shields.io/badge/Live_Site-View_Now-blue?style=for-the-badge&logo=vercel)](https://ideavault-client-xi.vercel.app)

</div>

---

## 📌 Overview

IdeaVault is a web application where users can log their startup ideas, browse concepts shared by others, and engage through comments. It provides a secure environment to document and organize ideas. 

🌐 **Live Demo:** [https://ideavault-client-xi.vercel.app](https://ideavault-client-xi.vercel.app)

---

## ✨ Project Features

| Feature | Description |
| :--- | :--- |
| 🔐 **Authentication** | Email & Password login, registration, and session management using `better-auth`. |
| 👤 **User Profiles** | Update display names that automatically sync across past ideas and comments. |
| 🧠 **Idea Management** | Submit, view, edit, and delete startup ideas with titles, descriptions, budgets, categories, and images. |
| 💬 **Community Engagement** | Interactive comment section to discuss ideas and a "My Interactions" dashboard to track personal comments. |
| 🎨 **Premium UI/UX** | Responsive design with full dark/light mode support, built with Tailwind CSS and HeroUI. |

---

## 🛠️ Detailed Technology Stack

### Frontend & Core
- **Next.js** (App Router)
- **React** 
- **JavaScript** (ES6+)

### Styling & UI
- **Tailwind CSS** (Utility-first styling framework)
- **HeroUI** (Accessible UI components)
- **Lucide React** (Beautiful iconography)
- **React Hot Toast** (In-app notifications)
- **Next Themes** (Dark/Light mode toggling)

### Authentication
- **Better-Auth** (Session tracking, JWTs, and secure user flows)

### Deployment
- **Vercel** (Edge network hosting)

---

## ⚙️ Local Setup Instructions

To run IdeaVault locally, follow these direct steps:

1. **Clone the repository** to your local machine.
2. **Install dependencies** by running `npm install` in your terminal.
3. **Configure environment variables** by creating a `.env` file containing `PUBLIC_ALL_API`, `NEXT_PUBLIC_ALL_API`, and `NEXT_PUBLIC_BETTER_AUTH_URL` pointing to your local server instances.
4. **Start the application** by running `npm run dev`.
5. **View the site** by opening `http://localhost:3000` in your web browser.
