# Marketplace - Frontend

This is the frontend of a mock e-shop application built using React, Redux, Zustand, and Material-UI (MUI). The application is fully responsive and provides functionalities such as user registration, login, product viewing, adding reviews, and managing a shopping cart.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Zustand**: A small, fast, and scalable bearbones state-management solution.
- **Redux**: For auth state management, along with redux-thunk and redux-persist, to ensure persistence and legible code.
- **Material-UI (MUI)**: A popular React UI framework.

## Features

- **Responsive Design**: Fully responsive UI for optimal viewing across different devices.
- **Product Categories**: Products categorized into clothing and electronics.
- **Product Details**: View detailed information about each product in a modal.
- **User Authentication**: Registration and login functionalities with JWT-based authentication.
- **Drawer Navigation**: Navigation drawer for easy access to different sections.
- **Reviews and Cart**: Logged-in users can add reviews and manage their shopping cart.
- **LocalStorage Integration**: Auth and cart data stored in localStorage.

Live demo of the application at [Marketplace](https://marketplace-omega-tawny.vercel.app)

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Raulanthropos/Marketplace.git
    cd Marketplace
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the development server:
    ```bash
    npm start
    # or
    yarn start
    ```

The application will be available at `http://localhost:3000`.


## Project Structure

- `src/components`: React components.
- `src/store`: Zustand state management setup.

## Usage

1. Register a new user or log in with existing credentials.
2. Browse products by category.
3. View product details and add reviews (if logged in).
4. Add products to the cart and manage the cart.

