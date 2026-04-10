import React, { useState } from "react";

const placeholderProduct = {
  id: 1,
  name: "Smart Phone X12",
  brand: "NovaTech",
  price: 799,
  originalPrice: 999,
  rating: 4.7,
  reviews: 328,
  category: "Electronics",
  stock: 18,
  sold: 1421,
  sku: "NT-X12-BLK",
  description:
    "A premium smartphone with a bright OLED display, fast processor, long battery life, and a pro camera system for stunning photos.",
  tagline: "Powerful performance for work, content creation, and everyday life.",
  features: [
    "6.5-inch OLED display with 120Hz refresh rate",
    "128GB storage with expandable microSD",
    "48MP triple camera system",
    "33W fast charging with wireless support",
    "5G connectivity and Wi-Fi 6E",
  ],
  highlights: [
    "Premium glass finish",
    "Dual stereo speakers",
    "Water resistant (IP68)",
    "One-year premium support",
  ],
  specifications: [
    { label: "Display", value: "6.5-inch OLED, 120Hz" },
    { label: "Processor", value: "Octa-core 3.1GHz" },
    { label: "Storage", value: "128GB / 256GB" },
    { label: "Battery", value: "4500mAh" },
    { label: "Camera", value: "48MP + 12MP + 8MP" },
  ],
  reviewsList: [
    {
      name: "Aisha K.",
      rating: 5,
      title: "Outstanding camera and battery life",
      body: "The photo quality is amazing and the battery lasts all day even with heavy use. Fast charger is a game changer.",
    },
    {
      name: "Daniel R.",
      rating: 4,
      title: "Stylish design, smooth performance",
      body: "The phone feels premium, and the display is super crisp. I wish the storage option included 512GB by default.",
    },
  ],
  images: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1510557880182-3c5f5e7e1788?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80",
  ],
  variants: [
    { name: "Midnight Black", color: "#111827" },
    { name: "Silver Mist", color: "#CBD5E1" },
    { name: "Sunset Gold", color: "#F59E0B" },
  ],
};

