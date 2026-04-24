import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth.js";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

const LoginForm = () => {
    const { login, error, loading } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        phone: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) =>
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(form.phone, form.password);
            navigate("/dashboard");
        } catch {}
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12 relative overflow-hidden">

            {/* Glow Background */}
            <div className="absolute top-16 left-10 w-72 h-72 bg-amber-500/10 blur-[130px] rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-400/10 blur-[130px] rounded-full"></div>

            {/* Back To Landing */}
            <button
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 hover:text-amber-300 hover:border-amber-400/30 transition-all text-sm"
            >
                <ArrowLeft size={16} />
                Back
            </button>

            <div className="relative w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="text-3xl">📒</span>

                        <h1 className="text-3xl text-white [font-family:'Pacifico',cursive]">
                            yuhnie !!
                        </h1>
                    </div>

                    <p className="text-zinc-400 text-sm [font-family:'Poppins',sans-serif]">
                        Welcome back! Login to continue
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-3xl border border-amber-500/10 bg-zinc-950/95 backdrop-blur-xl p-8 shadow-[0_0_35px_rgba(251,191,36,0.06)]">

                    <h2 className="text-white text-3xl mb-6 text-center [font-family:'Dancing_Script',cursive]">
                        Log In
                    </h2>

                    {/* Error */}
                    {error && (
                        <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        {/* Phone */}
                        <div>
                            <label className="block text-sm text-zinc-300 mb-2 [font-family:'Poppins',sans-serif]">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                placeholder="+1 234 567 8900"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-amber-400/40 placeholder:text-zinc-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm text-zinc-300 mb-2 [font-family:'Poppins',sans-serif]">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 pr-12 text-sm text-white outline-none focus:border-amber-400/40 placeholder:text-zinc-500"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-amber-300 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-400 text-black font-semibold hover:scale-[1.02] transition-all disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>

                {/* Bottom Links */}
                <div className="mt-6 text-center space-y-2">
                    <p className="text-zinc-400 text-sm [font-family:'Poppins',sans-serif]">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-amber-300 hover:text-amber-200 font-medium"
                        >
                            Register
                        </Link>
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="text-sm text-zinc-500 hover:text-amber-300 transition-colors"
                    >
                        Return to Landing Page
                    </button>
                </div>

            </div>
        </div>
    );
};

export default LoginForm;