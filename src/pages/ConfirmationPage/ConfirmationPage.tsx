import React, { useState, useEffect } from "react";
import { OrderDataType } from "../../types";
import styles from "./ConfirmationPage.module.css";

const ConfirmationPage: React.FC = () => {
  const [orderData, setOrderData] = useState<OrderDataType | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("orderData");
    if (data) {
      setOrderData(JSON.parse(data));
      // Clear the localStorage after retrieving the data
      localStorage.removeItem("selectedItem");
      localStorage.removeItem("orderData");
    }
  }, []);

  if (!orderData)
    return <div className={styles.error}>No order data found</div>;

  return (
    <div className={styles.confirmationPage}>
      <h1>Order Confirmation</h1>
      <div className={styles.orderSummary}>
        <h2>Order Number: {orderData.orderNumber}</h2>
        <div className={styles.itemDetails}>
          <h3>Item Details:</h3>
          <p>
            <strong>Name:</strong> {orderData.item.name}
          </p>
          <p>
            <strong>Description:</strong> {orderData.item.description}
          </p>
          <p>
            <strong>Price:</strong> ${orderData.item.actualPrice.toFixed(2)}
          </p>
          <p>
            <strong>Discount:</strong> {orderData.item.discount}% off
          </p>
        </div>
        <div className={styles.chargeDetails}>
          <h3>Charge Details:</h3>
          <p>
            <strong>Amount Charged:</strong> $
            {orderData.item.actualPrice.toFixed(2)}
          </p>
          <p>
            <strong>Payment Method:</strong> Credit Card (ending in{" "}
            {orderData.creditCard.slice(-4)})
          </p>
        </div>
        <div className={styles.billingInfo}>
          <h3>Billing Information:</h3>
          <p>
            <strong>Name:</strong> {orderData.fullName}
          </p>
          <p>
            <strong>Address:</strong> {orderData.address}
          </p>
          <p>
            <strong>Email:</strong> {orderData.email}
          </p>
          <p>
            <strong>Phone:</strong> {orderData.phone}
          </p>
        </div>
      </div>
      <div className={styles.thankYou}>
        <p>
          Thank you for your order! A confirmation email has been sent to{" "}
          {orderData.email}.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
