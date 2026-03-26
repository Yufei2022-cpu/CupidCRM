# 💖 MatchBoard CRM

**MatchBoard** is a premium, beautifully designed Relationship Management CRM built to help you track, organize, and analyze your dating and networking pipeline with zero friction.

Designed with privacy and elegance in mind, MatchBoard runs entirely offline in your browser. All of your data is securely stored in LocalStorage, ensuring absolute privacy while delivering a native-feeling, lightning-fast user experience.

---

## ✨ Key Features

### 📊 Advanced Pipeline Overview
- **Drag-and-Drop Kanban Board**: Visually move your matches through different stages (New, Chatting, Met Once, On Hold, Ended) using fluid drag-and-drop functionality powered by `@dnd-kit`.
- **Pipeline Analytics**: Instant insights into your pipeline health with dynamic stat counters.

### 👥 Comprehensive Tracking
- **Interaction Timeline**: Log calls, chats, and dates. Automatically calculates "Last Active" times for every candidate to help you prioritize who you haven't spoken to recently.
- **Detailed Profiles**: Save demographic info (Age, City, Job), attach custom notes, and monitor your relationship history chronologically.

### 🏷️ Custom Tag Management
- **Colorful Organization**: Create your own custom tags from the Settings menu. Pick from a variety of distinct accent colors.
- **Global Updates**: Deleting or editing a tag cascades instantly across all candidate profiles.

### 🎛️ Sort & Filter Dashboard
- **Advanced Sorting**: Sort your entire list by Recently Active, Date Added, or Age.
- **Real-Time Search**: Instantly filter by Name, City, Job, or Status.

### 🔔 Premium UI/UX
- **Elegant Animations**: Features subtle micro-animations, glassmorphism overlays, and robust empty states.
- **Global Toast Notifications**: Fluid slide-in notifications confirm all your actions securely without interrupting your flow.

### 💾 Private Data & Exports
- **100% Offline Database**: No servers. No tracking. Your data never leaves your browser space.
- **Export to PDF**: Generate a clean, styled PDF report of your entire database on the fly using `jsPDF`.
- **JSON Backups**: Download your entire state database with one click for easy backup and restoration.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS with custom properties & utility-first design patterns
- **State Management**: React Context + LocalStorage Hooks
- **Icons**: [Lucide React](https://lucide.dev/)
- **Drag & Drop**: [@dnd-kit/core](https://dndkit.com/)
- **Data Export**: `jspdf` & `jspdf-autotable`

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd matchboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173` to start managing your matches!

---

## 🎨 Theme & Design
MatchBoard uses a calming, sophisticated "Sage Green" primary theme (`#7ab095`) supported by soft layout borders and deep blur filters. Our goal was to create an interface that feels significantly more premium and professional than standard web applications.

---

### *Your relationships matter. Manage them beautifully.*
