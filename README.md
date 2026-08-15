# S K OHENE ENTERPRISE — Website

A complete, mobile-friendly website for S K OHENE ENTERPRISE with a working shopping cart and WhatsApp checkout. No backend, no database, no paid services — built to run entirely on free GitHub Pages hosting.

## How to add or edit products (no coding required)

Open **`js/products.js`**. This is the only file you need to touch to manage products. Each product looks like this:

```js
{
  id: "shirt-001",
  name: "Premium Black Shirt",
  category: "Men's Clothing",
  description: "A tailored long-sleeve shirt...",
  price: 150,
  salePrice: null,
  images: ["assets/images/placeholder-shirt.svg"],
  sizes: ["S", "M", "L", "XL"],
  colors: ["Black", "Navy"],
  inStock: true,
  newArrival: true,
  bestSeller: false,
  onSale: false,
  tags: ["shirt", "formal"]
}
```

To **add a product**: copy one whole block (from `{` to `},`), paste it before the closing `];`, and edit the values. Give it a unique `id`.
To **remove a product**: delete its whole block.
To **put a product on sale**: set `onSale: true` and fill in `salePrice`.
To **mark it sold out**: set `inStock: false`.

Full field explanations are in the comments at the top of `js/products.js`.

## Adding your own product photos

1. Put your photo files inside `assets/images/`. Use simple file names with no spaces, e.g. `shirt-black-001.jpg`.
2. In `js/products.js`, update that product's `images` list with the new file path(s), e.g. `images: ["assets/images/shirt-black-001.jpg"]`.
3. Photos roughly in a 3:4 (portrait) shape will look best in the product cards.

Until you upload real photos, the site shows on-brand placeholder graphics so nothing looks broken.

## Project structure

```
index.html          Homepage
shop.html            Full product catalog (search, filter, sort)
product.html         Single product page
cart.html            Shopping cart
checkout.html        Delivery details + "Send Order via WhatsApp"
css/style.css        All visual styling
js/products.js       PRODUCT DATA — edit this to manage products
js/cart.js           Shopping cart logic (saves cart in the browser)
js/whatsapp.js        Builds the WhatsApp order message and link
js/main.js           Shared behavior: menu, animations, product cards
js/shop.js           Search / filter / sort logic for shop.html
js/product-page.js   Logic for product.html
js/cart-page.js      Logic for cart.html
js/checkout-page.js  Logic for checkout.html
assets/images/       All product and site photos
```

## What still needs your input (marked as placeholders on the site)

- Delivery fee within Accra
- Typical delivery time
- Payment method details (shared after order confirmation on WhatsApp)
- Return/exchange policy
- Real customer reviews (currently placeholder text, clearly marked)
- Google Maps link for your exact shop location
- Real product photos

Search the site files for the word "Placeholder" to find every spot that's waiting on real information from you.

## How to publish this website for free with GitHub Pages

1. **Create a GitHub account** at github.com if you don't have one.
2. Click the **+** icon top-right → **New repository**.
3. Name it something like `skohene-website`. Set it to **Public**. Click **Create repository**.
4. On the new repository page, click **uploading an existing file**.
5. Drag and drop **all the files and folders** from this project (keeping the folder structure: `css`, `js`, `assets` folders and all the `.html` files) into the upload box.
6. Scroll down and click **Commit changes**.
7. Go to the repository's **Settings** tab → **Pages** (left sidebar).
8. Under "Branch", choose **main** and folder **/ (root)**, then click **Save**.
9. Wait 1–2 minutes, then refresh the page. GitHub will show you a link like:
   `https://yourusername.github.io/skohene-website/`
10. That link is your live website — share it anywhere.

This free address will look different from a custom domain (like `skohene.com`). You can connect a real domain to GitHub Pages later if you buy one — no rebuild needed.

## Testing the WhatsApp order flow

1. Open the live site (or open `index.html` directly in a browser).
2. Go to **Shop**, open a product, choose a size/color, and click **Add to Cart**.
3. Go to **Cart**, then **Proceed to Checkout**.
4. Fill in the form and click **Send Order via WhatsApp**.
5. WhatsApp should open with the full order message pre-filled, ready to send to 059 553 0424.
