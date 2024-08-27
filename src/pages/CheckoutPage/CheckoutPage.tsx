import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreItemType, OrderDataType } from "../../types";
import styles from "./CheckoutPage.module.css";

const CheckoutPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<StoreItemType | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const item = localStorage.getItem("selectedItem");
    if (item) {
      setSelectedItem(JSON.parse(item));
    } else {
      navigate("/"); // Redirect to store page if no item is selected
    }
  }, [navigate]);

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};

    const fullName = formData.get("full-name") as string;
    if (!/^[A-Za-z ]+$/.test(fullName)) {
      newErrors["full-name"] =
        "Full name should only contain letters and spaces";
    }

    const email = formData.get("email") as string;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phone = formData.get("phone") as string;
    if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
      newErrors.phone = "Phone number should be in the format xxx-xxx-xxxx";
    }

    const creditCard = formData.get("credit-card") as string;
    if (!/^\d{19}$/.test(creditCard)) {
      newErrors["credit-card"] = "Credit card should be 19 digits long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (validateForm(formData)) {
      const orderData: OrderDataType = {
        item: selectedItem!,
        fullName: formData.get("full-name") as string,
        address: formData.get("address") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        creditCard: formData.get("credit-card") as string,
        orderNumber: Math.floor(Math.random() * 1000000),
      };
      localStorage.setItem("orderData", JSON.stringify(orderData));
      navigate("/confirmation");
    }
  };

  if (!selectedItem) return <div>Loading...</div>;

  return (
    <div className={styles.checkoutPage}>
      <h1>Checkout</h1>
      <div className={styles.itemSummary}>
        <h2>Selected Item: {selectedItem.name}</h2>
        <p>Description: {selectedItem.description}</p>
        <p>Price: ${selectedItem.actualPrice.toFixed(2)}</p>
        <p>Discount: {selectedItem.discount}% off</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="full-name">Full Name:</label>
          <input
            id="full-name"
            type="text"
            name="full-name"
            placeholder="Full Name"
            required
            className={styles.input}
          />
          {errors["full-name"] && (
            <span className={styles.error}>{errors["full-name"]}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            type="text"
            name="address"
            placeholder="Address"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required
            className={styles.input}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Phone (xxx-xxx-xxxx)"
            required
            className={styles.input}
          />
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="credit-card">Credit Card:</label>
          <input
            id="credit-card"
            type="text"
            name="credit-card"
            placeholder="Credit Card (19 digits)"
            required
            className={styles.input}
          />
          {errors["credit-card"] && (
            <span className={styles.error}>{errors["credit-card"]}</span>
          )}
        </div>
        <button className={styles.btn} type="submit">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
