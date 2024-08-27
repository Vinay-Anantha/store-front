import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import StoreItem from "../../components/StoreItem/StoreItem";
import { StoreItemType } from "../../types";
import { ADJECTIVES } from "../../constant";
import styles from "./StorePage.module.css";

const generateStoreItems = (): StoreItemType[] => {
  return Array.from({ length: 20 }, (_, i) => {
    const suggestedPrice = Math.floor(Math.random() * 100) + 50;
    const actualPrice = Math.floor(
      suggestedPrice * (0.7 + Math.random() * 0.3)
    );
    const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    return {
      id: i + 1,
      name: `${adjective} Item`,
      description: `High-quality ${adjective.toLowerCase()} item for your needs`,
      suggestedPrice,
      actualPrice,
      discount: Math.round((1 - actualPrice / suggestedPrice) * 100),
    };
  });
};

const StorePage: React.FC = () => {
  const [storeItems, setStoreItems] = useState<StoreItemType[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [debouncedNameFilter, setDebouncedNameFilter] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const navigate = useNavigate();

  useEffect(() => {
    setStoreItems(generateStoreItems());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedNameFilter(nameFilter);
    }, 300);

    return () => clearTimeout(timer);
  }, [nameFilter]);

  const handleBuy = useCallback(
    (item: StoreItemType) => {
      localStorage.setItem("selectedItem", JSON.stringify(item));
      navigate("/checkout");
    },
    [navigate]
  );

  const filteredAndSortedItems = useMemo(() => {
    return storeItems
      .filter((item) =>
        item.name.toLowerCase().includes(debouncedNameFilter.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          case "price-asc":
            return a.actualPrice - b.actualPrice;
          case "price-desc":
            return b.actualPrice - a.actualPrice;
          default:
            return 0;
        }
      });
  }, [storeItems, debouncedNameFilter, sortBy]);

  return (
    <div className={styles.storePage}>
      <h1 className={styles.title}>Online Store</h1>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className={styles.input}
        />
        <select
          className={styles.select}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>
      <div className={styles.grid}>
        {filteredAndSortedItems.map((item) => (
          <StoreItem key={item.id} item={item} onBuy={handleBuy} />
        ))}
      </div>
    </div>
  );
};

export default StorePage;
