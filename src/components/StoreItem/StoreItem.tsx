import React, { useMemo } from "react";
import { StoreItemType } from "../../types";
import styles from "./StoreItem.module.css";

interface Props {
  item: StoreItemType;
  onBuy: (item: StoreItemType) => void;
}

const StoreItem: React.FC<Props> = React.memo(({ item, onBuy }) => {
  const { name, description, suggestedPrice, actualPrice, discount } = item;

  const handleBuy = () => onBuy(item);

  const discountLabel = useMemo(() => {
    return discount > 0 ? `${discount}% OFF` : "No discount";
  }, [discount]);

  const priceDisplay = useMemo(() => {
    return (
      <div className={styles.priceInfo}>
        <p className={styles.suggestedPrice}>
          Suggested Price:{" "}
          <span className={styles.strikethrough}>
            ${suggestedPrice.toFixed(2)}
          </span>
        </p>
        <p className={styles.actualPrice}>
          Actual Price:{" "}
          <span className={styles.highlight}>${actualPrice.toFixed(2)}</span>
        </p>
        <p className={styles.discount}>{discountLabel}</p>
      </div>
    );
  }, [suggestedPrice, actualPrice, discountLabel]);

  return (
    <div className={styles.item}>
      <img
        src={`https://via.placeholder.com/150`}
        alt={name}
        className={styles.image}
      />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      {priceDisplay}
      <button className={styles.btn} onClick={handleBuy}>
        Buy Now
      </button>
    </div>
  );
});

StoreItem.displayName = "StoreItem";

export default StoreItem;
