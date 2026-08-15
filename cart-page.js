/* =============================================================
   S K OHENE ENTERPRISE — CART PAGE
   ============================================================= */

(function () {
  const itemsContainer = document.querySelector("[data-cart-items]");
  if (!itemsContainer) return;

  const emptyState = document.querySelector("[data-cart-empty]");
  const layout = document.querySelector("[data-cart-layout]");
  const subtotalEl = document.querySelector("[data-cart-subtotal]");
  const totalEl = document.querySelector("[data-cart-total]");
  const checkoutBtn = document.querySelector("[data-cart-checkout]");

  function render() {
    const cart = getCart();

    if (!cart.length) {
      layout.style.display = "none";
      emptyState.style.display = "block";
      return;
    }

    layout.style.display = "grid";
    emptyState.style.display = "none";
    itemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      const optsParts = [];
      if (item.size) optsParts.push(`Size: ${item.size}`);
      if (item.color) optsParts.push(`Color: ${item.color}`);

      row.innerHTML = `
        <div class="cart-item__media">
          <img src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy">
        </div>
        <div class="cart-item__info">
          <div class="cart-item__name">${escapeHtml(item.name)}</div>
          ${optsParts.length ? `<div class="cart-item__opts">${optsParts.join(" · ")}</div>` : ""}
          <div class="cart-item__price">${formatCedis(item.price)} <span style="color:var(--color-ink-soft); font-weight:400;">each</span></div>
          <div class="qty-control mt-4" style="margin-top:0.6rem;">
            <button type="button" aria-label="Decrease quantity" data-qty-dec>−</button>
            <input type="number" min="1" value="${item.quantity}" aria-label="Quantity for ${escapeHtml(item.name)}" data-qty-input>
            <button type="button" aria-label="Increase quantity" data-qty-inc>+</button>
          </div>
        </div>
        <div class="cart-item__right">
          <div class="cart-item__price">${formatCedis(item.price * item.quantity)}</div>
          <button type="button" class="link-remove" data-remove>Remove</button>
        </div>
      `;

      row.querySelector("[data-qty-dec]").addEventListener("click", () => {
        const input = row.querySelector("[data-qty-input]");
        const newQty = Math.max(1, parseInt(input.value, 10) - 1);
        updateCartItemQuantity(index, newQty);
        render();
      });
      row.querySelector("[data-qty-inc]").addEventListener("click", () => {
        const input = row.querySelector("[data-qty-input]");
        const newQty = Math.max(1, parseInt(input.value, 10) + 1);
        updateCartItemQuantity(index, newQty);
        render();
      });
      row.querySelector("[data-qty-input]").addEventListener("change", (e) => {
        const val = parseInt(e.target.value, 10);
        updateCartItemQuantity(index, isNaN(val) || val < 1 ? 1 : val);
        render();
      });
      row.querySelector("[data-remove]").addEventListener("click", () => {
        removeCartItem(index);
        showToast("Item removed from cart");
        render();
      });

      itemsContainer.appendChild(row);
    });

    const subtotal = getCartSubtotal();
    subtotalEl.textContent = formatCedis(subtotal);
    totalEl.textContent = formatCedis(subtotal);
  }

  render();
})();
