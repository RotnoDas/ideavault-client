# IdeaVault

🚀 **Live Site URL:** [https://ideavault-client-xi.vercel.app](https://ideavault-client-xi.vercel.app)

IdeaVault is a dynamic platform designed to help users capture, organize, and manage their startup concepts and innovative ideas. It serves as a personal and public repository where brilliant thoughts can be polished, categorized, and discussed.

## 🌟 Key Features
- **Secure Idea Management:** Safely add, edit, and delete your personal startup ideas and concepts in your own secure vault.
- **Robust Authentication:** Features seamless user authentication, registration, and profile management utilizing `better-auth`.
- **Dynamic Interaction Tracking:** Keep track of your engagement through the "My Interactions" dashboard, viewing ideas you have commented on.
- **Interactive Community Comments:** Browse ideas from the community and engage in discussions using a fully-featured, real-time comment section.
- **Dark Mode & Premium UI:** Enjoy a beautiful, modern interface powered by Next.js and HeroUI, featuring full light/dark mode support and smooth micro-animations.

## 🛠️ Technology Stack
- **Frontend Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** HeroUI & Lucide React Icons
- **Authentication:** Better-Auth
- **State & Routing:** Next Navigation
- **Deployment:** Vercel

## ⚙️ Local Development Setup

To run the IdeaVault client locally:

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root of the project and provide the following variables:
   ```env
   # Your backend API URL
   PUBLIC_ALL_API=http://localhost:8000
   NEXT_PUBLIC_ALL_API=http://localhost:8000
   
   # Authentication settings
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure
- `src/app`: Contains the main Next.js App Router pages (Home, Ideas, Add Idea, Login, Register, Profile).
- `src/components`: Reusable UI components including the Navigation Bar, Idea Cards, and Interactive Comment Sections.
- `src/lib`: Core utility files such as authentication helpers and data fetching mechanisms.
