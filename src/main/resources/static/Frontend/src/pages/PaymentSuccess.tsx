import { useEffect } from "react";
import { motion } from "framer-motion"
import confetti from "canvas-confetti";
import { Calendar, CreditCard, Hash, HelpCircle } from "lucide-react";
import { Logo } from "../components/Logo";
import { SuccessIcon } from "../components/SuccessIcon";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { ActionButtons } from "../components/ActionButtons";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {

    const navigate = useNavigate();

    useEffect(() => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#9333ea', '#3b82f6', '#06b6d4']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#9333ea', '#3b82f6', '#06b6d4']
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const goToOrder = () => {
        navigate("/costumer-orders");
    };

    return (
        <div className="relative size-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
            <AnimatedBackground />

            <div className="absolute top-8 left-8 z-20">
                <Logo />
            </div>

            <div className="relative z-10 size-full flex flex-col items-center justify-center px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl space-y-8"
                >
                    <div className="text-center space-y-6">
                        <SuccessIcon />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="space-y-3"
                        >
                            <h1 className="text-5xl md:text-6xl font-semibold text-white tracking-tight">
                                Payment Successful
                            </h1>
                            <p className="text-lg text-white/60 max-w-md mx-auto">
                                Your purchase has been completed successfully. You now have full access to your order.
                            </p>
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="relative w-full max-w-md mx-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl" />

                        <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
                            <h3 className="text-white/60 mb-6">Order Summary</h3>

                            <div className="space-y-5">
                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                            <Hash className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <span className="text-white/60">Order ID</span>
                                    </div>
                                    <span className="text-white font-mono">ORD-2026-48291</span>
                                </div>

                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                            <Calendar className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <span className="text-white/60">Purchase Date</span>
                                    </div>
                                    <span className="text-white">May 8, 2026</span>
                                </div>

                                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                            <CreditCard className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <span className="text-white/60">Total Amount</span>
                                    </div>
                                    <span className="text-white text-2xl font-semibold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                        $299.00
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <ActionButtons goToOrder={goToOrder} />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="text-center pt-4"
                    >
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors group"
                        >
                            <HelpCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span className="text-sm">Need help?</span>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}