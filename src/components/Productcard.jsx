import "./ProductCard.css";

function ProductCard({
  title,
  price,
  category = "General",
  inStock,
  onAddToCart,
  children
}) {
  // Format price with Philippine Peso sign, commas, and 2 decimal places
  const formattedPrice = `₱${price.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

  return (
    <div className={`product-card ${!inStock ? "out-of-stock" : ""}`}>
      {/* Render optional children (e.g., New or Sale badge) */}
      {children && <div className="badge-container">{children}</div>}

      <span className="product-category">{category}</span>
      <h2 className="product-title">{title}</h2>
      <p className="product-price">{formattedPrice}</p>

      <div className="stock-status">
        {inStock ? (
          <span className="status-badge in-stock-badge">In Stock</span>
        ) : (
          <span className="status-badge out-of-stock-badge">Out of Stock</span>
        )}
      </div>

      <button
        className="add-to-cart-btn"
        disabled={!inStock}
        onClick={() => onAddToCart(title)}
      >
        {inStock ? "Add to Cart" : "Unavailable"}
      </button>
    </div>
  );
}

export default ProductCard;
