import { motion } from "framer-motion"
import { Sparkles } from "lucide-react";

export function Logo() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
        >
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-xl blur-lg opacity-60" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
            </div>
            <span className="text-2xl font-semibold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                PayFlow
            </span>
        </motion.div>
    );
}
