import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = () => {
    const { register, error } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await register(form.name, form.email, form.phone, form.password);
            setForm({ name: "", email: "", phone: "", password: "" });
            navigate("/");
        } finally {
            setLoading(false);
        }
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
                    <p className="text-slate-400 text-sm">Create your free account</p>
                </div>

                {/* Card */}
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-white text-2xl font-extrabold mb-6">Sign Up</h2>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* Name */}
                        <div>
                            <label className="text-slate-300 text-sm font-medium block mb-1.5">
                                Full Name
                            </label>
                            <input
                                name="name"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-700 border border-slate-600 focus:border-emerald-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors placeholder-slate-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-slate-300 text-sm font-medium block mb-1.5">
                                Email Address
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-700 border border-slate-600 focus:border-emerald-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors placeholder-slate-500"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-slate-300 text-sm font-medium block mb-1.5">
                                Phone Number
                            </label>
                            <input
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
                            <input
                                name="password"
                                type="password"
                                placeholder="Min. 6 characters"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-700 border border-slate-600 focus:border-emerald-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors placeholder-slate-500"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold py-3 rounded-lg text-sm transition-colors"
                        >
                            {loading ? "Registering..." : "Create Account"}
                        </button>
                    </form>
                </div>

                {/* Login Link */}
                <p className="text-center text-slate-400 text-sm mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                    >
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;