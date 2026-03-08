import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
    const { login, error, loading } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ phone: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form.phone, form.password);
            navigate("/dashboard");
        } catch { }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-3xl">📒</span>
                        <span className="text-2xl font-bold text-white tracking-tight">ConnectBook</span>
                    </div>
                    <p className="text-slate-400 text-sm">Welcome back! Log in to continue</p>
                </div>

                {/* Card */}
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-white text-2xl font-extrabold mb-6">Log In</h2>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* Phone */}
                        <div>
                            <label className="text-slate-300 text-sm font-medium block mb-1.5">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="+1 234 567 8900"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-700 border border-slate-600 focus:border-emerald-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors placeholder-slate-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-slate-300 text-sm font-medium block mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-700 border border-slate-600 focus:border-emerald-500 text-white text-sm rounded-lg px-4 py-3 pr-12 outline-none transition-colors placeholder-slate-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-400 transition-colors bg-transparent border-none cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            disabled={loading}
                            className="mt-2 w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold py-3 rounded-lg text-sm transition-colors"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>

                {/* Register Link */}
                <p className="text-center text-slate-400 text-sm mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;