import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const defaultProduct = {
  id: 22,
  productname: "Pro Merchant Mixer",
  price: 149,
  productdescription:
    "A premium countertop appliance designed for busy sellers who want fast, consistent mixing for meal prep and recipe creation.",
  categories: ["Kitchen & Home"],
  images: [
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  ],
  variantions: [],
  thumbnail: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
};

export default function SellerProductInspect({ product = defaultProduct }) {
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || product.thumbnail);
  const [activeTab, setActiveTab] = useState("overview");
  
  const categoryLabel = product.categories?.[0] || "Uncategorized";

  return (
    <div className="min-h-screen bg-slate-100 grid grid-cols-[270px_1fr]">
      <Sidebar />
      <div className="mx-auto max-w-6xl h-screen bg-white shadow-xl overflow-auto">
        <header className="border-b border-slate-200 px-6 py-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Seller product</p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">{product.productname}</h1>
            </div>
          </div>
        </header>

        <main className="grid gap-6 p-6 lg:grid-cols-[1.4fr_0.9fr] lg:p-8">
          <section className="space-y-6">
            <div className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-lg">
              <div className="inline-flex rounded-full bg-emerald-400 px-3 py-1 text-sm font-semibold text-slate-950 mb-4">Live listing</div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Price</p>
                  <p className="mt-2 text-2xl font-semibold text-amber-300">${product.price}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Category</p>
                  <p className="mt-2 text-lg font-semibold text-slate-200">{categoryLabel}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">ID</p>
                  <p className="mt-2 text-lg font-semibold text-slate-300">{product.id}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_96px]">
              <div className="rounded-[1.75rem] bg-slate-100 p-4 shadow-inner">
                <img
                  className="h-full w-full rounded-[1.5rem] object-cover"
                  src={selectedImage}
                  alt={product.productname}
                />
              </div>
              <div className="grid gap-3">
                {(product.images || []).map((image) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={`overflow-hidden rounded-3xl border transition ${
                      selectedImage === image ? "border-slate-900" : "border-slate-200"
                    } bg-white`}
                  >
                    <img className="h-24 w-full object-cover" src={image} alt="Product thumbnail" />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-slate-50 p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Manage listing</h2>
                  <p className="text-sm text-slate-600">Edit product details and pricing.</p>
                </div>
              </div>

              <div className="mt-5">
                <button
                  onClick={() => window.location.href = `/update-product/${product.id}`}
                  className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Edit product
                </button>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
              <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "sales", label: "Sales" },
                  { id: "activity", label: "Activity" },
                ].map((tabItem) => (
                  <button
                    key={tabItem.id}
                    type="button"
                    onClick={() => setActiveTab(tabItem.id)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeTab === tabItem.id
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {tabItem.label}
                  </button>
                ))}
              </div>

              <div className="mt-5 space-y-5 text-slate-700">
                {activeTab === "overview" && (
                  <div className="space-y-4">
                    <p>{product.productdescription}</p>
                    <div className="rounded-3xl bg-slate-100 p-4">
                      <p className="text-sm font-semibold text-slate-900">Category</p>
                      <p className="mt-2 text-sm text-slate-700">{categoryLabel}</p>
                    </div>
                  </div>
                )}

                {activeTab === "sales" && (
                  <div className="space-y-4">
                    <p className="text-slate-600">Sales and performance data for this product.</p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl bg-slate-100 p-5 text-slate-900 shadow-sm">
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total variants</p>
                        <p className="mt-3 text-3xl font-semibold">{(product.variantions || []).length}</p>
                      </div>
                      <div className="rounded-3xl bg-slate-100 p-5 text-slate-900 shadow-sm">
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total images</p>
                        <p className="mt-3 text-3xl font-semibold">{(product.images || []).length}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "activity" && (
                  <div className="space-y-4">
                    {[
                      "Product listed in system.",
                      `Variants: ${(product.variantions || []).length} available`,
                      `Images: ${(product.images || []).length} uploaded`,
                    ].map((activity) => (
                      <div key={activity} className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-700 shadow-sm">
                        {activity}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
              <h3 className="text-sm uppercase tracking-[0.2em] text-slate-400">Description</h3>
              <p className="mt-4 text-sm text-slate-700 leading-relaxed">{product.productdescription}</p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
