import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Register from "./pages/Register/Register";
import Categories from "./pages/Categories/Categories";
import Cart from "./pages/Cart/Cart";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CategoryProducts from "./components/CategoryProducts/CategoryProducts";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import WishList from "./pages/WishList/WishList";
import WishListContextProvider from "./Context/WishListContext";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import { HelmetProvider } from "react-helmet-async";
import CheckOut from "./components/CheckOut/CheckOut";
import AllOrders from "./components/AllOrders/AllOrders";
import Brands from "./pages/Brands/Brands";
import Products from "./pages/Products/Products";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Notfound from "./pages/Notfound/Notfound";


let Query = new QueryClient();
let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            {" "}
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkOut",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },

      {
        path: "productDetails/:category/:id", //lw galy productDetails/ay7aga/ay7aga
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "CategoryProducts/:category",
        element: (
          <ProtectedRoute>
            <CategoryProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <QueryClientProvider client={Query}>
          <CartContextProvider>
            <WishListContextProvider>
              <HelmetProvider>
                <RouterProvider router={x}></RouterProvider>;
                <Toaster />
              </HelmetProvider>
            </WishListContextProvider>
          </CartContextProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
