
export function StatusBadge({ status }) {
    const styles = {
        PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        Approved: 'bg-blue-100 text-blue-800 border-blue-200',
        Processing: 'bg-purple-100 text-purple-800 border-purple-200',
        Shipped: 'bg-cyan-100 text-cyan-800 border-cyan-200',
        Delivered: 'bg-green-100 text-green-800 border-green-200',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
            {status}
        </span>
    );
}