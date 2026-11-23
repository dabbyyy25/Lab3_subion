import "./SearchBar.css";

const CATEGORIES = [
  "All",
  "Electronics",
  "Books",
  "School Supplies",
  "Accessories"
];

function SearchBar({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  sortOrder,
  onSortChange,
  inStockOnly,
  onInStockOnlyChange,
  onClearFilters
}) {
  const hasActiveFilters =
    searchText.trim() !== "" ||
    category !== "All" ||
    sortOrder !== "default" ||
    inStockOnly;

  return (
    <section className="search-bar" aria-label="Product filters">
      <div className="filter-group search-group">
        <label htmlFor="product-search">Search Products</label>
        <input
          id="product-search"
          type="text"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title (e.g., mouse, book)..."
        />
      </div>

      <div className="filter-group">
        <label htmlFor="category-select">Category</label>
        <select
          id="category-select"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-select">Sort By</label>
        <select
          id="sort-select"
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div className="filter-group stock-filter">
        <span className="stock-filter-label">Availability</span>
        <label className="stock-toggle" htmlFor="in-stock-only">
          <input
            id="in-stock-only"
            type="checkbox"
            checked={inStockOnly}
            onChange={(event) => onInStockOnlyChange(event.target.checked)}
          />
          <span>In-stock only</span>
        </label>
      </div>

      <div className="filter-actions">
        <button
          type="button"
          className="clear-filters-btn"
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
        >
          Clear Filters
        </button>
      </div>
    </section>
  );
}

export default SearchBar;
