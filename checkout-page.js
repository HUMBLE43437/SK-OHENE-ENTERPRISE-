/* =============================================================
   S K OHENE ENTERPRISE — CHECKOUT PAGE ("Complete Your Order")
   ============================================================= */

(function () {
  const form = document.querySelector("[data-checkout-form]");
  if (!form) return;

  const reviewTableBody = document.querySelector("[data-order-review-body]");
  const reviewTotal = document.querySelector("[data-order-review-total]");
  const emptyState = document.querySelector("[data-checkout-empty]");
  const formSection = document.querySelector("[data-checkout-form-section]");

  const cart = getCart();

  if (!cart.length) {
    formSection.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  formSection.style.display = "block";
  emptyState.style.display = "none";

  // ---- Render order review table ----
  reviewTableBody.innerHTML = "";
  cart.forEach((item) => {
    const tr = document.createElement("tr");
    const optsParts = [];
    if (item.size) optsParts.push(`Size ${item.size}`);
    if (item.color) optsParts.push(item.color);
    tr.innerHTML = `
      <td>${escapeHtml(item.name)}${optsParts.length ? `<br><span style="color:var(--color-ink-soft); font-size:0.82rem;">${optsParts.join(" · ")}</span>` : ""}</td>
      <td>${item.quantity}</td>
      <td>${formatCedis(item.price * item.quantity)}</td>
    `;
    reviewTableBody.appendChild(tr);
  });
  reviewTotal.textContent = formatCedis(getCartSubtotal());

  // ---- Form fields ----
  const nameInput = form.querySelector("#customer-name");
  const phoneInput = form.querySelector("#customer-phone");
  const locationInput = form.querySelector("#customer-location");
  const notesInput = form.querySelector("#customer-notes");

  function setError(input, message) {
    const errorEl = form.querySelector(`[data-error-for="${input.id}"]`);
    if (errorEl) errorEl.textContent = message || "";
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validatePhone(value) {
    // Accepts Ghanaian numbers written in common formats, e.g.
    // 024 123 4567, 0241234567, +233241234567
    const digitsOnly = value.replace(/\D/g, "");
    return digitsOnly.length >= 9 && digitsOnly.length <= 13;
  }

  function validate() {
    let valid = true;

    if (!nameInput.value.trim()) {
      setError(nameInput, "Please enter your full name.");
      valid = false;
    } else {
      setError(nameInput, "");
    }

    if (!phoneInput.value.trim()) {
      setError(phoneInput, "Please enter your phone number.");
      valid = false;
    } else if (!validatePhone(phoneInput.value)) {
      setError(phoneInput, "Please enter a valid phone number.");
      valid = false;
    } else {
      setError(phoneInput, "");
    }

    if (!locationInput.value.trim()) {
      setError(locationInput, "Please enter your delivery location.");
      valid = false;
    } else {
      setError(locationInput, "");
    }

    return valid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Re-check the cart in case it changed in another tab
    const currentCart = getCart();
    if (!currentCart.length) {
      formSection.style.display = "none";
      emptyState.style.display = "block";
      return;
    }

    if (!validate()) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const customer = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      location: locationInput.value.trim(),
      notes: notesInput.value.trim()
    };

    const url = buildWhatsAppOrderUrl(currentCart, customer);
    window.open(url, "_blank", "noopener");

    // Clear the cart once the order has been handed off to WhatsApp
    clearCart();
    formSection.innerHTML = `
      <div class="empty-state">
        <h3>Your order was sent to WhatsApp</h3>
        <p>Please check WhatsApp to confirm and send your order to S K OHENE ENTERPRISE. If WhatsApp did not open automatically, <a href="#" data-reopen>tap here</a>.</p>
        <a href="shop.html" class="btn btn--outline mt-4">Continue Shopping</a>
      </div>
    `;
    const reopenLink = formSection.querySelector("[data-reopen]");
    if (reopenLink) {
      reopenLink.addEventListener("click", (evt) => {
        evt.preventDefault();
        window.open(url, "_blank", "noopener");
      });
    }
  });
})();
