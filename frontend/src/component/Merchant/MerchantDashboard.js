import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMerchantProduct } from "../../actions/productAction.js";
import { getAllOrders } from "../../actions/orderAction.js";
import MetaData from "../layout/MetaData.js";

const MerchantDashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);

  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getMerchantProduct());
    dispatch(getAllOrders());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Merchant Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ${totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/merchant/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/merchant/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