export default function ProductInspect({ product = placeholderProduct }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [tab, setTab] = useState("overview");

  const increaseQuantity = () => setQuantity((qty) => Math.min(qty + 1, product.stock));
  const decreaseQuantity = () => setQuantity((qty) => Math.max(qty - 1, 1));

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white shadow-2xl overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Product Preview</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">{product.name}</h1>
              <p className="text-sm text-slate-500">{product.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2">SKU: {product.sku}</span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2">Sold: {product.sold}</span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2">Free shipping</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-6 lg:grid-cols-[1.4fr_0.9fr] lg:p-8">
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-slate-950 p-6 shadow-2xl text-white">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <span className="inline-flex rounded-full bg-amber-400 px-3 py-1 text-sm font-semibold text-slate-950">
                    {product.category}
                  </span>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                    <span className="inline-flex items-center gap-2 text-amber-300">
                      <strong>{product.rating}</strong>
                      <span>★</span>
                    </span>
                    <span>{product.reviews} reviews</span>
                    <span>{product.stock} left in stock</span>
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4 text-slate-100">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Best Seller</p>
                  <p className="mt-3 text-lg font-semibold">Ships within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_110px]">
              <div className="rounded-[2rem] bg-slate-100 p-5 shadow-inner">
                <img
                  className="h-full w-full rounded-[2rem] object-cover"
                  src={selectedImage}
                  alt={product.name}
                />
              </div>

              <div className="space-y-3">
                {product.images.map((image) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={`overflow-hidden rounded-3xl border-2 transition ${
                      selectedImage === image ? "border-slate-900" : "border-slate-200"
                    }`}
                  >
                    <img className="h-24 w-full object-cover" src={image} alt="Product thumb" />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 rounded-[2rem] bg-slate-50 p-6 shadow-inner">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Product details</h2>
                  <p className="mt-2 text-sm text-slate-600">Everything you need to know before checkout.</p>
                </div>
                <div className="rounded-3xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                  {product.stock > 0 ? "Available now" : "Out of stock"}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {product.highlights.map((highlight) => (
                  <div key={highlight} className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm">
                    {highlight}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-inner">
              <div className="flex flex-wrap gap-3 border-b border-slate-200 pb-4">
                <button
                  type="button"
                  onClick={() => setTab("overview")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    tab === "overview" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Overview
                </button>
                <button
                  type="button"
                  onClick={() => setTab("specs")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    tab === "specs" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Specifications
                </button>
                <button
                  type="button"
                  onClick={() => setTab("reviews")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    tab === "reviews" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Reviews
                </button>
              </div>

              <div className="mt-6 space-y-6">
                {tab === "overview" && (
                  <div className="space-y-4 text-slate-700">
                    <p>{product.description}</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl bg-slate-100 p-4">
                        <h3 className="font-semibold text-slate-900">Best for</h3>
                        <p className="mt-2 text-sm">Tech-savvy customers who want flagship performance with premium design.</p>
                      </div>
                      <div className="rounded-3xl bg-slate-100 p-4">
                        <h3 className="font-semibold text-slate-900">Why choose it</h3>
                        <p className="mt-2 text-sm">Fast charging, crisp camera, and immersive media playback in one polished device.</p>
                      </div>
                    </div>
                  </div>
                )}

                {tab === "specs" && (
                  <div className="grid gap-3">
                    {product.specifications.map((spec) => (
                      <div key={spec.label} className="flex justify-between rounded-3xl bg-slate-100 p-4">
                        <span className="text-sm text-slate-600">{spec.label}</span>
                        <span className="font-medium text-slate-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {tab === "reviews" && (
                  <div className="space-y-5">
                    {product.reviewsList.map((review) => (
                      <div key={review.name} className="rounded-3xl bg-slate-100 p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold text-slate-900">{review.name}</p>
                            <p className="text-sm text-slate-500">{review.title}</p>
                          </div>
                          <span className="rounded-full bg-amber-400 px-3 py-1 text-sm font-semibold text-slate-950">
                            {review.rating} ★
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-700">{review.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-50 p-6 shadow-inner">
              <h2 className="text-xl font-semibold text-slate-900">Related products</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  { name: "Wireless Earbuds Plus", price: 129, image: product.images[1] },
                  { name: "Portable Power Bank", price: 49, image: product.images[2] },
                ].map((item) => (
                  <div key={item.name} className="rounded-3xl bg-white p-4 shadow-sm">
                    <img src={item.image} alt={item.name} className="h-36 w-full rounded-3xl object-cover" />
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{item.name}</p>
                        <p className="text-sm text-slate-500">${item.price}</p>
                      </div>
                      <button className="rounded-3xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6 rounded-[2rem] bg-slate-950 p-6 text-slate-100 shadow-2xl">
            <div className="rounded-[2rem] bg-white/5 p-5 shadow-inner">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Price</p>
                  <div className="mt-2 flex items-end gap-3">
                    <p className="text-4xl font-bold text-amber-400">${product.price}</p>
                    <p className="text-sm line-through text-slate-500">${product.originalPrice}</p>
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-800 px-4 py-3 text-sm text-slate-300">
                  {product.stock > 0 ? "In stock" : "Sold out"}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white/5 p-5">
              <h3 className="text-sm uppercase tracking-[0.2em] text-slate-400">Select color</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.name}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`flex items-center gap-3 rounded-3xl border px-4 py-3 text-sm transition ${
                      selectedVariant.name === variant.name
                        ? "border-amber-400 bg-amber-400/10 text-white"
                        : "border-slate-700 bg-slate-900 text-slate-200"
                    }`}
                  >
                    <span
                      className="h-5 w-5 rounded-full border border-slate-700"
                      style={{ backgroundColor: variant.color }}
                    />
                    <span>{variant.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-white/5 p-5">
              <h3 className="text-sm uppercase tracking-[0.2em] text-slate-400">Quantity</h3>
              <div className="mt-4 flex items-center gap-3 rounded-3xl bg-slate-900 p-3">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="rounded-2xl bg-slate-800 px-4 py-2 text-lg font-semibold text-slate-100"
                >
                  −
                </button>
                <span className="min-w-[2rem] text-center text-xl font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="rounded-2xl bg-slate-800 px-4 py-2 text-lg font-semibold text-slate-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-4 rounded-[2rem] bg-white/5 p-5">
              <button
                type="button"
                className="w-full rounded-3xl bg-amber-400 px-5 py-4 text-base font-semibold text-slate-950 transition hover:bg-amber-300"
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="w-full rounded-3xl border border-slate-700 bg-transparent px-5 py-4 text-base font-semibold text-slate-100 transition hover:bg-slate-900"
              >
                Buy Now
              </button>
              <button
                type="button"
                className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-base font-semibold text-slate-100 transition hover:bg-slate-800"
              >
                Add to wishlist
              </button>
            </div>

            <div className="rounded-[2rem] bg-slate-900/90 p-5 text-slate-300">
              <div className="grid gap-4">
                <div className="rounded-3xl bg-slate-950 p-4 text-slate-200">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Shipping</p>
                  <p className="mt-2 text-sm leading-6">Free delivery in 3-5 business days. Express delivery available at checkout.</p>
                </div>
                <div className="rounded-3xl bg-slate-950 p-4 text-slate-200">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Returns</p>
                  <p className="mt-2 text-sm leading-6">30-day money-back guarantee. Easy returns and free exchanges.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
