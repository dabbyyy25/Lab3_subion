import { useEffect, useState } from "react";
import { products } from "./data/product";
import ProductCard from "./components/Productcard";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  const normalizedQuery = debouncedSearch.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    const matchesKeyword =
      normalizedQuery === "" ||
      product.title.toLowerCase().includes(normalizedQuery);
    const matchesCategory =
      category === "All" || product.category === category;
    const matchesStock = !inStockOnly || product.inStock;

    return matchesKeyword && matchesCategory && matchesStock;
  });

  const visibleProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "price-asc") {
      return a.price - b.price;
    }
    if (sortOrder === "price-desc") {
      return b.price - a.price;
    }
    return 0;
  });

  useEffect(() => {
    document.title = `CvSU Mini Store (${visibleProducts.length} results)`;
  }, [visibleProducts.length]);

  const handleAddToCart = (productTitle) => {
    setCartCount((prevCount) => prevCount + 1);
    setLastAdded(productTitle);
  };

  const handleClearFilters = () => {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
    setInStockOnly(false);
  };

  return (
    <div className="app-container">
      <header className="store-header">
        <h1>CvSU Mini Store</h1>
        <p className="store-subtitle">Campus Tech, Books & Essentials</p>

        <div className="cart-banner">
          {cartCount === 0 ? (
            <span>Your cart is empty.</span>
          ) : (
            <span>
              Items added to cart: <strong>{cartCount}</strong> (Last added:{" "}
              <strong>{lastAdded}</strong>)
            </span>
          )}
        </div>
      </header>

      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        inStockOnly={inStockOnly}
        onInStockOnlyChange={setInStockOnly}
        onClearFilters={handleClearFilters}
      />

      <p className="results-summary" aria-live="polite">
        Showing {visibleProducts.length} of {products.length} products
      </p>

      {visibleProducts.length === 0 ? (
        <div className="empty-state">
          <p>No products found. Try a different keyword or category.</p>
        </div>
      ) : (
        <main className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              inStock={product.inStock}
              onAddToCart={handleAddToCart}
            >
              {product.badge && (
                <span className={`badge ${product.badge.toLowerCase()}`}>
                  {product.badge}
                </span>
              )}
            </ProductCard>
          ))}
        </main>
      )}
    </div>
  );
}

export default App;
