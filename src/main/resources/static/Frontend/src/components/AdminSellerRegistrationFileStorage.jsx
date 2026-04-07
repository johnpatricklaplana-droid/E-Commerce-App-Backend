import Documents from "./SellerRegistrationDocuments";

export default function SellerRegistrationFileStorage() {
    return (
        <div className="flex h-screen w-screen">
            <aside className="w-72 bg-slate-950 text-slate-200 flex flex-col gap-6 px-6 py-7 shadow-xl">
                <div className="flex flex-col items-center gap-3">
                    <img className="h-14 w-14 rounded-full border border-slate-700 object-cover" src="https://picsum.photos/seed/picsum/56/56" alt="Admin avatar" />
                        <div className="text-center">
                            <h1 className="text-base font-semibold text-white">Johny Hey Daddy</h1>
                            <p className="text-xs text-slate-400">Super Admin</p>
                        </div>
                </div>

                <div className="border-t w-full border-slate-700 pt-5">
                    <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">Main navigation</p>
                    <nav className="space-y-2">
                        <a className="flex items-center gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium transition hover:bg-slate-800" href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5v8.5a1 1 0 0 1-1 1h-5V15H9v6H4a1 1 0 0 1-1-1v-8.5z" /></svg>
                            Seller Documents
                        </a>
                        <a className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white" href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 6h16v2H4zm0 5h12v2H4zm0 5h8v2H4z" /></svg>
                            Document Requests
                        </a>
                        <a className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white" href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 4h18v4H3zm0 6h18v10H3z" /></svg>
                            Reports
                        </a>
                        <a className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white" href="#">
                            <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 4a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm0 2a6 6 0 0 1 6 6h-2a4 4 0 0 0-4-4z" /></svg>
                            Activity
                        </a>
                    </nav>
                </div>

                <div className="mt-auto space-y-4">
                    <p className="text-xs uppercase tracking-widest text-slate-500">Settings</p>
                    <a className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white" href="#">
                        <svg className="h-5 w-5 flex-none text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3.5" /><path d="M19.4 15a7.9 7.9 0 0 0 .6-3 7.9 7.9 0 0 0-.6-3L21 7.5l-2-3-2 .8a8 8 0 0 0-2-.7L14.5 2h-5l-.5 2.6a8 8 0 0 0-2 .7L5 4.5 3 7.5l1.6 1.5A7.9 7.9 0 0 0 4 12a7.9 7.9 0 0 0 .6 3L3 16.5l2 3 2-.8a8 8 0 0 0 2 .7L9.5 22h5l.5-2.6a8 8 0 0 0 2-.7l2 .8 2-3-1.6-1.5z" /></svg>
                        Settings
                    </a>
                    <button className="w-full rounded-2xl bg-white py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">Log out</button>
                </div>
            </aside>

            <main id="mainContainer" className="flex-1 relative flex flex-col">
                <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5 shadow-sm">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-slate-500">Document storage</p>
                        <h1 className="mt-2 text-2xl font-semibold text-slate-950">Seller Registration Documents</h1>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10" /></svg>
                        Live updates
                    </div>
                </header>

                <section className="flex-1 overflow-y-auto p-8">
                    <div className="grid gap-5 lg:grid-cols-3">
                        <div className="rounded-[28px] bg-white p-6 shadow-xl">
                            <p className="text-xs uppercase tracking-widest text-slate-500">Total files</p>
                            <p className="mt-5 text-3xl font-semibold text-slate-950">128</p>
                        </div>
                        <div className="rounded-[28px] bg-white p-6 shadow-xl">
                            <p className="text-xs uppercase tracking-widest text-slate-500">Pending review</p>
                            <p className="mt-5 text-3xl font-semibold text-slate-950">24</p>
                        </div>
                        <div className="rounded-[28px] bg-white p-6 shadow-xl">
                            <p className="text-xs uppercase tracking-widest text-slate-500">Last uploaded</p>
                            <p className="mt-5 text-3xl font-semibold text-slate-950">2 hours ago</p>
                        </div>
                    </div>

                    <Documents />
                    
                </section>
            </main>
        </div>
    );
}