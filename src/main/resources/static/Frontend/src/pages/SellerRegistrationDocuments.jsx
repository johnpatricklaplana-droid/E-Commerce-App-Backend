import { useEffect, useState } from "react";
import { GET } from "../api/API";
import Button from "../components/Button";

export default function Documents() {

    const [files, setFiles] = useState([]);

    useEffect(() => {
        const getFiles = async () => {
            const result = await GET("http://localhost:8080/api/admin/business-registration-file?page=0&size=10");
       
            setFiles((prevFiles) => [...prevFiles, ...result]);
        };
        
        getFiles();
    }, []);

    return (
        <main className="mt-8 rounded-4xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-slate-950">Document library</h2>
                    <p className="mt-2 text-sm text-slate-500">Search and review seller registration documents.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <input className="min-w-55 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" type="search" placeholder="Search files by name or owner" />
                    <select className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none">
                        <option value="recent">Most recent</option>
                        <option value="name">Name</option>
                        <option value="owner">Owner</option>
                    </select>
                    <select className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none">
                        <option value="all">All status</option>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <Button>Search</Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-separate border-spacing-y-3 text-left">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 text-xs uppercase tracking-wide text-slate-500">File name</th>
                            <th className="px-4 py-3 text-center text-xs uppercase tracking-wide text-slate-500">Owner</th>
                            <th className="px-4 py-3 text-center text-xs uppercase tracking-wide text-slate-500">File size</th>
                            <th className="px-4 py-3 text-center text-xs uppercase tracking-wide text-slate-500">Status</th>
                        </tr>
                    </thead>
                    <tbody id="sellerDocumentContainer" className="space-y-3">
                        {files.map((file, index) => (
                            <tr key={index}>
                            <td className="text-sm">{file.fileUrl}</td>
                            <td className="text-sm text-center">{file.id}</td>
                            <td className="text-sm text-center">TODO</td>
                                {file.status === "ACCEPTED" && <td className="textCenter text-[12px] text-center"><span className=" rounded-2xl py-0.5 px-1.5 bg-emerald-100">{file.status}</span></td>}
                                {file.status === "REJECTED" && <td className="text-[12px] text-center"><span className="bg-rose-100 rounded-2xl py-0.5 px-1.5">{file.status}</span></td>}
                            {file.status === "PENDING" && <td className="bg-amber-100 text-[12px] text-center">{file.status}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-8 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
                    <strong className="block text-slate-950">No additional documents found.</strong>
                    Use the search bar to locate files or update filters.
                </div>
            </div>
        </main>
    );
}