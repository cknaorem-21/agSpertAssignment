import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SaleOrders from "./pages/SaleOrders";
import { useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      // Protected Routes
      <Route element={<ProtectedRoute />}>
        <Route path="/saleorders" element={<SaleOrders />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
  )
);

function App() {
  useEffect(() => {
    async function storeDBDataFromJsonToLocalStorage() {
      // Check if the initial data load has already occurred
      const isDataLoaded = localStorage.getItem('isDataLoaded');

      if (!isDataLoaded) {
        // Fetch data if not already present
        const [saleOrders, customers, products, adminUsers] = await Promise.all([
          axios.get('/saleorders.json'),
          axios.get('/customers.json'),
          axios.get('/products.json'),
          axios.get('/adminusers.json'),
        ]);

        // Save fetched data to localStorage
        localStorage.setItem('saleOrders', JSON.stringify(saleOrders.data));
        localStorage.setItem('customers', JSON.stringify(customers.data));
        localStorage.setItem('products', JSON.stringify(products.data));
        localStorage.setItem('adminUsers', JSON.stringify(adminUsers.data));

        // Set a flag indicating that the initial data load has occurred
        localStorage.setItem('isDataLoaded', 'true');
      }
    }

    // Run the function to store DB data from JSON to localStorage if not already done
    storeDBDataFromJsonToLocalStorage();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
