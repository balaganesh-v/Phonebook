import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
    const { login, error, loading } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ phone: "", password: "" });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form.phone, form.password);
            navigate("/");
        } catch {}
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>

                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="p-3 w-full rounded-lg ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="p-3 w-full rounded-lg ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        disabled={loading}
                        className="mt-2 bg-blue-500 text-white py-3 rounded-lg w-full font-medium hover:bg-blue-600 disabled:opacity-50 transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-6 text-sm text-center">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
