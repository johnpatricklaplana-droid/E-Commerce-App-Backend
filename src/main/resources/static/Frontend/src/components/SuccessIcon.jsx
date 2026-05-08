import { motion } from "framer-motion"
import { Check } from "lucide-react";

export function SuccessIcon() {
    return (
        <div className="relative flex items-center justify-center">
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2
                }}
                className="relative"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full blur-xl opacity-60"
                    style={{ width: '120px', height: '120px', margin: '-10px' }}
                />

                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: 0.5
                        }}
                    >
                        <Check className="w-12 h-12 text-white" strokeWidth={3} />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
