import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Text from "../components/Text";

export default function SellerProductInspect({ product }) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const expandDescription = () => {
    setExpanded(prev => prev ? false : true);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="mx-auto max-w-6xl h-screen w-full bg-white shadow-xl overflow-auto">
        <header className="border-b border-slate-200 px-6 py-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Seller product</p>
            </div>
          </div>
        </header>

        <main className="gap-6 p-6 lg:p-8">
          <section className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_96px]">
              <div className="rounded-[1.75rem] sm:h-[500px] bg-blue-50 p-4 shadow-inner">
                <img
                  className="h-full w-full rounded-[1.5rem] object-cover"
                  src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80"
                  alt=""
                />
              </div>
              <div className="grid gap-3 bg-blue-50 rounded-[1rem] p-2 overflow-auto sm:h-[500px]">
                <button className="rounded-[1.75rem">
                  <img className="rounded-[1rem]" src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80" alt="" />
                </button>                               
                <button className="rounded-[1.75rem">
                  <img className="rounded-[1rem]" src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80" alt="" />
                </button>                               
                <button className="rounded-[1.75rem">
                  <img className="rounded-[1rem]" src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80" alt="" />
                </button>                               
                <button className="rounded-[1.75rem">
                  <img className="rounded-[1rem]" src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80" alt="" />
                </button>                               
                <button className="rounded-[1.75rem">
                  <img className="rounded-[1rem]" src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80" alt="" />
                </button>                               
              </div>
            </div>
            <div className="rounded-[1.75rem] flex flex-col items-start bg-slate-950 p-5 text-white shadow-lg">
              <div className="inline-flex rounded-full bg-emerald-400 px-3 py-1 text-sm font-semibold text-slate-950 mb-4">Live listing</div>
              <div className="flex justify-between w-full">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Price</p>
                  <p className="mt-2 text-2xl font-semibold text-amber-300">$10000</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Category</p>
                  <p className="mt-2 text-lg font-semibold text-slate-200">whatever</p>
                </div>
              </div>
              <p className="mt-2 text-2xl font-semibold text-slate-200">Rasma Inasal Jr. johny hey daddy jonas sam diza</p>
            </div>
            <div className="rounded-[1.75rem] bg-blue-50 transition-all duration-400 ease-in-out hover:bg-blue-100 p-6">
              <div>
                <div onClick={expandDescription}>
                  <Text variant={"h3"}>Description</Text>
                  <p
                    className={`mt-4 text-sm text-slate-900 ${expanded ? '' : 'truncate'}`}
                  >
                    A premium countertop appliance designed for busy sellers who want fast, consistent mixing for meal prep and recipe creation.
                    A premium countertop appliance designed for busy sellers who want fast, consistent mixing for meal prep and recipe creation.
                  </p>
                  <p className="font-bold text-sm">See more</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
