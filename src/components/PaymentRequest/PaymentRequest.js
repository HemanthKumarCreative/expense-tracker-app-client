import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import BASE_URL from "../../assets/index";
import { useNavigate } from "react-router-dom";
const PaymentRequest = ({ userInfo }) => {
  const [isPremiumUser, setIsPremiumUser] = useState(userInfo?.isPremiumUser);
  const navigate = useNavigate();

  const handlePaymentRequest = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/order/collect-payment`
      );
      const order = await response.data.body;
      const options = {
        key: "rzp_test_KWXeQRtZiHyU85",
        amount: order.amount,
        currency: order.currency,
        name: "Test Company",
        description: "Payment for Services",
        order_id: order.order_id,
        handler: async function (order) {
          const orderData = {
            id: order.order_id,
            user_id: userInfo?.id,
            payment_id: order.order_id,
            status: "complete",
          };

          try {
            const response = await axios.put(
              `${BASE_URL}/api/v1/user/${userInfo?.id}`,
              { isPremiumUser: true }
            );
            console.log(response);
            const { body } = await response.data;
            setIsPremiumUser(true);
            Cookies.set("userInfo", JSON.stringify(body));
            navigate("/expense-list");
          } catch (error) {
            console.error("Error:", error);
          }

          alert("Payment successful");
        },
      };

      const rzp1 = new window.Razorpay(options);
      await rzp1.open();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      variant="contained"
      color="secondary"
      onClick={handlePaymentRequest}
      disabled={!isPremiumUser ? false : true}
    >
      {!isPremiumUser ? "Buy Premium" : "Pro User"}
    </div>
  );
};

export default PaymentRequest;
