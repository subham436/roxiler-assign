# MERN Stack Coding Challenge

## Project Overview

This project is a MERN (MongoDB, Express.js, React.js, Node.js) stack coding challenge. It includes both backend and frontend components that fetch and display product transaction data from a third-party API. Additionally, various APIs are created to perform statistical analysis and generate charts based on the transaction data.

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- Redux Toolkit (for state management)
- Tailwind CSS (for styling)
- Chart.js (for chart components)

## Getting Started

Follow these steps to clone and run the project on your local machine:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/subham436/roxiler-assign.git```

2. **Navigate to the Backend**

   ```bash
   cd your-repo/backend
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Create Environment File**

   Create a `.env.development` file in the `backend` directory and add the following:

   ```env
   NODE_ENV=development
   NODE_PORT=5000
   MONGODB_URI="Your_mongoDB_URI"
   ```

5. **Run the Backend**

   ```bash
   npm run dev
   ```

6. **Navigate to the Frontend**

   ```bash
   cd ../frontend
   ```

7. **Install Frontend Dependencies**

   ```bash
   npm install
   ```

8. **Run the Frontend**

   ```bash
   npm start
   ```

Visit [http://localhost:3000](http://localhost:3000) in your browser to see the MERN stack coding challenge application in action.

## Features

- **Transaction Table**: List of product transactions with search and pagination.
- **Statistics**: Display total sale amount, total sold items, and total not sold items for the selected month.
- **Bar Chart**: Visualize the price range and the number of items in that range for the selected month.
- **Pie Chart**: Show unique categories and the number of items from each category for the selected month.
- **Combined Data**: API that fetches and combines data from the above endpoints.

## Folder Structure

- **backend**: Node.js and Express.js server.
- **frontend**: React.js frontend application.
