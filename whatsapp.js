/* =============================================================
   S K OHENE ENTERPRISE — WHATSAPP ORDERING
   Builds a formatted order message from the cart + customer
   details, and opens WhatsApp with that message pre-filled.

   The business WhatsApp number is stored ONCE here, in
   international format with no spaces, dashes or the leading
   country "+". If the business ever changes its WhatsApp
   number, this is the only place that needs to change.

   059 553 0424  ->  drop the leading 0, add Ghana's country
   code (233)     ->  233595530424
   ============================================================= */

const WHATSAPP_NUMBER = "233595530424";

/**
 * Build the plain-text order message.
 * @param {Array} cart - array of cart line items
 * @param {Object} customer - { name, phone, location, notes }
 * @returns {string}
 */
function buildOrderMessage(cart, customer) {
  const lines = [];

  lines.push("NEW ORDER — S K OHENE ENTERPRISE");
  lines.push("");
  lines.push("Customer:");
  lines.push(`Name: ${customer.name}`);
  lines.push(`Phone: ${customer.phone}`);
  lines.push("");
  lines.push("ORDER:");
  lines.push("");

  cart.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`);
    if (item.size) lines.push(`   Size: ${item.size}`);
    if (item.color) lines.push(`   Color: ${item.color}`);
    lines.push(`   Quantity: ${item.quantity}`);
    lines.push(`   Price: ${formatCedis(item.price * item.quantity)}`);
    lines.push("");
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  lines.push(`Subtotal: ${formatCedis(subtotal)}`);
  lines.push("");
  lines.push("Delivery location:");
  lines.push(customer.location);

  if (customer.notes && customer.notes.trim() !== "") {
    lines.push("");
    lines.push("Customer notes:");
    lines.push(customer.notes.trim());
  }

  lines.push("");
  lines.push(`TOTAL: ${formatCedis(subtotal)}`);
  lines.push("");
  lines.push("Please confirm my order.");

  return lines.join("\n");
}

/**
 * Build the full wa.me URL for a general enquiry (no order),
 * used by "Order via WhatsApp" buttons outside of checkout.
 */
function buildWhatsAppEnquiryUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Build the full wa.me URL for a completed order message.
 */
function buildWhatsAppOrderUrl(cart, customer) {
  const message = buildOrderMessage(cart, customer);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
