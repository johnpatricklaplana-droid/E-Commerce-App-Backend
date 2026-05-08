import { motion } from "framer-motion"
import { ShoppingBag, Home } from "lucide-react";

export function ActionButtons( { goToOrder } ) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto"
        >
            <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={goToOrder}
                className="relative flex-1 px-6 py-4 rounded-2xl overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative flex items-center justify-center gap-2 text-white">
                    <ShoppingBag className="w-5 h-5" />
                    <span>View Purchases</span>
                </div>

                <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                />
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative flex-1 px-6 py-4 rounded-2xl border border-white/20 backdrop-blur-sm bg-white/5 overflow-hidden group"
            >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative flex items-center justify-center gap-2 text-white">
                    <Home className="w-5 h-5" />
                    <span>Back to Home</span>
                </div>
            </motion.button>
        </motion.div>
    );
}
