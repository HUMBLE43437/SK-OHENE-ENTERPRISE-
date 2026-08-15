/* =============================================================
   S K OHENE ENTERPRISE — PRODUCT DATA FILE
   =============================================================

   THIS IS THE ONLY FILE YOU NEED TO EDIT TO ADD, REMOVE OR
   CHANGE PRODUCTS. You do not need to touch any other file.

   HOW TO ADD A NEW PRODUCT:
   1. Copy one whole product block below (from the opening { to
      the closing },).
   2. Paste it just before the closing bracket "];" at the
      bottom of this file.
   3. Change the values (name, price, images, etc).
   4. Give it a unique "id" that no other product uses.
   5. Save the file and upload it to GitHub (see README.md).

   FIELD GUIDE:
   - id:          unique code for this product, e.g. "cap-004"
                  (letters, numbers, dashes only — no spaces)
   - name:        product name shown to customers
   - category:    must match one of the categories in CATEGORIES
                  below (or add a new category there first)
   - description: a short paragraph about the product
   - price:       regular price in Ghana Cedis, numbers only
                  (no "GH₵", the website adds that automatically)
   - salePrice:   the discounted price, or "null" if not on sale
   - images:      list of image file paths. Put your photos in
                  the assets/images folder and list them here.
   - sizes:       list of sizes, or an empty list [] if the
                  product has no sizes (e.g. some accessories)
   - colors:      list of colors, or an empty list [] if not
                  applicable
   - inStock:     true if available to order, false if sold out
   - newArrival:  true to show this product in "New Arrivals"
   - bestSeller:  true to show this product in "Best Sellers"
   - onSale:      true if salePrice should be shown as a discount
   - tags:        extra keywords to help search find the product

   ============================================================= */

// Categories shown in the shop filters.
// Add a new one here any time you introduce a new product category.
const CATEGORIES = ["Men's Clothing", "Caps", "Accessories"];

const PRODUCTS = [
  {
    id: "shirt-001",
    name: "Premium Black Shirt",
    category: "Men's Clothing",
    description: "A tailored long-sleeve shirt in a breathable cotton-blend fabric. Sits clean under a blazer or worn open over a tee — built for a sharp everyday look.",
    price: 150,
    salePrice: null,
    images: [
      "assets/images/placeholder-shirt.svg",
      "assets/images/placeholder-shirt.svg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy"],
    inStock: true,
    newArrival: true,
    bestSeller: true,
    onSale: false,
    tags: ["shirt", "formal", "cotton"]
  },
  {
    id: "shirt-002",
    name: "Classic White Oxford",
    category: "Men's Clothing",
    description: "The wardrobe staple every man needs. A crisp white oxford shirt with a structured collar, made to go from the office to the weekend.",
    price: 140,
    salePrice: 110,
    images: [
      "assets/images/placeholder-shirt.svg"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White"],
    inStock: true,
    newArrival: false,
    bestSeller: true,
    onSale: true,
    tags: ["shirt", "oxford", "white"]
  },
  {
    id: "polo-001",
    name: "Signature Pique Polo",
    category: "Men's Clothing",
    description: "A soft pique-knit polo with a relaxed, modern fit. An easy way to look put-together without trying too hard.",
    price: 120,
    salePrice: null,
    images: [
      "assets/images/placeholder-shirt.svg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Olive", "Grey"],
    inStock: true,
    newArrival: true,
    bestSeller: false,
    onSale: false,
    tags: ["polo", "casual"]
  },
  {
    id: "trouser-001",
    name: "Tailored Chino Trousers",
    category: "Men's Clothing",
    description: "Slim, tapered chinos with a comfortable stretch waistband. Pairs with almost anything in your wardrobe.",
    price: 180,
    salePrice: null,
    images: [
      "assets/images/placeholder-shirt.svg"
    ],
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Khaki", "Black", "Navy"],
    inStock: true,
    newArrival: false,
    bestSeller: false,
    onSale: false,
    tags: ["trousers", "chinos", "formal"]
  },
  {
    id: "cap-001",
    name: "Classic Black Cap",
    category: "Caps",
    description: "A clean, structured six-panel cap with an adjustable strap. A simple finishing piece for any outfit.",
    price: 80,
    salePrice: null,
    images: [
      "assets/images/placeholder-cap.svg"
    ],
    sizes: [],
    colors: ["Black", "Charcoal"],
    inStock: true,
    newArrival: true,
    bestSeller: true,
    onSale: false,
    tags: ["cap", "headwear"]
  },
  {
    id: "cap-002",
    name: "Bronze Stitch Dad Cap",
    category: "Caps",
    description: "A low-profile dad cap with subtle bronze-tone stitching detail. Understated and versatile.",
    price: 90,
    salePrice: 70,
    images: [
      "assets/images/placeholder-cap.svg"
    ],
    sizes: [],
    colors: ["Beige", "Black"],
    inStock: true,
    newArrival: false,
    bestSeller: false,
    onSale: true,
    tags: ["cap", "headwear", "sale"]
  },
  {
    id: "cap-003",
    name: "Fitted Sport Cap",
    category: "Caps",
    description: "A fitted cap with a rounder crown, built for a cleaner, tailored silhouette than a standard snapback.",
    price: 85,
    salePrice: null,
    images: [
      "assets/images/placeholder-cap.svg"
    ],
    sizes: ["S/M", "L/XL"],
    colors: ["Navy", "Black"],
    inStock: false,
    newArrival: false,
    bestSeller: false,
    onSale: false,
    tags: ["cap", "headwear"]
  },
  {
    id: "acc-001",
    name: "Leather Strap Watch",
    category: "Accessories",
    description: "A minimalist wristwatch with a genuine leather strap and a slim stainless steel case. Understated luxury for the wrist.",
    price: 220,
    salePrice: null,
    images: [
      "assets/images/placeholder-accessory.svg"
    ],
    sizes: [],
    colors: ["Brown Strap", "Black Strap"],
    inStock: true,
    newArrival: true,
    bestSeller: true,
    onSale: false,
    tags: ["watch", "accessory", "leather"]
  },
  {
    id: "acc-002",
    name: "Woven Leather Belt",
    category: "Accessories",
    description: "A hand-woven leather belt with a matte buckle. Built to hold its shape and finish an outfit with quiet confidence.",
    price: 95,
    salePrice: 75,
    images: [
      "assets/images/placeholder-accessory.svg"
    ],
    sizes: ["S", "M", "L"],
    colors: ["Brown", "Black"],
    inStock: true,
    newArrival: false,
    bestSeller: false,
    onSale: true,
    tags: ["belt", "accessory", "leather"]
  },
  {
    id: "acc-003",
    name: "Classic Aviator Sunglasses",
    category: "Accessories",
    description: "Timeless aviator-style sunglasses with UV-protective lenses and a lightweight metal frame.",
    price: 110,
    salePrice: null,
    images: [
      "assets/images/placeholder-accessory.svg"
    ],
    sizes: [],
    colors: ["Gold Frame", "Black Frame"],
    inStock: true,
    newArrival: true,
    bestSeller: false,
    onSale: false,
    tags: ["sunglasses", "accessory"]
  }
];
