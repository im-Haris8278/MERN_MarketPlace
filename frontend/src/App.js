import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Routes/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatedPassword from "./component/User/UpdatedPassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import AdminDashboard from "./component/Admin/Dashboard";
import MerchantDashboard from "./component/Merchant/Dashboard";
import ProductList from "./component/Merchant/ProductList";
import NewProduct from "./component/Merchant/NewProduct";
import UpdateProduct from "./component/Merchant/UpdateProduct";
import OrderList from "./component/Merchant/OrderList";
import ProcessOrder from "./component/Merchant/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Merchant/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`/api/v1/stripeapikey`);

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Fragment>
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/product/:id" element={<ProductDetails />} />
              <Route exact path="/products" element={<Products />} />
              <Route path="/products/:keyword" element={<Products />} />
              <Route exact path="/search" element={<Search />} />
              <Route exact path="/login" element={<LoginSignUp />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
              <Route
                exact
                path="/password/forgot"
                element={<ForgotPassword />}
              />
              <Route
                exact
                path="/password/reset/:token"
                element={<ResetPassword />}
              />
              <Route exact path="/cart" element={<Cart />} />

              {/* Protected Routes */}

              <Route element={<ProtectedRoute />}>
                <Route path="/account" element={<Profile />} />
                <Route path="/me/update" element={<UpdateProfile />} />
                <Route path="/password/update" element={<UpdatedPassword />} />
                <Route exact path="/login/shipping" element={<Shipping />} />
                <Route exact path="/order/confirm" element={<ConfirmOrder />} />
                {stripeApiKey && (
                  <Route exact path="/process/payment" element={<Payment />} />
                )}
                <Route exact path="/success" element={<OrderSuccess />} />
                <Route exact path="/orders" element={<MyOrders />} />
                <Route exact path="/order/:id" element={<OrderDetails />} />
                <Route
                  exact
                  path="/admin/dashboard"
                  element={<AdminDashboard />}
                />
                <Route
                  exact
                  path="/merchant/dashboard"
                  element={<MerchantDashboard />}
                />
                <Route
                  exact
                  path="/merchant/products"
                  element={<ProductList />}
                />
                <Route
                  exact
                  path="/merchant/product"
                  element={<NewProduct />}
                />
                <Route
                  exact
                  path="/merchant/product/:id"
                  element={<UpdateProduct />}
                />
                <Route exact path="/merchant/orders" element={<OrderList />} />
                <Route
                  exact
                  path="/merchant/order/:id"
                  element={<ProcessOrder />}
                />
                <Route exact path="/admin/users" element={<UsersList />} />
                <Route exact path="/admin/user/:id" element={<UpdateUser />} />
                <Route
                  exact
                  path="/merchant/reviews"
                  element={<ProductReviews />}
                />
              </Route>
            </Routes>
          </Elements>
        </Fragment>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
