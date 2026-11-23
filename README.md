# CvSU Mini Store - React Product Catalog

A mini product catalog built with React and Vite demonstrating reusable components, props destructuring, default props, callback props, conditional rendering, and list rendering with `.map()`.

## Guide Questions

**1. What is the difference between props and state?**
Props (properties) are read-only inputs passed from a parent component down to a child component to configure how it looks or behaves. State is internal, mutable data managed within a component itself (using `useState`) that tracks information changing over time due to user interaction.

**2. Why can a child component not modify the props it receives?**
React enforces a strict one-way data flow (top-down) so applications remain predictable and easier to debug. Because props are immutable, a child component cannot alter data owned by its parent directly; if data needs to change, the parent must update its own state and pass the updated props down.

**3. How does the `onAddToCart` callback allow data to flow from child to parent even though props only flow downward?**
The parent (`App`) defines a function (`handleAddToCart`) and passes a reference to that function down to `ProductCard` via the `onAddToCart` prop. When the user clicks the button inside the child component, the child invokes that function and passes its `title` as an argument, allowing the parent to execute its own state-updating logic with the child's data.

**4. Why is the `key` prop required when rendering a list with `.map()`? What could happen if it is missing or duplicated?**
React uses the `key` prop to uniquely identify each element in a list between renders so it knows which items were added, updated, or removed. If keys are missing or duplicated, React may improperly reuse DOM elements, leading to visual glitches, broken component state, or degraded rendering performance.

**5. What does the `children` prop allow you to do that a normal prop does not?**
The `children` prop allows you to pass arbitrary JSX elements, HTML tags, or other components directly between the opening and closing tags of a component (`<ProductCard>...</ProductCard>`). Unlike standard props that only accept specific data values or attributes, `children` enables flexible composition and custom inner layouts without modifying the child component's core structure.



## Lab 4 Guide Questions

**1. Why do we use two separate states, `searchText` and `debouncedSearch`, instead of only one?**
`searchText` updates immediately on every keystroke so the controlled input box stays responsive and reflects what the user is typing. `debouncedSearch` only updates after the user pauses typing for 300ms, preventing expensive filtering/re-rendering on every single character typed.

**2. What would happen if the debounce effect did not return a cleanup function?**
Without `clearTimeout(timer)` in the cleanup function, every keystroke would schedule its own separate timer that still fires after 300ms. Instead of waiting until typing stops, `debouncedSearch` would update repeatedly in bursts for every key pressed.

**3. What is the purpose of the dependency array? What happens if it is empty (`[]`)? What happens if it is left out completely?**
The dependency array tells React which reactive values (`props` or `state`) the effect depends on so it only re-runs when those values change. An empty array (`[]`) runs the effect only once after the initial mount. Leaving the dependency array out completely causes the effect to run after every single render.

**4. Why should we avoid sorting the original `products` array directly?**
`.sort()` mutates an array in place. Sorting `products` directly would permanently reorder the source array across renders and break predictable state/list behavior; copying first (`[...filteredProducts].sort(...)`) keeps the source data intact.

**5. Is the filtered product list better stored in its own state, or calculated from existing state during rendering? Explain your choice.**
It is better calculated during rendering from existing state (`debouncedSearch`, `category`, `sortOrder`) and source data (`products`). Storing derived data in separate state risks synchronization bugs where the list gets out of sync with filters or triggers unnecessary extra renders.