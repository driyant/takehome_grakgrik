# GrakGrik - Mini Social Media

This project is a mini social media application built as a take-home assessment. The Minimum Viable Product (MVP) allows users log in with validation, read posts, and view their profile information.

## ✨ Features

- **User Authentication**: Secure login and registration functionality.
- **Profile Page**: A dedicated page for users to view their profile details.
- **Conditional UI**: The application interface, like the top navigation bar, dynamically changes based on the user's authentication status.
- **Input Validation**: Forms include validation to ensure data integrity.
- **User-Friendly Modals**: Interactive modals guide unauthenticated users to log in before accessing protected routes like the profile page.

## 🛠️ Tech Stack

- **Frontend Framework**: React (with Vite)
- **UI Component Library**: Chakra UI
- **Client-Side Routing**: React Router DOM
- **Global State Management**: Zustand
- **HTTP Client**: Axios

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (v18.x or later is recommended)
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone <your-repository-url>
    ```

2.  **Navigate to the project directory**

    ```bash
    cd grakgrik
    ```

3.  **Install dependencies**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

### Running the Application

To start the development server, run the following command:

```bash
npm run dev
```

The application will be running on `http://localhost:5173` (or the next available port).

## 📁 Project Structure

The project is organized with a clear and scalable structure:

```
src
├── assets
├── components    # Reusable UI components (e.g., TopBar.jsx)
├── hooks         # Custom React hooks (e.g., useShowModals.js)
├── pages         # Page components for routes (e.g., Login, Profile)
├── store         # Zustand store for global state
├── App.jsx       # Main application component
└── main.jsx      # Application entry point
```
