/* =============================================================
   S K OHENE ENTERPRISE — PRODUCT DETAIL PAGE
   ============================================================= */

(function () {
  const root = document.querySelector("[data-product-page]");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = PRODUCTS.find((p) => p.id === productId);

  const notFound = document.querySelector("[data-product-not-found]");

  if (!product) {
    root.style.display = "none";
    if (notFound) notFound.style.display = "block";
    document.title = "Product not found — S K OHENE ENTERPRISE";
    return;
  }

  // ---- Populate static content ----
  document.title = `${product.name} — S K OHENE ENTERPRISE`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", product.description.slice(0, 155));

  document.querySelector("[data-pd-category]").textContent = product.category;
  document.querySelector("[data-pd-name]").textContent = product.name;
  document.querySelector("[data-pd-description]").textContent = product.description;
  document.querySelector("[data-breadcrumb-name]").textContent = product.name;

  const pricing = getProductPricing(product);
  const priceEl = document.querySelector("[data-pd-price]");
  priceEl.innerHTML = `
    <span>${formatCedis(pricing.current)}</span>
    ${pricing.old ? `<span class="price-old">${formatCedis(pricing.old)}</span>` : ""}
  `;

  // ---- Gallery ----
  const mainImage = document.querySelector("[data-pd-main-image]");
  const thumbsContainer = document.querySelector("[data-pd-thumbs]");
  const images = product.images && product.images.length ? product.images : ["assets/images/placeholder-accessory.svg"];

  function setActiveImage(index) {
    mainImage.src = images[index];
    mainImage.alt = `${product.name} — photo ${index + 1}`;
    thumbsContainer.querySelectorAll("button").forEach((btn, i) => {
      btn.classList.toggle("is-active", i === index);
      btn.setAttribute("aria-pressed", String(i === index));
    });
  }

  thumbsContainer.innerHTML = "";
  if (images.length > 1) {
    images.forEach((src, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", `Show photo ${i + 1}`);
      btn.innerHTML = `<img src="${src}" alt="" loading="lazy">`;
      btn.addEventListener("click", () => setActiveImage(i));
      thumbsContainer.appendChild(btn);
    });
  }
  setActiveImage(0);

  // ---- Sizes ----
  const sizeGroup = document.querySelector("[data-pd-size-group]");
  const sizeChips = document.querySelector("[data-pd-sizes]");
  let selectedSize = null;

  if (product.sizes && product.sizes.length) {
    sizeGroup.style.display = "block";
    product.sizes.forEach((size, i) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.textContent = size;
      chip.setAttribute("aria-pressed", "false");
      chip.addEventListener("click", () => {
        selectedSize = size;
        sizeChips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
        chip.setAttribute("aria-pressed", "true");
        clearFormMessage();
      });
      sizeChips.appendChild(chip);
      if (i === 0) {
        // Do not auto-select — force the customer to make an active choice
      }
    });
  } else {
    sizeGroup.style.display = "none";
  }

  // ---- Colors ----
  const colorGroup = document.querySelector("[data-pd-color-group]");
  const colorChips = document.querySelector("[data-pd-colors]");
  let selectedColor = null;

  if (product.colors && product.colors.length) {
    colorGroup.style.display = "block";
    product.colors.forEach((color) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.textContent = color;
      chip.setAttribute("aria-pressed", "false");
      chip.addEventListener("click", () => {
        selectedColor = color;
        colorChips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
        chip.setAttribute("aria-pressed", "true");
        clearFormMessage();
      });
      colorChips.appendChild(chip);
    });
  } else {
    colorGroup.style.display = "none";
  }

  // ---- Quantity ----
  const qtyInput = document.querySelector("[data-pd-qty]");
  document.querySelector("[data-qty-decrease]").addEventListener("click", () => {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value || "1", 10) - 1);
  });
  document.querySelector("[data-qty-increase]").addEventListener("click", () => {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value || "1", 10) + 1);
  });
  qtyInput.addEventListener("change", () => {
    const val = parseInt(qtyInput.value, 10);
    qtyInput.value = isNaN(val) || val < 1 ? 1 : val;
  });

  // ---- Availability / stock ----
  const addToCartBtn = document.querySelector("[data-pd-add-to-cart]");
  const waBtn = document.querySelector("[data-pd-whatsapp]");
  const stockNote = document.querySelector("[data-pd-stock]");

  if (!product.inStock) {
    addToCartBtn.disabled = true;
    addToCartBtn.textContent = "Sold Out";
    stockNote.textContent = "This item is currently out of stock.";
  } else {
    stockNote.textContent = "In stock and ready to ship within Accra.";
  }

  // ---- Form message ----
  const formMsg = document.querySelector("[data-pd-form-msg]");
  function setFormMessage(text, state) {
    formMsg.textContent = text;
    formMsg.setAttribute("data-state", state);
  }
  function clearFormMessage() {
    formMsg.textContent = "";
    formMsg.removeAttribute("data-state");
  }

  function validateSelection() {
    if (product.sizes && product.sizes.length && !selectedSize) {
      setFormMessage("Please select a size before adding to cart.", "error");
      return false;
    }
    if (product.colors && product.colors.length && !selectedColor) {
      setFormMessage("Please select a color before adding to cart.", "error");
      return false;
    }
    return true;
  }

  // ---- Add to cart ----
  addToCartBtn.addEventListener("click", () => {
    if (!product.inStock) return;
    if (!validateSelection()) return;

    const quantity = Math.max(1, parseInt(qtyInput.value || "1", 10));

    addToCart({
      productId: product.id,
      name: product.name,
      price: pricing.current,
      image: images[0],
      size: selectedSize,
      color: selectedColor,
      quantity
    });

    setFormMessage("Added to your cart.", "success");
    showToast(`${product.name} added to cart`);
  });

  // ---- Order via WhatsApp directly from product page ----
  waBtn.addEventListener("click", () => {
    if (!product.inStock) return;
    if (!validateSelection()) return;

    const quantity = Math.max(1, parseInt(qtyInput.value || "1", 10));
    const lines = [
      "PRODUCT ENQUIRY — S K OHENE ENTERPRISE",
      "",
      `${product.name}`
    ];
    if (selectedSize) lines.push(`Size: ${selectedSize}`);
    if (selectedColor) lines.push(`Color: ${selectedColor}`);
    lines.push(`Quantity: ${quantity}`);
    lines.push(`Price: ${formatCedis(pricing.current * quantity)}`);
    lines.push("");
    lines.push("I'd like to order this. Please confirm availability.");

    window.open(buildWhatsAppEnquiryUrl(lines.join("\n")), "_blank", "noopener");
  });

  // ---- Related products ----
  const relatedGrid = document.querySelector("[data-related-products]");
  if (relatedGrid) {
    const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
    renderProductGrid(relatedGrid, related, "");
    const relatedSection = document.querySelector("[data-related-section]");
    if (relatedSection && related.length === 0) relatedSection.style.display = "none";
  }
})();
