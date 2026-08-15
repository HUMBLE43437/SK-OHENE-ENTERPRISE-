/* =============================================================
   S K OHENE ENTERPRISE — CART LOGIC
   Handles reading/writing the shopping cart. The cart is saved
   in the browser's localStorage, so it survives a page refresh
   or the customer closing and reopening the site — but it is
   only stored on that one device/browser.
   ============================================================= */

const CART_STORAGE_KEY = "skohene_cart_v1";

/** Read the cart array from localStorage. Returns [] if empty/corrupt. */
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Could not read cart:", err);
    return [];
  }
}

/** Save the full cart array back to localStorage. */
function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (err) {
    console.error("Could not save cart:", err);
  }
  updateCartCountBadge();
}

/**
 * Add an item to the cart. If the same product + size + color
 * combination already exists, increase its quantity instead of
 * creating a duplicate row.
 */
function addToCart({ productId, name, price, image, size, color, quantity }) {
  const cart = getCart();
  const existing = cart.find(
    (item) =>
      item.productId === productId &&
      item.size === (size || "") &&
      item.color === (color || "")
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      productId,
      name,
      price,
      image,
      size: size || "",
      color: color || "",
      quantity
    });
  }

  saveCart(cart);
}

/** Update quantity for a specific cart line (identified by index). */
function updateCartItemQuantity(index, quantity) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].quantity = Math.max(1, quantity);
  saveCart(cart);
}

/** Remove a specific cart line by index. */
function removeCartItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

/** Empty the entire cart (used after an order is sent). */
function clearCart() {
  saveCart([]);
}

/** Total number of individual items (sum of quantities). */
function getCartItemCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

/** Cart subtotal in Cedis. */
function getCartSubtotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/** Format a number as Ghana Cedis, e.g. 1250 -> "GH₵1,250". */
function formatCedis(amount) {
  const rounded = Math.round(amount * 100) / 100;
  return "GH₵" + rounded.toLocaleString("en-GH", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

/** Update the little number badge on the cart icon in the header, on every page. */
function updateCartCountBadge() {
  const badges = document.querySelectorAll("[data-cart-count]");
  const count = getCartItemCount();
  badges.forEach((badge) => {
    badge.textContent = String(count);
    badge.style.display = count > 0 ? "inline-flex" : "none";
  });
}

document.addEventListener("DOMContentLoaded", updateCartCountBadge);
