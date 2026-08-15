/* =============================================================
   S K OHENE ENTERPRISE — SHARED SITE BEHAVIOR
   Runs on every page: mobile nav, scroll-reveal animation,
   toast messages, and the reusable product card builder.
   ============================================================= */

/* ---------- Mobile nav toggle ---------- */
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a link is chosen (mobile)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- Toast messages ---------- */
let toastTimer = null;
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
}

/* ---------- Product card builder (shared by home, shop, related products) ---------- */

/** Return the current display price info for a product: { current, old, hasDiscount } */
function getProductPricing(product) {
  if (product.onSale && product.salePrice != null && product.salePrice < product.price) {
    return { current: product.salePrice, old: product.price, hasDiscount: true };
  }
  return { current: product.price, old: null, hasDiscount: false };
}

/** Build a product card DOM element for a product. */
function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card reveal";

  const pricing = getProductPricing(product);
  const image = product.images && product.images.length ? product.images[0] : "assets/images/placeholder-accessory.svg";

  let badge = "";
  if (!product.inStock) {
    badge = `<span class="badge badge--out">Sold Out</span>`;
  } else if (pricing.hasDiscount) {
    const pct = Math.round(((product.price - product.salePrice) / product.price) * 100);
    badge = `<span class="badge badge--sale">-${pct}%</span>`;
  } else if (product.newArrival) {
    badge = `<span class="badge badge--new">New</span>`;
  }

  card.innerHTML = `
    <a href="product.html?id=${encodeURIComponent(product.id)}" class="product-card__media" aria-label="View ${escapeHtml(product.name)}">
      ${badge}
      <img src="${image}" alt="${escapeHtml(product.name)}" loading="lazy" width="400" height="533">
    </a>
    <div class="product-card__body">
      <span class="product-card__cat">${escapeHtml(product.category)}</span>
      <h3 class="product-card__name"><a href="product.html?id=${encodeURIComponent(product.id)}">${escapeHtml(product.name)}</a></h3>
      <div class="product-card__price">
        <span>${formatCedis(pricing.current)}</span>
        ${pricing.old ? `<span class="price-old">${formatCedis(pricing.old)}</span>` : ""}
      </div>
      <div class="product-card__cta">
        <a href="product.html?id=${encodeURIComponent(product.id)}" class="btn btn--outline btn--small btn--full">
          ${product.inStock ? "View Product" : "View Details"}
        </a>
      </div>
    </div>
  `;

  return card;
}

/** Render a list of products into a container element. */
function renderProductGrid(container, products, emptyMessage) {
  container.innerHTML = "";
  if (!products.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No products found</h3>
        <p>${emptyMessage || "Try a different search or filter."}</p>
      </div>
    `;
    return;
  }
  products.forEach((product) => container.appendChild(createProductCard(product)));
}

/** Escape text before inserting into innerHTML, to avoid broken markup from odd product names. */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = String(str);
  return div.innerHTML;
}

/* ---------- Home page dynamic sections ---------- */
function initHomeSections() {
  const newArrivalsGrid = document.querySelector("[data-new-arrivals]");
  const bestSellersGrid = document.querySelector("[data-best-sellers]");
  const saleGrid = document.querySelector("[data-sale-products]");

  if (newArrivalsGrid) {
    const items = PRODUCTS.filter((p) => p.newArrival).slice(0, 4);
    renderProductGrid(newArrivalsGrid, items, "New arrivals will appear here soon.");
  }
  if (bestSellersGrid) {
    const items = PRODUCTS.filter((p) => p.bestSeller).slice(0, 4);
    renderProductGrid(bestSellersGrid, items, "Best sellers will appear here soon.");
  }
  if (saleGrid) {
    const items = PRODUCTS.filter((p) => p.onSale).slice(0, 4);
    renderProductGrid(saleGrid, items, "No active discounts right now — check back soon.");
    const saleSection = document.querySelector("[data-sale-section]");
    if (saleSection && items.length === 0) {
      saleSection.style.display = "none";
    }
  }
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initScrollReveal();
  initHomeSections();
});
