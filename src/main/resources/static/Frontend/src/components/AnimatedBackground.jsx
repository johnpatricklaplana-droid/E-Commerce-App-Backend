import { motion } from "framer-motion"

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute w-96 h-96 rounded-full bg-purple-600/30 blur-3xl"
                style={{ top: '10%', left: '10%' }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="absolute w-80 h-80 rounded-full bg-blue-600/30 blur-3xl"
                style={{ top: '60%', right: '10%' }}
                animate={{
                    x: [0, -40, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />

            <motion.div
                className="absolute w-72 h-72 rounded-full bg-cyan-600/30 blur-3xl"
                style={{ bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}
                animate={{
                    x: [0, 30, 0],
                    y: [0, -40, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />

            <motion.div
                className="absolute w-64 h-64 rounded-full bg-purple-400/20 blur-3xl"
                style={{ top: '40%', left: '20%' }}
                animate={{
                    x: [0, -30, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                }}
            />
        </div>
    );
}
