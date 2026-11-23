import { useState } from "react";
import { products } from "./data/product";
import ProductCard from "./components/Productcard";
import "./App.css";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  const handleAddToCart = (productTitle) => {
    setCartCount((prevCount) => prevCount + 1);
    setLastAdded(productTitle);
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

      <main className="product-grid">
        {products.map((product) => (
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
    </div>
  );
}

export default App;
