/* =============================================================
   S K OHENE ENTERPRISE — SHOP PAGE
   Handles search, category filtering and sorting of PRODUCTS
   (defined in products.js), and renders the results grid.
   ============================================================= */

(function () {
  const grid = document.querySelector("[data-shop-grid]");
  const searchInput = document.querySelector("[data-shop-search]");
  const sortSelect = document.querySelector("[data-shop-sort]");
  const pillsContainer = document.querySelector("[data-category-pills]");
  const resultsCount = document.querySelector("[data-results-count]");

  if (!grid) return; // Not on the shop page

  let state = {
    search: "",
    category: "All",
    sort: "default"
  };

  // Build category pills dynamically from CATEGORIES in products.js
  function renderPills() {
    const all = ["All", ...CATEGORIES];
    pillsContainer.innerHTML = "";
    all.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pill";
      btn.textContent = cat;
      btn.setAttribute("aria-pressed", String(state.category === cat));
      btn.addEventListener("click", () => {
        state.category = cat;
        renderPills();
        applyFilters();
      });
      pillsContainer.appendChild(btn);
    });
  }

  function applyFilters() {
    let results = PRODUCTS.slice();

    // Category filter
    if (state.category !== "All") {
      results = results.filter((p) => p.category === state.category);
    }

    // Search filter (name, description, tags)
    if (state.search.trim() !== "") {
      const query = state.search.trim().toLowerCase();
      results = results.filter((p) => {
        const haystack = [p.name, p.description, p.category, ...(p.tags || [])]
          .join(" ")
          .toLowerCase();
        return haystack.includes(query);
      });
    }

    // Sorting
    switch (state.sort) {
      case "price-asc":
        results.sort((a, b) => getProductPricing(a).current - getProductPricing(b).current);
        break;
      case "price-desc":
        results.sort((a, b) => getProductPricing(b).current - getProductPricing(a).current);
        break;
      case "name-asc":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        results.sort((a, b) => (b.newArrival === true) - (a.newArrival === true));
        break;
      default:
        // Keep a sensible default: in-stock items first
        results.sort((a, b) => (b.inStock === true) - (a.inStock === true));
    }

    renderProductGrid(grid, results, "Try clearing your search or choosing a different category.");
    if (resultsCount) {
      resultsCount.textContent = `${results.length} product${results.length === 1 ? "" : "s"}`;
    }
  }

  searchInput.addEventListener("input", (e) => {
    state.search = e.target.value;
    applyFilters();
  });

  sortSelect.addEventListener("change", (e) => {
    state.sort = e.target.value;
    applyFilters();
  });

  // Support ?category=Caps style links from the homepage
  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get("category");
  if (categoryParam && CATEGORIES.includes(categoryParam)) {
    state.category = categoryParam;
  }
  const searchParam = params.get("q");
  if (searchParam) {
    state.search = searchParam;
    searchInput.value = searchParam;
  }

  renderPills();
  applyFilters();
})();
